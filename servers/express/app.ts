import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import type { Word } from "@prisma/client";
import {
  getAllWords,
  getWordById,
  getRandomWord,
  addWord,
  removeWord,
} from "./src/lib";
const app = express();
const port: number = 8080;

app.use(bodyParser.json());
app.use(cors());

app.get("/words", async (req: Request, res: Response) => {
  const words: Word[] = await getAllWords();
  return res.status(200).json(words);
});

app.get("/word/random", async (req: Request, res: Response) => {
  const { length } = req.query;
  const randomWord = await getRandomWord({
    length: parseInt(length as string),
  });
  return res.status(200).json(randomWord);
});

app.post("/word/add", async (req: Request, res: Response) => {
  const word = req.body;
  const id: number = await addWord({ word });
  return res.status(201).json({ message: "Word added!", id });
});

app.delete("/word/remove/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await removeWord({ id: parseInt(id) });
  return res.status(200).json({ message: "Word deleted!" });
});

app.get("/word/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const word: Word = await getWordById({ id: parseInt(id) });
  return res.status(200).json(word);
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
