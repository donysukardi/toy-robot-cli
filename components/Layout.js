import React from 'react';
import { Box } from 'ink';
import figures from 'figures';
import { ActiveCell, InactiveCell } from './Cell';
import { DIRECTIONS_ARROW } from './common';
import { BoardGrid, DIRECTIONS } from '../core';

export default function Layout({ grid, sidebar, panel }) {
  return (
    <Box flexDirection="column">
      <Box flexDirection="row" marginTop={1} marginLeft={1}>
        <Box flexDirection="column">{grid}</Box>
        {sidebar && (
          <Box flexDirection="column" marginLeft={2}>
            {sidebar}
          </Box>
        )}
      </Box>
      <Box marginTop={1} marginLeft={1}>
        {panel}
      </Box>
    </Box>
  );
}

export function CellGrid({ width, height, x, y, renderCell, direction }) {
  return (
    <BoardGrid
      width={width}
      height={height}
      renderRow={props => (
        <Box width={width * 3} flexDirection="row" {...props} />
      )}
      renderCell={({ key, row, column }) => (
        <Box width={3} height={1} key={key}>
          {x === column && y === row
            ? renderCell({ active: true, direction })
            : renderCell({ active: false })}
        </Box>
      )}
    />
  );
}

export function PlayLayout(props) {
  const { state, panel } = props;
  const { x, y, direction, width, height } = state;
  return (
    <Layout
      grid={
        <CellGrid
          {...state}
          renderCell={({ active, ...props }) =>
            active ? (
              <ActiveCell {...props}>{DIRECTIONS_ARROW[direction]}</ActiveCell>
            ) : (
              <InactiveCell {...props}>
                {figures.squareSmallFilled}
              </InactiveCell>
            )
          }
        />
      }
      sidebar={
        <React.Fragment>
          <Box>x: {x}</Box>
          <Box>y: {y}</Box>
          <Box>direction: {DIRECTIONS[direction]}</Box>
          <Box>width: {width}</Box>
          <Box>height: {height}</Box>
        </React.Fragment>
      }
      panel={panel}
    />
  );
}
