import { jsPlumb } from 'jsplumb';
import constants from '../constants/constants';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default class JsPlumbService {
  instance = null;
  hasListener = false;

  createInstance() {
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
            length: 23,
          },
        ],
      ],
    });
  }

  getInstance() {
    if (this.instance === null) {
      this.instance = this.createInstance();
    }
    return this.instance;
  }

  listenToConnectionChanges(handler) {
    if (this.hasListener === false) {
      for (const event in constants.connectionEvents) {
        if ({}.hasOwnProperty.call(constants.connectionEvents, event)) {
          this.getInstance().bind(constants.connectionEvents[event], handler);
        }
      }
      this.getInstance().bind('connection', (info) => {
        const con = info.connection; // this is the new connection
        con.bind('click', () => {
          con.setPaintStyle({
            strokeWidth: 5,
            stroke: getRandomColor(),
          });
        });
      });
      this.hasListener = true;
    }
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

  clearWorkflow() {
    this.getInstance().deleteEveryEndpoint();
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
