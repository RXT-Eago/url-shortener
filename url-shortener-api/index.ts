import express from "express";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import crypto from "crypto";
import cors from "cors";

dotenv.config();
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

app.post("/shorten", (request: Request, response: Response) => {
  console.log("request.body: ", request);
  const { longUrl } = request.body;
  if (!longUrl) {
    return response.status(400).json({ error: "Long URL is required" });
  }
  // maybe an other algorithm to generate the slug
  // To have in mind: as the slug should be unique (omit collisions) there is a question of how long it should be
  const hash = crypto.createHash('sha256').update(longUrl).digest('hex').substring(0, 8);
  response.status(200).json({ slug: `${hash}` });
});

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  throw new Error(error.message);
});