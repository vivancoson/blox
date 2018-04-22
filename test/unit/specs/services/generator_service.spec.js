import GeneratorService from '@/services/generator_service'
import connectionsInput from '../data/connections.input'
import workflowExpected from '../data/connections.expected'
import Workflow from '../../../../src/models/workflow'
import _ from 'lodash'
import Block from '../../../../src/models/block'

describe('generator service tests', () => {
  const yamlGenerator = new GeneratorService()
  it('should generate yaml from workflow model', () => {
    const workflow = new Workflow(1)
    _.range(5).forEach(num => {
      workflow.addBlock(new Block(num, `block-${num}`, 'input', `test${num}`, {
        [`a${num}`]: num,
        [`b${num}`]: num,
        [`c${num}`]: num
      }))
    })
    const worflowGenerated = yamlGenerator.generate(workflow, connectionsInput)
    expect(worflowGenerated).toEqual(workflowExpected)
  })

})
