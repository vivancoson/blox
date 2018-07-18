import _ from 'lodash';

export default class Workflow {
  blocks = [];
  index = {};
  constructor(id) {
    this.id = id;
  }

  addBlock(block) {
    if (!this.index[block.id]) {
      this.blocks.push(block);
      this.index[block.id] = block;
    }
  }

  removeBlock(block) {
    this.removeBlockById(block.id);
  }

  removeBlockById(id) {
    if (this.index[id]) {
      delete this.index[id];
      const elementIndex = _.findIndex(this.blocks, { id });
      this.blocks.splice(elementIndex, 1);
    }
  }
  clear() {
    this.blocks.splice(0, this.blocks.length);
    this.index = {};
  }
  getBlock(id) {
    return this.index[id];
  }

  get blockNumber() {
    return this.blocks.length;
  }
}
