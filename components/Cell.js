import React from 'react';
import { Text } from 'ink';

function Blink({ children }) {
  const [blinking, setBlinking] = React.useState(false);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setBlinking(x => !x);
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return blinking ? ' ' : children;
}

export function InactiveCell({ children }) {
  return (
    <Text color="gray" dim>
      {children}
    </Text>
  );
}

export function ActiveCell({ children }) {
  return (
    <Text bold color="green">
      {children}
    </Text>
  );
}

export function BlinkingActiveCell({ children }) {
  return (
    <Text bold color="green">
      <Blink>{children}</Blink>
    </Text>
  );
}
