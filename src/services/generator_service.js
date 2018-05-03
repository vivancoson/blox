import _ from 'lodash'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index'
import {safeDump} from 'js-yaml'

export default class GeneratorService {
  constructor () {
    loadLanguages(['yaml'])
  }

  generate (worflow, connections) {
    const connectionsByTarget = _.groupBy(connections, 'targetId')
    const result = {}
    const blocks = worflow.blocks || []
    blocks.forEach((value) => {
      const sources = _.chain(connectionsByTarget[value.id] || [])
        .map((connection) => worflow.getBlock(connection.sourceId).name)
        .uniq()
        .sort()
        .value()
      const name = value.name
      const config = value.fields
      const clazz = value.clazz
      result[name] = {
        class: clazz,
        config
      }
      if (sources && sources.length > 0) {
        result[name].sources = sources
      }
    })
    if (Object.keys(result).length > 0) {
      const yamlCode = safeDump(result, {
        'sortKeys': true
      })
      return Prism.highlight(yamlCode, Prism.languages.yaml, 'yaml')
    } else {
      return ''
    }
  }

  loadFromYaml (yaml) {

  }
}
