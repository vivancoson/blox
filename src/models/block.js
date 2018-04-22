export default class Block {
  constructor (id, name, type, clazz, fields) {
    this.id = id
    this.name = name
    this.type = type
    this.clazz = clazz
    this.fields = fields
  }

  setPosition (positionX, positionY) {
    this.positionX = positionX
    this.positionY = positionY
  }
}
