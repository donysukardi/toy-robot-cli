import React from "react";
import PropTypes from "prop-types";
import SizeScreen from "../components/SizeScreen";
import PlacementScreen from "../components/PlacementScreen";
import PlayKeyboardScreen from "../components/PlayKeyboardScreen";
import PlaySelectScreen from "../components/PlaySelectScreen";
import { useBoardReducer } from "../core";

/// Toy Robot Command Line Application
function ToyRobot(props) {
  const { default: useDefaultConfig } = props;
  const [state, dispatch] = useBoardReducer();
  const [appMode, setAppMode] = React.useState(() =>
    useDefaultConfig ? "PLAY_SELECT" : "SIZE"
  );
  const screenProps = { state, dispatch, appMode, setAppMode };

  if (appMode === "SIZE") {
    return <SizeScreen {...screenProps} />;
  } else if (appMode === "PLACEMENT") {
    return <PlacementScreen {...screenProps} />;
  } else if (appMode === "PLAY_KEYBOARD") {
    return <PlayKeyboardScreen {...screenProps} />;
  } else if (appMode === "PLAY_SELECT") {
    return <PlaySelectScreen {...screenProps} />;
  }
}

ToyRobot.propTypes = {
  /// Run the application with default values
  default: PropTypes.bool
};

export default ToyRobot;
