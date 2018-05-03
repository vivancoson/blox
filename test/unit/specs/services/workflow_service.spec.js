import WorkflowService from '@/services/workflow_service'
import Workflow from '@/models/workflow'
import Block from '@/models/block'

describe('Workflow service tests', () => {
  describe('worflow fetching feature', () => {
    it('should be able to fetch a workflow by id', () => {
      const workflowService = new WorkflowService()
      const someWorkflow = new Workflow(1)
      workflowService.addWorkflow({
        workflow: someWorkflow,
        links: []
      })
      expect(workflowService.getWorkflow(1)).toBe(someWorkflow)
    })
  })
  describe('Worflow adding feature', () => {
    it('should be able to add workflows', () => {
      const workflowService = new WorkflowService()
      const someWorkflow = new Workflow(1)
      workflowService.addWorkflow({
        workflow: someWorkflow,
        links: []
      })
      expect(workflowService.workflowNumber).toBe(1)
    })
    it('should be able to add multiple workflows', () => {
      const workflowService = new WorkflowService()
      const someWorkflow = new Workflow(1)
      const anotherWorkflow = new Workflow(2)
      workflowService.addWorkflow({
        workflow: someWorkflow,
        links: []
      })
      workflowService.addWorkflow({
        workflow: anotherWorkflow,
        links: []
      })
      expect(workflowService.workflowNumber).toBe(2)
    })
    it('should not be able to add the worflow twice', () => {
      const workflowService = new WorkflowService()
      const someWorkflow = new Workflow(1)
      workflowService.addWorkflow({
        workflow: someWorkflow,
        links: []
      })
      workflowService.addWorkflow({
        workflow: someWorkflow,
        links: []
      })
      expect(workflowService.workflowNumber).toBe(1)
    })
    it('should be able to add blocks to an existing workflow', () => {
      const workflowService = new WorkflowService()
      const someWorkflow = new Workflow(1)
      workflowService.addWorkflow({
        workflow: someWorkflow,
        links: []
      })
      workflowService.addWorkflow({
        workflow: someWorkflow,
        links: []
      })

      const block = new Block(1)
      workflowService.addBlockToWorkflow(someWorkflow, block)
      expect(someWorkflow.blockNumber).toBe(1)
    })
    it('should not be able to add blocks if the workflow does not exist', () => {
      const workflowService = new WorkflowService()
      const someWorkflow = new Workflow(1)
      const block = new Block(1)
      workflowService.addBlockToWorkflow(someWorkflow, block)
      expect(someWorkflow.blockNumber).toBe(0)
    })
  })
  describe('worflow removing feature', () => {
    it('should be able to remove workflows', () => {
      const workflowService = new WorkflowService()
      const workflow = new Workflow(1)
      workflowService.addWorkflow({
        workflow,
        links: []
      })
      workflowService.removeWorkflow(workflow)
      expect(workflowService.workflowNumber).toBe(0)
    })
    it('should be able to remove workflows by id', () => {
      const workflowService = new WorkflowService()
      const workflow = new Workflow(1)
      workflowService.addWorkflow({
        workflow,
        links: []
      })
      expect(workflowService.removeWorkflowById(1)).toBe(true)
    })
    it('should return false if the workflow do not exist', () => {
      const workflowService = new WorkflowService()
      expect(workflowService.removeWorkflowById(1)).toBe(false)
    })
    it('should be able to remove blocks from existing workflow', () => {
      const workflowService = new WorkflowService()
      const someWorkflow = new Workflow(1)
      workflowService.addWorkflow({
        workflow: someWorkflow,
        links: []
      })
      workflowService.addWorkflow({
        workflow: someWorkflow,
        links: []
      })

      const block = new Block(1)
      workflowService.addBlockToWorkflow(someWorkflow, block)
      expect(someWorkflow.blockNumber).toBe(1)
      workflowService.removeBlockFromWorkflow(someWorkflow, block)
      expect(someWorkflow.blockNumber).toBe(0)
    })

    it('should not be able to remove blocks from non existing workflow', () => {
      const workflowService = new WorkflowService()
      const someWorkflow = new Workflow(1)
      workflowService.addWorkflow({
        workflow: someWorkflow,
        links: []
      })

      const block = new Block(1)
      workflowService.removeBlockFromWorkflow(2, block)
      expect(someWorkflow.blockNumber).toBe(0)
    })
  })
})
