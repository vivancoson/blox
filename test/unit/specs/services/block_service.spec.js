import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import inputDefinitions from '../data/block_definitions.input'
import expectedDefinitions from '../data/block_definitions.expected'
import BlockService from '@/services/block_service'

describe('generator service tests', () => {
  it('should be able to get the definitions from a remote server', (done) => {
    const blockService = new BlockService()
    const mock = new MockAdapter(axios)
    mock.onGet().reply(200, inputDefinitions)
    blockService.getDefinitions().then(response => {
      expect(response).toEqual(expectedDefinitions)
      done()
    })
  })
})
