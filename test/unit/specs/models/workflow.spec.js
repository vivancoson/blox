import Workflow from '@/models/workflow'
import Block from '@/models/block'

describe('Workflow model tests', () => {
  it('should be able to add blocks', () => {
    const workflow = new Workflow(1)
    const block = new Block(1)
    workflow.addBlock(block)
    expect(workflow.blockNumber).toBe(1)
  })
  it('should be able to remove blocks', () => {
    const workflow = new Workflow(1)
    const block = new Block(2)
    workflow.addBlock(block)
    expect(workflow.blockNumber).toBe(1)
    workflow.removeBlock(block)
    expect(workflow.blockNumber).toBe(0)
  })

  it('should be able to get block', () => {
    const workflow = new Workflow(1)
    const block = new Block(2)
    workflow.addBlock(block)
    expect(workflow.getBlock(2)).toBe(block)
  })
})
