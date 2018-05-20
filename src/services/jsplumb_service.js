import { jsPlumb } from 'jsplumb'
import _ from 'lodash'
import constants from '../constants/constants'

export default class JsPlumbService {
  instances = {}
  createInstance () {
    return jsPlumb.getInstance({
      Container: 'container',
      Connector: 'StateMachine',
      Anchor: ['Perimeter', { shape: 'Square' }],
      EndpointStyle: { fill: '#303030', stroke: '#f4f1d0' },
      PaintStyle: { strokeWidth: 5, stroke: '#f4f1d0' },
      ConnectionOverlays: [
        [
          'Arrow',
          {
            location: 1,
            width: 23,
            length: 23
          }
        ]
      ]
    })
  }

  getInstance (workflow) {
    if (!this.instances[workflow.id]) {
      this.instances[workflow.id] = {
        instance: this.createInstance(),
        hasListener: false
      }
    }
    return this.instances[workflow.id]
  }

  getAllConnections (workflow) {
    return this.getInstance(workflow).instance.getAllConnections()
  }

  repaintEverything (workflow) {
    this.getInstance(workflow).instance.repaintEverything()
  }

  listenToConnectionChanges (workflow, handler) {
    const instance = this.getInstance(workflow)
    if (!instance.hasListener) {
      _.forOwn(constants.connectionEvents, value => {
        instance.instance.bind(value, handler)
      })
      instance.hasListener = true
    }
  }

  removeConnections (workflow, block) {
    this.getInstance(workflow).instance.remove(block.id)
  }

  connect (workflow, sourceId, targetId) {
    this.getInstance(workflow).instance.connect({
      source: sourceId,
      target: targetId
    })
  }

  async initiateBlock (workflow, block) {
    const instance = this.getInstance(workflow).instance
    instance.draggable(block.id, {
      containment: 'true'
    })

    if (block.type !== constants.blockTypes.output.value) {
      instance.makeSource(block.id, {
        filter: '.ep',
        maxConnections: -1,
        allowLoopback: false
      })
    }

    if (block.type !== constants.blockTypes.input.value) {
      instance.makeTarget(block.id, {
        allowLoopback: false,
        maxConnections: -1
      })
    }
  }
}
