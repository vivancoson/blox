export default {
  blockTypes: {
    input: {
      value: 'input',
      color: 'block-input',
    },
    middleware: {
      value: 'middleware',
      color: 'block-middleware',
    },
    output: {
      value: 'output',
      color: 'block-output',
    },
  },
  connectionEvents: {
    attached: 'connection',
    detached: 'connectionDetached',
    moved: 'connectionMoved',
  },
};
