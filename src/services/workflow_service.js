import _ from 'lodash'

export default class WorkflowService {
  workflows = [];
  index = {}

  addWorkflow ({workflow, links}) {
    if (!this.index[workflow.id]) {
      this.workflows.push({
        workflow,
        links
      })
      this.index[workflow.id] = {
        workflow,
        links
      }
    }
  }

  removeWorkflow (worflow) {
    this.removeWorkflowById(worflow.id)
  }

  removeWorkflowById (id) {
    if (this.index[id]) {
      const index = _.findIndex(this.workflows, (w) => w.workflow.id === id)
      this.workflows.splice(index, 1)
      delete this.index[id]
    }
  }

  addBlockToWorkflow (workflow, block) {
    this.addBlockToWorkflowById(workflow.id, block)
  }

  addBlockToWorkflowById (workflowId, block) {
    const workflow = this.getWorkflow(workflowId)
    if (workflow) {
      workflow.addBlock(block)
    }
  }

  removeBlockFromWorkflow (workflow, block) {
    this.removeBlockFromWorkflowById(workflow.id, block)
  }

  removeBlockFromWorkflowById (workflowId, block) {
    const workflow = this.getWorkflow(workflowId)
    if (workflow) {
      workflow.removeBlock(block)
    }
  }

  getWorkflow (id) {
    return this.index[id].workflow
  }

  get workflowNumber () {
    return this.workflows.length
  }
}
