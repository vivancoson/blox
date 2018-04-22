export default [
  {
    name: 'SecuredKafkaInput',
    type: 'input',
    config: {
      'topic': '',
      'broker': '',
      'reset': ''
    }
  },
  {
    name: 'FilterMiddleware',
    type: 'middleware',
    config: {
      'filter': ''
    }
  },
  {
    name: 'HbaseOutput',
    type: 'output',
    config: {
      'id': ''
    }
  }
]
