export default {
  'block-0': {
    class: 'test0',
    config: {
      'a0': 0,
      'b0': 0,
      'c0': 0
    },
    sources: []
  },
  'block-1': {
    class: 'test1',
    config: {
      'a1': 1,
      'b1': 1,
      'c1': 1
    },
    sources: []
  },
  'block-2': {
    class: 'test2',
    config: {
      'a2': 2,
      'b2': 2,
      'c2': 2
    },
    sources: ['block-1', 'block-3', 'block-4']
  },
  'block-3': {
    class: 'test3',
    config: {
      'a3': 3,
      'b3': 3,
      'c3': 3
    },
    sources: ['block-1']
  },
  'block-4': {
    class: 'test4',
    config: {
      'a4': 4,
      'b4': 4,
      'c4': 4
    },
    sources: []
  }
}
