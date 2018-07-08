import _ from 'lodash'
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index'
import { safeLoad, safeDump } from 'js-yaml'

export default class GeneratorService {
  constructor () {
    loadLanguages(['yaml'])
  }

  generate (workflow, connections) {
    const connectionsByTarget = _.groupBy(connections, 'targetId')
    const result = {}
    const blocks = workflow.blocks || []
    blocks.forEach(value => {
      const source = _.chain(connectionsByTarget[value.id] || [])
        .map(connection => workflow.getBlock(connection.sourceId).name)
        .uniq()
        .sort()
        .value()
      const name = value.name
      const config = value.fields
      const clazz = value.clazz
      result[name] = {
        class: clazz
      }
      if (config) {
        result[name].config = config
      }
      if (source && source.length > 0) {
        result[name].source = source
      }
    })
    if (Object.keys(result).length > 0) {
      const yamlCode = safeDump(result, {
        sortKeys: true
      })
      return yamlCode
    } else {
      return ''
    }
  }

  generateYamlViewerHTML (yamlCode) {
    return Prism.highlight(yamlCode, Prism.languages.yaml, 'yaml')
  }

  loadFromYaml (yaml) {
    return safeLoad(yaml)
  }
}
