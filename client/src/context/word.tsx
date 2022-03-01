import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import type { ReactChild } from "react";
import { db } from "../lib/api/database";

interface WordContextInterface {
  word: string;
  length: number;
  rows: number;
  loading: boolean;
  setLength: (length: number) => void;
  newWord: () => void;
}

const WordContext = createContext<WordContextInterface>({
  word: "",
  length: 0,
  rows: 0,
  loading: false,
  setLength: (): void => {},
  newWord: (): void => {},
});

export const useWordContext = (): WordContextInterface => {
  return useContext(WordContext);
};

export const WordProvider = ({
  children,
}: {
  children: ReactChild;
}): JSX.Element => {
  const [word, setWord] = useState<string>("moist");
  const [length, setLength] = useState<number>(5);
  const [rows, setRows] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);

  const { refetch: newWord } = useQuery(
    "getWord",
    async () => await db.getRandomWord({ length: 5 }),
    {
      refetchOnWindowFocus: false,
      enabled: !loading,
      onSettled: (): void => {
        setLoading(false);
      },
      onSuccess: ({ word }): void => {
        setWord(word);
      },
    }
  );

  const value: WordContextInterface = {
    word: word || "",
    length: word?.length,
    rows,
    loading,
    setLength: (length: number): void => {
      setLength(length);
    },
    newWord,
  };

  return (
    <WordContext.Provider value={value}>
      {!loading && children}
    </WordContext.Provider>
  );
};
