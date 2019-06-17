import React from 'react';
import { render } from 'ink-testing-library';
import SizeScreen from '../SizeScreen';
import { KEY_ENTER } from '../common';
import { sanitizeConsoleString } from '../utils';
import { defaultInitialState } from '../../core';

describe('SizeScreen', () => {
  it('should render', () => {
    const { lastFrame } = render(
      <SizeScreen
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
      ◼  ◼  ◼  ◼  ◼

      First, let's set the size of the table

      width: 5
      height: 5"
    `);
  });

  it('should register user inputs', () => {
    const dispatchSpy = jest.fn();
    const setAppModeSpy = jest.fn();

    const { lastFrame, stdin } = render(
      <SizeScreen
        state={defaultInitialState}
        dispatch={dispatchSpy}
        setAppMode={setAppModeSpy}
      />
    );

    stdin.write('6');
    stdin.write(KEY_ENTER);
    stdin.write('15');
    stdin.write(KEY_ENTER);

    const lastFrameStr = sanitizeConsoleString(lastFrame());

    expect(lastFrameStr).toMatchInlineSnapshot(`
      "
       ◼  ◼  ◼  ◼  ◼  ◼
       ◼  ◼  ◼  ◼  ◼  ◼
       ◼  ◼  ◼  ◼  ◼  ◼
       ◼  ◼  ◼  ◼  ◼  ◼
       ◼  ◼  ◼  ◼  ◼  ◼
       ◼  ◼  ◼  ◼  ◼  ◼
       ◼  ◼  ◼  ◼  ◼  ◼
       ◼  ◼  ◼  ◼  ◼  ◼
       ◼  ◼  ◼  ◼  ◼  ◼
       ◼  ◼  ◼  ◼  ◼  ◼

       First, let's set the size of the table

       width: 6  ✔
       height: 15   ✖ Invalid, 1 to 10 only"
    `);
  });
});
