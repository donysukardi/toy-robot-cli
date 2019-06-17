import React from 'react';
import { Color } from 'ink';
import { render } from 'ink-testing-library';
import { sanitizeConsoleString } from '../utils';

describe('sanitizeConsoleString', () => {
  it('should remove colors from console output string', () => {
    const { lastFrame } = render(<Color green>Hello</Color>);
    const lastFrameString = sanitizeConsoleString(lastFrame());

    expect(lastFrameString).toEqual('Hello');
  });
});
