import React from 'react';
import { render } from 'ink-testing-library';
import PlayKeyboardScreen from '../PlayKeyboardScreen';
import { sanitizeConsoleString } from '../utils';
import { defaultInitialState } from '../../core';

describe('PlayKeyboardScreen', () => {
  it('should render', () => {
    const dispatchSpy = jest.fn();
    const setAppModeSpy = jest.fn();

    const { lastFrame } = render(
      <PlayKeyboardScreen
        state={defaultInitialState}
        dispatch={dispatchSpy}
        setAppMode={setAppModeSpy}
      />
    );

    const lastFrameStr = sanitizeConsoleString(lastFrame());

    expect(lastFrameStr).toMatchInlineSnapshot(`
      "
       ◼  ◼  ◼  ◼  ◼    x: 0
       ◼  ◼  ◼  ◼  ◼    y: 0
       ◼  ◼  ◼  ◼  ◼    direction: NORTH
       ◼  ◼  ◼  ◼  ◼    width: 5
       ↑  ◼  ◼  ◼  ◼    height: 5

       Press the keyboard key for the action

       space  Move one unit forward in current direction
           <  Rotate left (90° anti-clockwise)
           >  Rotate right (90° clockwise)
           q  Toggle keyboard mode
           r  Reset
           x  Exit"
    `);
  });
});
