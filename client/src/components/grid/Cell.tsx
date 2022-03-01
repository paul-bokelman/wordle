import { colors } from "../../constants/colors";
type Props = {
  char?: string;
  state: "correct" | "misplaced" | "incorrect" | "empty" | "active";
};

export const Cell = ({ char, state }: Props) => {
  return (
    <div
      style={{ backgroundColor: colors[state] }}
      className="flex items-center justify-center h-16 w-16 text-white rounded-lg"
    >
      {char && (
        <span className="text-4xl font-semibold capitalize">{char}</span>
      )}
    </div>
  );
};
