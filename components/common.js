import figures from 'figures';
import TextInput from './TextInput';

const KEY_ARROW_LEFT = '\u001B\u005B\u0044';
const KEY_ARROW_RIGHT = '\u001B\u005B\u0043';
const KEY_ARROW_UP = '\u001B[A';
const KEY_ARROW_DOWN = '\u001B[B';
const KEY_ENTER = '\r';

const numberField = {
  format: value => (Number.isInteger(value) ? `${value}` : ''),
  parse: value =>
    typeof value !== 'undefined' && value !== ''
      ? parseInt(value.replace(/[^0-9]/g, ''))
      : undefined,
  Input: TextInput,
};

const DIRECTIONS_ARROW = [
  figures.arrowUp,
  figures.arrowRight,
  figures.arrowDown,
  figures.arrowLeft,
];
const instructions = [
  {
    label: 'Move one unit forward in current direction',
    value: 'MOVE',
    keyboard: 'space',
  },
  {
    label: 'Rotate left (90° anti-clockwise)',
    value: 'LEFT',
    keyboard: '<',
  },
  {
    label: 'Rotate right (90° clockwise)',
    value: 'RIGHT',
    keyboard: '>',
  },
  {
    label: 'Toggle keyboard mode',
    value: 'KeyboardMode',
    keyboard: 'q',
  },
  {
    label: 'Reset',
    value: 'Reset',
    keyboard: 'r',
  },
  {
    label: 'Exit',
    value: 'Exit',
    keyboard: 'x',
  },
];

export {
  numberField,
  instructions,
  DIRECTIONS_ARROW,
  KEY_ARROW_LEFT,
  KEY_ARROW_RIGHT,
  KEY_ARROW_UP,
  KEY_ARROW_DOWN,
  KEY_ENTER,
};
