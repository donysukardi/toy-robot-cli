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

export { useKeyHandler };
