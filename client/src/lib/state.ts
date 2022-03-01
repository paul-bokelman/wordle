export type CharacterState =
  | "correct"
  | "misplaced"
  | "incorrect"
  | "empty"
  | "active";

export const determineStatus = ({
  char,
  word,
  index,
}: {
  char: string;
  word: string;
  index: number;
}): CharacterState => {
  if (char === word[index]) {
    return "correct";
  }

  if (word.includes(char)) {
    return "misplaced";
  }

  return "incorrect";
};

export const getCharacterStates = ({
  current,
  guesses,
  word,
}: {
  current: { [key: string]: CharacterState };
  guesses: string[];
  word: string;
}): { [key: string]: CharacterState } => {
  const charStates: { [key: string]: CharacterState } = {};
  guesses.forEach((guess) => {
    [...guess].forEach((char, i) => {
      if (current[char]) {
        if (current[char] === "correct") return;

        const status = determineStatus({ char, word, index: i });
        // if the character is already in the current state,
        charStates[char] = status;
      }
      return (charStates[char] = determineStatus({ char, word, index: i }));
    });
  });

  return charStates;
};
