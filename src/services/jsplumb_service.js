import {jsPlumb} from 'jsplumb'
import _ from 'lodash'
import constants from '../constants/constants'

export default class JsPlumbService {
  instances = {
  }
  createInstance () {
    return jsPlumb.getInstance({
      Container: 'container',
      Connector: 'StateMachine',
      Anchor: ['Perimeter', { shape: 'Square' }],
      Endpoint: ['Dot', { radius: 10 }],
      ConnectionOverlays: [
        [
          'Arrow',
          {
            location: 1,
            width: 10,
            length: 7,
            foldbackPoint: 0.62
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
  listenToConnectionChanges (workflow, handler) {
    const instance = this.getInstance(workflow)
    if (!instance.hasListener) {
      _.forOwn(constants.connectionEvents, (value) => {
        instance.instance.bind(value, handler)
      })
      instance.hasListener = true
    }
  }
  removeConnections (workflow, block) {
    this.getInstance(workflow).instance.remove(block.id)
  }
  initiateBlock (workflow, block) {
    const instance = this.getInstance(workflow).instance
    instance.draggable(block.id, {
      containment: 'true'
    })

    if (block.type !== constants.blockTypes.output.value) {
      instance.makeSource(block.id, {
        filter: '.ep',
        anchor: 'Continuous',
        connectorStyle: {
          stroke: '#5c96bc', strokeWidth: 2, outlineStroke: 'transparent', outlineWidth: 4
        },
        connectionType: 'basic',
        extract: {
          action: 'the-action'
        },
        maxConnections: -1,
        allowLoopback: false
      })
    }

    if (block.type !== constants.blockTypes.input.value) {
      instance.makeTarget(block.id, {
        anchor: 'Continuous',
        allowLoopback: false,
        maxConnections: -1
      })
    }
  }
}
