import { useWordContext } from "../../context/word";
import { Cell } from "./Cell";

export const EmptyRow = (): JSX.Element => {
  const { length: cells } = useWordContext();
  return (
    <div className="flex flex-row items-center gap-2">
      {Array.from(Array(cells).keys()).map((_, index) => (
        <Cell key={index} state="empty" />
      ))}
    </div>
  );
};
