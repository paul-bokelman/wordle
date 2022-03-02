import { PrismaClient } from "@prisma/client";
import type { Word } from "@prisma/client";
const prisma = new PrismaClient();
export const addWord = async ({
  word: { word, wordLength },
}: {
  word: Word;
}): Promise<number> => {
  const { id: response } = await prisma.word.create({
    data: {
      word,
      wordLength,
    },
  });
  return response;
};
