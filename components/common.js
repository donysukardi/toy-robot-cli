import TextInput from "./TextInput";

const numberField = {
  format: value => (Number.isInteger(value) ? `${value}` : ""),
  parse: value =>
    typeof value !== "undefined" && value !== ""
      ? parseInt(value.replace(/[^0-9]/g, ""))
      : undefined,
  Input: TextInput
};

const DIRECTIONS_ARROW = ["⇧", "⇨", "⇩", "⇦"];
const instructions = [
  {
    label: "Move one unit forward in current direction",
    value: "MOVE",
    keyboard: "space"
  },
  {
    label: "Rotate left (90° anti-clockwise)",
    value: "LEFT",
    keyboard: "<"
  },
  {
    label: "Rotate right (90° clockwise)",
    value: "RIGHT",
    keyboard: ">"
  },
  {
    label: "Toggle keyboard mode",
    value: "KeyboardMode",
    keyboard: "q"
  },
  {
    label: "Reset",
    value: "Reset",
    keyboard: "r"
  },
  {
    label: "Exit",
    value: "Exit",
    keyboard: "x"
  }
];

export { numberField, DIRECTIONS_ARROW, instructions };
