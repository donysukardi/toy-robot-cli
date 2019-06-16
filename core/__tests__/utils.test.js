import { clampNumber, BoardGrid, DIRECTIONS, DIRECTIONS_MAP } from '../index';

describe('clampNumber', () => {
  it('should adjust number to be in min and max limit', () => {
    expect(clampNumber(0, 10, 5)).toBe(5);
    expect(clampNumber(0, 10, -5)).toBe(0);
    expect(clampNumber(0, 10, 15)).toBe(10);
  });
});
