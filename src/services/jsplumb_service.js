import { jsPlumb } from 'jsplumb';
import constants from '../constants/constants';

export default class JsPlumbService {
  instance = null;
  handlers = [];
  createInstance() {
    const instance = jsPlumb.getInstance({
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
            length: 23,
          },
        ],
      ],
    });
    for (const event in constants.connectionEvents) {
      if ({}.hasOwnProperty.call(constants.connectionEvents, event)) {
        instance.bind(constants.connectionEvents[event], (info, originalEvent) => {
          this.handlers.forEach(h => h(info, constants.connectionEvents[event], originalEvent));
        });
      }
    }
    return instance;
  }

  getInstance() {
    if (this.instance === null) {
      this.instance = this.createInstance();
    }
    return this.instance;
  }

  listenToConnectionChanges(handler) {
    this.handlers.push(handler);
  }

  getAllConnections() {
    return this.getInstance().getAllConnections();
  }

  repaintEverything() {
    this.getInstance().repaintEverything();
  }

  removeConnections(block) {
    this.instance.remove(block.id);
  }

  removeFilteredConnections(blocks) {
    this.batch(() => {
      this.instance.selectEndpoints().setVisible(true);
      this.instance.selectEndpoints({
        element: blocks.filter(e => e.filtered).map(e => e.id),
      }).setVisible(false);
    });
  }

  showAllConnections() {
    this.batch(() => {
      this.instance.selectEndpoints().setVisible(true);
    });
  }

  clearWorkflow() {
    this.batch(this.getInstance().deleteEveryEndpoint);
  }

  connect(sourceId, targetId) {
    this.getInstance().connect({
      source: sourceId,
      target: targetId,
    });
  }

  initiateBlock(block, drag) {
    const instance = this.getInstance();
    instance.draggable(block.id, {
      containment: 'true',
      drag,
    });

    if (block.type !== constants.blockTypes.output.value) {
      instance.makeSource(block.id, {
        filter: '.ep',
        maxConnections: -1,
        allowLoopback: false,
      });
    }
    if (block.type !== constants.blockTypes.input.value) {
      instance.makeTarget(block.id, {
        allowLoopback: false,
      });
    }
  }

  batch(batch) {
    const instance = this.getInstance();
    instance.batch(batch);
  }
}
