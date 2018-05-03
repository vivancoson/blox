export default [
  {
    name: 'SecuredKafkaInput',
    type: 'input',
    color: 'block-input',
    config: {
      'topic': '',
      'broker': '',
      'reset': ''
    }
  },
  {
    name: 'FilterMiddleware',
    type: 'middleware',
    color: 'block-middleware',
    config: {
      'filter': ''
    }
  },
  {
    name: 'HbaseOutput',
    type: 'output',
    color: 'block-output',
    config: {
      'id': ''
    }
  }
]
