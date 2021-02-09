import React from 'react';
import { Box, Color, Text, useInput } from 'ink';
import { PlayLayout } from './Layout';
import { instructions, KEY_ARROW_LEFT, KEY_ARROW_RIGHT } from './common';
import { useKeyHandler } from './utils';

export default function PlayKeyboardScreen(props) {
  const [exiting, setExiting] = React.useState(false);
  const { state, dispatch, setAppMode } = props;

  React.useEffect(() => {
    if (exiting) {
      process.exit(0);
    }
  }, [exiting]);

  useInput((input, key) => {
    if (input === ' ') dispatch({ type: 'MOVE' });
    if (key.leftArrow) dispatch({ type: 'LEFT' });
    if (key.rightArrow) dispatch({ type: 'RIGHT' });
    if (input === 'q') setAppMode('PLAY_SELECT');
    if (input === 'r') setAppMode('SIZE');
    if (input === 'x') setExiting(true);
  });

  return (
    <PlayLayout
      state={state}
      panel={
        <Box flexDirection="column">
          {exiting ? (
            <Box>
              <Text bold>
                Thank you for using this application. See you again!
              </Text>
            </Box>
          ) : (
            <>
              <Box marginBottom={1}>
                <Text bold>Press the keyboard key for the action</Text>
              </Box>
              <Box flexDirection="column">
                {instructions.map(x => (
                  <Box key={x.value} flexDirection="row">
                    <Box width={5} justifyContent="flex-end">
                      <Box>
                        <Text color="blue">{x.keyboard}</Text>
                      </Box>
                    </Box>
                    <Box marginLeft={2}>
                      <Text>{x.label}</Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
      }
    />
  );
}
