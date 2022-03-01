import { useEffect, useState } from "react";
import { useWordContext } from "./context/word";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";

const App = (): JSX.Element => {
  const { word, loading, setLength, newWord } = useWordContext();

  const [currentGuess, setCurrentGuess] = useState<Array<string>>([]);
  const [index, setIndex] = useState<number>(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isWinner, setIsWinner] = useState<boolean>(false);

  const reset = (): void => {
    setCurrentGuess([]);
    setIndex(0);
    setGuesses([]);
    setIsWinner(false);
    setLength(5);
    newWord();
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-[#161821]">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Grid
          index={index}
          currentGuess={currentGuess}
          guesses={guesses}
          isWinner={isWinner}
        />
        <Keyboard
          isWinner={isWinner}
          guesses={guesses}
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          setIndex={setIndex}
          setGuesses={setGuesses}
          setIsWinner={setIsWinner}
        />
      </div>
      <div className="flex flex-row items-center gap-2"></div>
      {isWinner && (
        <div className="absolute px-2 py-2 bg-yellow-500/20 rounded-md">
          <div className="px-12 py-10 bg-yellow-500 text-black font-bold text-xl rounded-md">
            You Won!
          </div>
          <button
            onClick={reset}
            className="bg-yellow-200 w-full text-black font-bold text-sm px-2 py-1 rounded-md mt-1"
          >
            New Word
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
