import type { ReactChild } from "react";
import { CompletedRow, CurrentRow, EmptyRow } from ".";
import { useWordContext } from "../../context/word";

type Props = {
  currentGuess: Array<string>;
  guesses: Array<string>;
  index: number;
  isWinner: boolean;
};

export const Grid = ({
  currentGuess,
  guesses,
  index,
  isWinner,
}: Props): JSX.Element => {
  const { rows } = useWordContext();
  return (
    <GridContainer>
      {Array.from(Array(rows).keys()).map((_, rowIndex) => {
        const guess = guesses[rowIndex];
        const isCurrentRow = rowIndex === index;
        const isCompletedRow = rowIndex < guesses.length;

        if (isCompletedRow) {
          return <CompletedRow key={rowIndex} guess={guess} />;
        }

        if (isCurrentRow) {
          return (
            <CurrentRow
              key={rowIndex}
              currentGuess={currentGuess}
              isWinner={isWinner}
            />
          );
        }

        return <EmptyRow key={rowIndex} />;
      })}
    </GridContainer>
  );
};

const GridContainer = ({
  children,
}: {
  children: ReactChild[] | ReactChild;
}): JSX.Element => {
  return <div className="flex flex-col gap-2">{children}</div>;
};
