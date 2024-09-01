export const findLastAlphaIndex = (value: string): number => {
  for (let i = value.length - 1; i > -1; i--) {
    if (/^[a-z]$/i.test(value[i])) {
      return i;
    }
  }

  return -1;
};

export const replaceCharacterAt = (value: string, char: string, index: number): string => {
  const pre = value.slice(0, index);
  const post = value.slice(index + 1);
  return pre + char + post;
};

// 0 = gray = letter not in phrase
// 1 = green = letter in correct place
// 2 = yellow = letter in correct word, but not correct place
// 3 = purple = letter in phrase, but not correct word

export const calculateAttemptResult = (attempt: string, phrase: string): string => {
  const attemptWords = attempt.split(" ");
  const phraseWords = phrase.split(" ");

  if (attemptWords.length !== phraseWords.length) {
    throw new Error("Attempt didn't have the same number of words as the phrase.");
  }

  let resultParts: string[] = [];

  for (let i = 0; i < phraseWords.length; i++) {
    const attemptWord = attemptWords[i];
    const phraseWord = phraseWords[i];
    let result = "";

    if (attemptWord.length !== phraseWord.length) {
      throw new Error("Attempt word didn't have the same number of letters as the phrase word.");
    }

    for (let j = 0; j < phraseWord.length; j++) {
      if (attemptWord[j] === phraseWord[j]) {
        result += "3"; // green
      } else if (phraseWord.includes(attemptWord[j])) {
        result += "2"; // yellow
      } else if (phraseWords.filter((_, k) => k !== i).some((w) => w.includes(attemptWord[j]))) {
        result += "1"; // purple
      } else {
        result += "0"; // gray
      }
    }

    resultParts.push(result);
  }

  return resultParts.join(" ");
};

export const isWin = (result: string): boolean => {
  if (!result) return false;
  return [...result.replaceAll(" ", "")].every((c) => c === "3");
};
