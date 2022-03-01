import { useEffect, useState } from "react";
import { useWordContext } from "../../context/word";
import { Cell } from "./Cell";

type Props = {
  currentGuess: string[];
  isWinner: boolean;
};

export const CurrentRow = ({ currentGuess, isWinner }: Props) => {
  const { length: cells } = useWordContext();
  const [winningWord, setWinningWord] = useState("");
  useEffect(() => {
    setWinningWord(currentGuess.join(""));
  }, [isWinner]);
  return (
    <div className="flex flex-row items-center gap-2">
      {isWinner
        ? [...winningWord].map((char, i) => (
            <Cell key={i} char={char} state="correct" />
          ))
        : Array.from(Array(cells).keys()).map((_, i) => (
            <Cell
              key={i}
              char={currentGuess[i]}
              state={i === currentGuess.length ? "active" : "empty"}
            />
          ))}
    </div>
  );
};
