import express from "express";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import crypto from "crypto";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/client.js";

dotenv.config();
const prisma = new PrismaClient();
const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());
const PORT = process.env.SHORTNER_API_PORT || 5050;

app.get("/healthz", (request: Request, response: Response) => { 
  response.status(200).send("OK");
}); 

app.post("/shorten", async (request: Request, response: Response) => {
  const { longUrl } = request.body;
  if (!longUrl) {
    return response.status(400).json({ error: "Long URL is required" });
  }
  // maybe an other algorithm to generate the slug
  // To have in mind: as the slug should be unique (omit collisions) there is a question of how long it should be
  const hash = crypto.createHash('sha256').update(longUrl).digest('hex').substring(0, 8);
  
  try {
    let match = await prisma.urlMatch.findUnique({
      where: { slug: hash },
    });

    if (!match) {
      match = await prisma.urlMatch.create({
        data: {
          slug: hash,
          longUrl,
        },
      });
    }

    response.status(200).json({ slug: match.slug });
  } catch (error) {
    console.error("Error creating/fetching url match:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/:slug", async (request: Request<{ slug: string }>, response: Response) => {
  const { slug } = request.params;
  console.log("slug: ", slug);
  try {
    const match = await prisma.urlMatch.findUnique({
      where: { slug },
    });

    if (match) {
      if (request.accepts('json')) {
        response.status(200).json({ url: match.longUrl });
      } else {
        response.redirect(301, match.longUrl);
      }
    } else {
      response.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    console.error("Error fetching url match:", error);
    if (request.accepts('json')) {
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      response.status(500).send("Internal Server Error");
    }
  }
});

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  throw new Error(error.message);
});