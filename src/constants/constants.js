export default {
  blockTypes: {
    input: {
      value: 'input',
      color: 'blue'
    },
    middleware: {
      value: 'middleware',
      color: 'orange'
    },
    output: {
      value: 'output',
      color: 'purple'
    }
  },
  connectionEvents: {
    attached: 'connection',
    detached: 'connectionDetached',
    moved: 'connectionMoved'
  }
}
