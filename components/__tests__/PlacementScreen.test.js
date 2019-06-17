import React from 'react';
import { render } from 'ink-testing-library';
import PlacementScreen from '../PlacementScreen';
import { KEY_ENTER, KEY_ARROW_DOWN } from '../common';
import { sanitizeConsoleString } from '../utils';
import { defaultInitialState } from '../../core';

describe('PlacementScreen', () => {
  it('should render', () => {
    const { lastFrame } = render(
      <PlacementScreen
        state={defaultInitialState}
        dispatch={jest.fn()}
        setAppMode={jest.fn()}
      />
    );

    const lastFrameStr = sanitizeConsoleString(lastFrame());

    expect(lastFrameStr).toMatchInlineSnapshot(`
                  "
                   ◼  ◼  ◼  ◼  ◼
                   ◼  ◼  ◼  ◼  ◼
                   ◼  ◼  ◼  ◼  ◼
                   ◼  ◼  ◼  ◼  ◼
                   ↑  ◼  ◼  ◼  ◼

                   Now, let's place our toy robot

                   x: 0
                   y: 0
                   direction: NORTH"
            `);
  });

  it('should register user inputs', () => {
    const dispatchSpy = jest.fn();
    const setAppModeSpy = jest.fn();

    const { lastFrame, stdin } = render(
      <PlacementScreen
        state={{
          ...defaultInitialState,
          width: 2,
          height: 2,
        }}
        dispatch={dispatchSpy}
        setAppMode={setAppModeSpy}
      />
    );

    stdin.write('1');
    stdin.write(KEY_ENTER);
    stdin.write('0');
    stdin.write(KEY_ENTER);
    stdin.write(KEY_ARROW_DOWN);
    stdin.write(KEY_ENTER);

    const lastFrameStr = sanitizeConsoleString(lastFrame());

    expect(lastFrameStr).toMatchInlineSnapshot(`
      "
       ◼  ◼
       ◼  →

       Now, let's place our toy robot

       x: 1  ✔
       y: 0  ✔
       direction: EAST  ✔"
    `);
  });
});
