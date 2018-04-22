export default class Workflow {
  blocks = new Map();

  constructor (id) {
    this.id = id
  }

  addBlock (block) {
    this.blocks.set(block.id, block)
  }

  removeBlock (block) {
    this.removeBlockById(block.id)
  }

  removeBlockById (id) {
    this.blocks.delete(id)
  }

  getBlock (id) {
    return this.blocks.get(id)
  }

  get blockNumber () {
    return this.blocks.size
  }
}
