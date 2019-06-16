import React from "react";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { PlayLayout } from "./Layout";
import { instructions } from "./common";

export default function PlaySelectScreen(props) {
  const [exiting, setExiting] = React.useState(false);
  const { state, dispatch, setAppMode } = props;

  React.useEffect(() => {
    if (exiting) {
      process.exit(0);
    }
  }, [exiting]);

  const handleSelect = item => {
    if (item.value === "KeyboardMode") {
      setAppMode("PLAY_KEYBOARD");
    } else if (item.value === "Reset") {
      setAppMode("SIZE");
    } else if (item.value === "Exit") {
      setExiting(true);
    } else {
      dispatch({ type: item.value });
    }
  };

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
                <Text bold>What do you want to do next?</Text>
              </Box>
              <SelectInput items={instructions} onSelect={handleSelect} />
            </>
          )}
        </Box>
      }
    />
  );
}
