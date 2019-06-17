// Silence `act` errors as it's not implemented in ink-testing-library yet
global.__CONSOLE_ERROR__ = global.console.error;
global.console.error = function(...args) {
  const message = args[0];
  if (message.includes('not wrapped in act')) {
    return;
  }
  global.__CONSOLE_ERROR__(...args);
};
