import localforage from 'localforage'
import _ from 'lodash'

export default class storageService {
  constructor () {
    this.localforage = localforage
    this.localforage.config({
      driver: [
        localforage.WEBSQL,
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE
      ]
    })
  }

  set (workflow, connections) {
    const links = _.map(connections, (e) => {
      const targetId = e.targetId
      const sourceId = e.sourceId
      const offsetLeft = e.source.offsetLeft
      const offsetTop = e.source.offsetTop
      return {
        targetId,
        sourceId,
        offsetLeft,
        offsetTop
      }
    })
    return this.localforage.setItem(workflow.id, {
      workflow,
      links
    })
  }

  get (id) {
    return this.localforage.getItem(id)
  }
}
