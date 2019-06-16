import React, { useEffect } from "react";
import { Box, Color, Text } from "ink";
import { PlayLayout } from "./Layout";
import { instructions } from "./common";
import { useKeyHandler } from "./utils";

export default function PlayKeyboardScreen(props) {
  const [exiting, setExiting] = React.useState(false);
  const { state, dispatch, setAppMode } = props;

  React.useEffect(() => {
    if (exiting) {
      process.exit(0);
    }
  }, [exiting]);

  useKeyHandler(data => {
    if (data === " ") dispatch({ type: "MOVE" });
    if (data === "\u001B\u005B\u0044") dispatch({ type: "LEFT" });
    if (data === "\u001B\u005B\u0043") dispatch({ type: "RIGHT" });
    if (data === "q") setAppMode("PLAY_SELECT");
    if (data === "r") setAppMode("SIZE");
    if (data === "x") setExiting(true);
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
                        <Color blue>{x.keyboard}</Color>
                      </Box>
                    </Box>
                    <Box marginLeft={2}>{x.label}</Box>
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
