import _ from 'lodash'

export default class GeneratorService {
  generate (worflow, connections) {
    const connectionsByTarget = _.groupBy(connections, 'targetId')
    const result = {}
    worflow.blocks.forEach((value, key) => {
      const sources = _.chain(connectionsByTarget[key] || [])
        .map((connection) => worflow.getBlock(connection.sourceId).name)
        .uniq()
        .sort()
        .value()
      const name = value.name
      const config = value.fields
      const clazz = value.clazz
      result[name] = {
        class: clazz,
        config,
        sources
      }
    })
    return result
  }
}
