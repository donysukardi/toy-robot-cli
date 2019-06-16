export const DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
export const DIRECTIONS_MAP = DIRECTIONS.reduce((acc, x, idx) => {
  acc[x] = idx;
  return acc;
}, {});
