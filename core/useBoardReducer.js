import React from 'react';
import { DIRECTIONS, DIRECTIONS_MAP } from './constants';
import { clampNumber } from './utils';

function boardReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case 'INIT': {
      let { width, height } = payload;
      return {
        ...state,
        x: clampNumber(0, width - 1, state.x),
        y: clampNumber(0, height - 1, state.y),
        width: Math.max(1, width),
        height: Math.max(1, height),
      };
    }

    case 'PLACE': {
      return {
        ...state,
        x: clampNumber(0, state.width - 1, payload.x),
        y: clampNumber(0, state.height - 1, payload.y),
        direction: payload.direction,
      };
    }

    case 'MOVE': {
      let { x, y } = state;
      const { direction, width, height } = state;
      if (direction === DIRECTIONS_MAP.NORTH) {
        y = y + 1;
      } else if (direction === DIRECTIONS_MAP.EAST) {
        x = x + 1;
      } else if (direction === DIRECTIONS_MAP.SOUTH) {
        y = y - 1;
      } else if (direction === DIRECTIONS_MAP.WEST) {
        x = x - 1;
      }
      return {
        ...state,
        x: clampNumber(0, width - 1, x),
        y: clampNumber(0, height - 1, y),
      };
    }

    case 'LEFT':
      return {
        ...state,
        direction:
          (state.direction - 1 + DIRECTIONS.length) % DIRECTIONS.length,
      };

    case 'RIGHT':
      return {
        ...state,
        direction: (state.direction + 1) % DIRECTIONS.length,
      };

    default:
      throw new Error('Invalid action type');
  }
}

export const defaultInitialState = {
  x: 0,
  y: 0,
  width: 5,
  height: 5,
  direction: 0,
};

export default function useBoardReducer(initialState = defaultInitialState) {
  return React.useReducer(boardReducer, initialState);
}
