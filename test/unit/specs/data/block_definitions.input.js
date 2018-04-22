export default {
  SecuredKafkaInput: {
    config: {
      topic: '',
      broker: '',
      reset: ''
    },
    type: 'input'
  },
  FilterMiddleware: {
    config: {
      filter: ''
    },
    type: 'middleware'
  },
  HbaseOutput: {
    config: {
      id: ''
    },
    type: 'output'
  }
}
