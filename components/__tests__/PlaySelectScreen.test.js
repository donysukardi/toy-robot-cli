import React from 'react';
import { render } from 'ink-testing-library';
import PlaySelectScreen from '../PlaySelectScreen';
import { KEY_ARROW_DOWN, KEY_ARROW_UP, KEY_ENTER } from '../common';
import { sanitizeConsoleString } from '../utils';
import { defaultInitialState } from '../../core';

describe('PlaySelectScreen', () => {
  it('should render', () => {
    const { lastFrame } = render(
      <PlaySelectScreen
        state={defaultInitialState}
        dispatch={jest.fn()}
        setAppMode={jest.fn()}
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

       What do you want to do next?

       ❯ Move one unit forward in current direction
         Rotate left (90° anti-clockwise)
         Rotate right (90° clockwise)
         Toggle keyboard mode
         Reset
         Exit"
    `);
  });

  it('should handle selection', () => {
    const dispatchSpy = jest.fn();
    const setAppModeSpy = jest.fn();

    const { stdin } = render(
      <PlaySelectScreen
        state={defaultInitialState}
        dispatch={dispatchSpy}
        setAppMode={setAppModeSpy}
      />
    );

    // Based on instructions from './commons'
    stdin.write(KEY_ENTER);
    expect(dispatchSpy).toHaveBeenLastCalledWith({ type: 'MOVE' });

    stdin.write(KEY_ARROW_DOWN);
    stdin.write(KEY_ENTER);
    expect(dispatchSpy).toHaveBeenLastCalledWith({ type: 'LEFT' });

    stdin.write(KEY_ARROW_DOWN);
    stdin.write(KEY_ENTER);
    expect(dispatchSpy).toHaveBeenLastCalledWith({ type: 'RIGHT' });

    stdin.write(KEY_ARROW_DOWN);
    stdin.write(KEY_ENTER);
    expect(setAppModeSpy).toHaveBeenLastCalledWith('PLAY_KEYBOARD');

    stdin.write(KEY_ARROW_DOWN);
    stdin.write(KEY_ENTER);
    expect(setAppModeSpy).toHaveBeenLastCalledWith('SIZE');

    stdin.write(KEY_ARROW_UP);
    stdin.write(KEY_ENTER);
    expect(setAppModeSpy).toHaveBeenLastCalledWith('PLAY_KEYBOARD');

    // Add tests for exit once `act` has been added to ink-testing-library
  });
});
