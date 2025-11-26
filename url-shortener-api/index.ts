import express from "express";
import dotenv from "dotenv";
import type { Request, Response } from "express";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.SHORTNER_API_PORT || 5050;

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send("Hello World");
}); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});