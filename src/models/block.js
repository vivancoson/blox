export default class Block {
  constructor (id, name, type, clazz, fields, details = {}, suggestions = {}) {
    this.id = id
    this.name = name
    this.type = type
    this.clazz = clazz
    this.fields = fields
    this.details = details
    this.suggestions = suggestions
  }

  setPosition (positionX, positionY) {
    this.positionX = positionX
    this.positionY = positionY
  }
}
