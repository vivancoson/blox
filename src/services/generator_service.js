import _ from 'lodash';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';
import prismyaml from 'prismjs/components/prism-yaml';
import { safeLoad, safeDump } from 'js-yaml';
import 'prismjs/themes/prism-okaidia.css';

export default class GeneratorService {
  constructor() {
    loadLanguages(prismyaml);
  }

  generate(blockInWorkflow, connections) {
    const connectionsByTarget = _.groupBy(connections, 'targetId');
    const result = {};
    blockInWorkflow.forEach((block) => {
      const source = _.chain(connectionsByTarget[block.id] || [])
        .map(connection =>
          blockInWorkflow.filter(b => b.id === connection.sourceId)[0].name)
        .uniq()
        .sort()
        .value();
      const { name } = block;
      const config = block.fields;
      const { clazz } = block;
      result[name] = {
        class: clazz,
      };
      if (config) {
        result[name].config = config;
      }
      if (source && source.length > 0) {
        result[name].source = source;
      }
    });
    if (Object.keys(result).length > 0) {
      const yamlCode = safeDump(result, {
        sortKeys: true,
      });
      return yamlCode;
    }
    return '';
  }

  generateYamlViewerHTML(yamlCode) {
    return Prism.highlight(yamlCode, Prism.languages.yaml, 'yaml');
  }

  loadFromYaml(yaml) {
    return safeLoad(yaml, {
      json: true,
    });
  }
}
