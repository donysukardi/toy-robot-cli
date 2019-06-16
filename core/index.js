import React from "react";

const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];
const DIRECTIONS_MAP = DIRECTIONS.reduce((acc, x, idx) => {
  acc[x] = idx;
  return acc;
}, {});

function clampNumber(min, max, num) {
  return Math.max(min, Math.min(max, num));
}

function boardReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case "INIT": {
      let { width, height } = payload;
      return {
        ...state,
        x: clampNumber(0, width - 1, state.x),
        y: clampNumber(0, height - 1, state.y),
        width,
        height
      };
    }

    case "PLACE": {
      return {
        ...state,
        x: clampNumber(0, state.width - 1, payload.x),
        y: clampNumber(0, state.height - 1, payload.y),
        direction: payload.direction
      };
    }

    case "MOVE": {
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
        y: clampNumber(0, height - 1, y)
      };
    }

    case "LEFT":
      return {
        ...state,
        direction: (state.direction - 1 + DIRECTIONS.length) % DIRECTIONS.length
      };

    case "RIGHT":
      return {
        ...state,
        direction: (state.direction + 1) % DIRECTIONS.length
      };

    default:
      throw new Error();
  }
}

const initialState = {
  x: 0,
  y: 0,
  width: 5,
  height: 5,
  direction: 0
};

function BoardGrid(props) {
  const { width, height, renderRow, renderCell } = props;
  return Array.from({ length: height }).map((_, deltaY) => {
    const yIdx = height - deltaY - 1; // Reverse Y for display
    return renderRow({
      key: yIdx,
      row: yIdx,
      children: Array.from({ length: width }).map((_, deltaX) => {
        const xIdx = deltaX;
        return renderCell({
          key: xIdx,
          row: yIdx,
          column: xIdx
        });
      })
    });
  });
}

function useBoardReducer() {
  return React.useReducer(boardReducer, initialState);
}

export { clampNumber, useBoardReducer, BoardGrid, DIRECTIONS, DIRECTIONS_MAP };
