export default class StateService {
  state = {
    currentWorkflow: {},
    currentBlock: {},
    formState: false
  }

  setCurrentBlock (block) {
    this.state.currentBlock = block
  }

  setCurrentWorkflow (workflow) {
    this.state.currentWorkflow = workflow
  }

  setFormState (formState) {
    this.state.formState = formState
  }

  get currentWorkflow () {
    return this.state.currentWorkflow
  }
  get currentBlock () {
    return this.state.currentBlock
  }
  get currentFormState () {
    return this.state.currentFormState
  }
}
