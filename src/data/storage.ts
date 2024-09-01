const LEVEL_DATA = "LEVEL_DATA";

export enum GameState {
  Playing,
  Win,
  Lose
}

export type LevelData = {
  attempts: string[];
  results: string[];
  state: GameState;
};

export type SaveData = {
  [phrase: string]: LevelData;
};

export const saveLevel = (phrase: string, attempts: string[], results: string[], state: GameState) => {
  const saveDataRaw = localStorage.getItem(LEVEL_DATA);
  let saveData: SaveData = {};

  if (saveDataRaw) {
    saveData = JSON.parse(saveDataRaw);
  }

  const newLevelData: LevelData = {
    attempts,
    results,
    state
  };

  const newSaveData = { ...saveData, [phrase]: newLevelData };

  localStorage.setItem(LEVEL_DATA, JSON.stringify(newSaveData));
};

export const loadLevel = (phrase: string): LevelData | null => {
  const saveDataRaw = localStorage.getItem(LEVEL_DATA);

  if (!saveDataRaw) return null;

  const saveData: SaveData = JSON.parse(saveDataRaw);

  const levelData = saveData[phrase];

  if (!levelData) return null;

  return levelData;
};

export const getAllLevels = (): SaveData | null => {
  const saveDataRaw = localStorage.getItem(LEVEL_DATA);

  if (!saveDataRaw) return null;

  return JSON.parse(saveDataRaw);
};
