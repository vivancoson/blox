export default class StateService {
  state = {
    workflow: {
      currentWorkflow: {},
      currentBlock: {}
    },
    form: {
      state: false
    },
    viewer: {
      viewerDirty: false,
      drawer: true
    },
    navigator: {
      drawer: true
    }
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
    this.state.viewer.viewerDirty = dirty
  }

  setDrawerOpen (open) {
    this.state.navigator.drawer = open
  }
  setViewerDrawerClosed (close) {
    this.state.viewer.drawer = close
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

  get currentViewerState () {
    return this.state.viewer
  }

  get currentNavigatorState () {
    return this.state.navigator
  }
}
