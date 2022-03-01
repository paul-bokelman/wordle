import { useState, useEffect } from "react";
import { useWordContext } from "../../context/word";
import { getCharacterStates } from "../../lib/state";
import { Key } from "./Key";

type Props = {
  isWinner: boolean;
  guesses: string[];
  currentGuess: string[];
  setCurrentGuess: (guess: string[] | ((prev: string[]) => string[])) => void;
  setIndex: (index: number | ((prev: number) => number)) => void;
  setGuesses: (guesses: string[] | ((prev: string[]) => string[])) => void;
  setIsWinner: (isWinner: boolean) => void;
};

export const Keyboard = ({
  isWinner,
  guesses,
  currentGuess,
  setCurrentGuess,
  setIndex,
  setGuesses,
  setIsWinner,
}: Props) => {
  const { word } = useWordContext();
  const [characterStates, setCharacterStates] = useState<{
    [key: string]: "correct" | "misplaced" | "incorrect" | "empty" | "active";
  }>({});

  const handleBackspace = (): void => {
    if (currentGuess.length === 0) return;
    return setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleCharacter = (char: string): void => {
    if (currentGuess.length === word.length) return;
    if (!/^[a-zA-Z]{1}$/.test(char)) return;
    if (!isNaN(char as unknown as number)) return;
    return setCurrentGuess((prevGuess: string[]) => [
      ...prevGuess,
      char.toLowerCase(),
    ]);
  };

  const handleConfirmation = (): void => {
    if (currentGuess.length !== word.length) return;
    if (currentGuess.join("") === word) return setIsWinner(true);
    setGuesses((prevGuesses: string[]) => [
      ...prevGuesses,
      currentGuess.join(""),
    ]);
    setIndex((prevIndex: number) => prevIndex + 1);
    return setCurrentGuess([]);
  };

  useEffect(() => {
    if (isWinner) {
      return setCharacterStates((currentCharacterStates) => ({
        ...currentCharacterStates,
        ...getCharacterStates({
          current: currentCharacterStates,
          guesses: [...guesses, currentGuess.join("")],
          word,
        }),
      }));
    }
    return setCharacterStates((currentCharacterStates) => ({
      ...currentCharacterStates,
      ...getCharacterStates({ current: currentCharacterStates, guesses, word }),
    }));
  }, [isWinner, guesses, word]);

  useEffect(() => {
    if (guesses.length === 0) setCharacterStates({});
  }, [guesses]);

  useEffect(() => {
    const listener = ({ key }: KeyboardEvent) => {
      if (key === "Enter") return handleConfirmation();
      if (key === "Backspace") return handleBackspace();
      return handleCharacter(key);
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [handleBackspace, handleConfirmation, handleCharacter]);

  return (
    <div className="grid grid-cols-10 grid-rows-3 gap-2">
      {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((char, index) => (
        <Key
          key={index}
          char={char}
          state={characterStates[char] || "empty"}
          handleCharacter={handleCharacter}
          handleBackspace={handleBackspace}
          handleConfirmation={handleConfirmation}
        />
      ))}
      {["a", "s", "d", "f", "g", "h", "j", "k", "l", "Backspace"].map(
        (char, index) => (
          <Key
            key={index}
            char={char}
            state={characterStates[char] || "empty"}
            handleCharacter={handleCharacter}
            handleBackspace={handleBackspace}
            handleConfirmation={handleConfirmation}
          />
        )
      )}
      {["z", "x", "c", "v", "b", "n", "m", "Enter"].map((char, index) => (
        <Key
          key={index}
          char={char}
          state={characterStates[char] || "empty"}
          handleCharacter={handleCharacter}
          handleBackspace={handleBackspace}
          handleConfirmation={handleConfirmation}
        />
      ))}
    </div>
  );
};
