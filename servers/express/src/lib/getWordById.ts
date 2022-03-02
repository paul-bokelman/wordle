import { PrismaClient } from "@prisma/client";
import type { Word } from "@prisma/client";
const prisma = new PrismaClient();
export const getWordById = async ({ id }: { id: number }): Promise<Word> => {
  const word: Word = await prisma.word.findUnique({
    where: {
      id,
    },
  });
  return word;
};
