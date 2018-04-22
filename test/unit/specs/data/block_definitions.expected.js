export default [
  {
    name: 'SecuredKafkaInput',
    type: 'input',
    color: 'blue',
    config: {
      'topic': '',
      'broker': '',
      'reset': ''
    }
  },
  {
    name: 'FilterMiddleware',
    type: 'middleware',
    color: 'orange',
    config: {
      'filter': ''
    }
  },
  {
    name: 'HbaseOutput',
    type: 'output',
    color: 'purple',
    config: {
      'id': ''
    }
  }
]
