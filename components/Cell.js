import React from "react";
import { Color } from "ink";

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

  return blinking ? " " : children;
}

export function InactiveCell({ children }) {
  return (
    <Color gray dim>
      {children}
    </Color>
  );
}

export function ActiveCell({ children }) {
  return (
    <Color bold green>
      {children}
    </Color>
  );
}

export function BlinkingActiveCell({ children }) {
  return (
    <Color bold green>
      <Blink>{children}</Blink>
    </Color>
  );
}
