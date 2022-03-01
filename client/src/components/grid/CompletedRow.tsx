import { useWordContext } from "../../context/word";
import { determineStatus } from "../../lib/state";
import { Cell } from "./Cell";

type Props = {
  guess: string;
};

export const CompletedRow = ({ guess }: Props): JSX.Element => {
  const { word, length: cells } = useWordContext();

  return (
    <div className="flex flex-row items-center gap-2">
      {[...guess].map((char, index) => (
        <Cell
          key={index}
          char={char}
          state={determineStatus({ char, word, index })}
        />
      ))}
    </div>
  );
};
