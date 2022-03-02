import { PrismaClient, Prisma } from "@prisma/client";
import type { Word } from "@prisma/client";
const prisma = new PrismaClient();
export const getRandomWord = async ({
  length,
}: {
  length: number;
}): Promise<Word> => {
  const wordsByLength: Word[] = await prisma.word.findMany({
    where: {
      wordLength: length,
    },
  });
  const randomWord: Word =
    wordsByLength[Math.floor(Math.random() * wordsByLength.length)];
  return randomWord;
};
