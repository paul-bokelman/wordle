import { PrismaClient } from "@prisma/client";
import type { Word } from "@prisma/client";
const prisma = new PrismaClient();
export const removeWord = async ({ id }: { id: number }): Promise<number> => {
  const response: Word = await prisma.word.delete({
    where: {
      id,
    },
  });
  return response.id;
};
