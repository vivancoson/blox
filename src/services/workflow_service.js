export default class WorkflowService {
  workflows = new Map();

  addWorkflow (workflow) {
    this.workflows.set(workflow.id, workflow)
  }

  removeWorkflow (worflow) {
    return this.removeWorkflowById(worflow.id)
  }

  removeWorkflowById (id) {
    return this.workflows.delete(id)
  }

  addBlockToWorkflow (workflow, block) {
    this.addBlockToWorkflowById(workflow.id, block)
  }

  addBlockToWorkflowById (workflowId, block) {
    const workflow = this.getWorkflow(workflowId)
    if(workflow) {
      workflow.addBlock(block)
    }
  }

  removeBlockFromWorkflow (workflow, block) {
    this.removeBlockFromWorkflowById(workflow.id, block)
  }

  removeBlockFromWorkflowById (workflowId, block) {
    const workflow = this.getWorkflow(workflowId)
    if(workflow) {
      workflow.removeBlock(block)
    }
  }

  getWorkflow (id) {
    return this.workflows.get(id)
  }

  get workflowNumber () {
    return this.workflows.size
  }
}
