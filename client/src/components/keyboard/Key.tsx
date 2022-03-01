import { HiOutlineBackspace } from "react-icons/hi";
import { colors } from "../../constants/colors";

type KeyProps = {
  char?: string;
  state: "correct" | "misplaced" | "incorrect" | "empty" | "active";
  handleCharacter: (char: string) => void;
  handleBackspace: () => void;
  handleConfirmation: () => void;
};

type CharProps = {
  char: string | undefined;
  state: "correct" | "misplaced" | "incorrect" | "empty" | "active";
  handleCharacter: (char: string) => void;
};

export const Key = ({
  char,
  state,
  handleCharacter,
  handleBackspace,
  handleConfirmation,
}: KeyProps): JSX.Element => {
  if (char === "Enter")
    return <EnterKey handleConfirmation={handleConfirmation} />;
  if (char === "Backspace")
    return <BackspaceKey handleBackspace={handleBackspace} />;
  return <Char char={char} state={state} handleCharacter={handleCharacter} />;
};

const Char = ({ char, state, handleCharacter }: CharProps) => {
  return (
    <div
      onClick={() => handleCharacter(char as string)}
      style={{ backgroundColor: colors[state] }}
      className="flex items-center justify-center py-3 px-4 rounded-md cursor-pointer"
    >
      <span className="text-white text-base font-medium capitalize">
        {char}
      </span>
    </div>
  );
};

const EnterKey = ({
  handleConfirmation,
}: {
  handleConfirmation: () => void;
}) => (
  <div
    style={{ backgroundColor: colors["empty"] }}
    onClick={handleConfirmation}
    className="flex items-center justify-center col-span-2 rounded-md cursor-pointer"
  >
    <span className="text-white text-base font-medium capitalize">Enter</span>
  </div>
);

const BackspaceKey = ({ handleBackspace }: { handleBackspace: () => void }) => (
  <div
    onClick={handleBackspace}
    style={{ backgroundColor: colors["empty"] }}
    className="flex items-center justify-center row-span-2 rounded-md cursor-pointer"
  >
    <HiOutlineBackspace className="text-white text-2xl font-medium capitalize" />
  </div>
);
