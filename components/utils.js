import React from 'react';
import { StdinContext } from 'ink';

function useKeyHandler(keyHandler) {
  const { stdin, setRawMode } = React.useContext(StdinContext);

  React.useEffect(() => {
    setRawMode(true);
    stdin.on('data', keyHandler);
    return () => {
      stdin.off('data', keyHandler);
      setRawMode(false);
    };
  }, [stdin, setRawMode]);
}

function sanitizeConsoleString(str) {
  return str.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  );
}

export { useKeyHandler, sanitizeConsoleString };
