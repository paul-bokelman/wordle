import { PrismaClient } from "@prisma/client";
import type { Word } from "@prisma/client";
const prisma = new PrismaClient();
export const getAllWords = async (): Promise<Word[]> => {
  const allWords: Word[] = await prisma.word.findMany();
  return allWords;
};
