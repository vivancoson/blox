import localforage from 'localforage'
import _ from 'lodash'

export default class storageService {
  constructor () {
    this.localforage = localforage
    this.localforage.config({
      driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE
      ]
    })
  }

  set (workflow, connections, prefix = '') {
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
    if (prefix.length) {
      prefix += '_'
    }
    return this.localforage.setItem(`${prefix}${workflow.id}`.toString(), {
      workflow,
      links
    })
  }

  setCurrent (key, workflow, connections) {
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
    return this.localforage.setItem(key, {
      workflow,
      links
    })
  }

  getCurrent (key) {
    return this.localforage.getItem(key)
  }

  keys () {
    return this.localforage.keys()
  }

  iterate (handler, prefix = '') {
    return this.localforage.iterate((value, key, number) => {
      if (key.startsWith(prefix)) {
        handler(value, key, number)
      }
    })
  }

  get (workflow, prefix = '') {
    if (prefix.length) {
      prefix += '_'
    }
    return this.localforage.getItem(`${prefix}${workflow.id}`)
  }
}
