import {jsPlumb} from 'jsplumb'
import _ from 'lodash'
import constants from '../constants/constants'

export default class JsPlumbService {
  constructor () {
    this.instance = jsPlumb.getInstance({
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
  getAllConnections () {
    return this.instance.getAllConnections()
  }
  listenToConnectionChanges (handler) {
    _.forOwn(constants.connectionEvents, (value) => {
      this.instance.bind(value, handler)
    })
  }
  removeConnections (block) {
    this.instance.remove(block.id)
  }
  initiateBLock (block) {
    this.instance.draggable(block.id, {
      containment: 'true'
    })

    if (block.type !== constants.blockTypes.output.value) {
      this.instance.makeSource(block.id, {
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
      this.instance.makeTarget(block.id, {
        anchor: 'Continuous',
        allowLoopback: false,
        maxConnections: -1
      })
    }
  }
}
