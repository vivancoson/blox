export default class StateService {
  state = {
    workflow: {
      currentWorkflow: {},
      currentBlock: {}
    },
    form: {
      state: false
    },
    viewerDirty: false

  }

  setCurrentBlock (block) {
    this.state.workflow.currentBlock = block
  }

  setCurrentWorkflow (workflow) {
    this.state.workflow.currentWorkflow = workflow
  }

  setFormState (formState) {
    this.state.form.state = formState
  }

  setViewerDirty (dirty) {
    this.state.viewerDirty = dirty
  }

  get currentWorkflow () {
    return this.state.workflow.currentWorkflow
  }
  get currentBlock () {
    return this.state.workflow.currentBlock
  }
  get currentFormState () {
    return this.state.form.state
  }
}
