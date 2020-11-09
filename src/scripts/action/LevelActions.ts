const GENERATE_LEVEL = 'GENERATE_LEVEL';
const LEVEL_GENERATED = 'LEVEL_GENERATED';
const GENERATE_DUNGEON = 'GENERATE_DUNGEON';
const DUNGEON_GENERATED = 'DUNGEON_GENERATED';

export function generateLevel(dimensions: { width: number; height: number }) {
  return {
    type: 'GENERATE_LEVEL',
    payload: dimensions,
  };
}

export function generateDungeon() {
  return {};
}
