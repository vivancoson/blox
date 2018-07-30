import axios from 'axios';
import _ from 'lodash';
import constants from '../constants/constants';

export default class BlockService {
  calculatePositions(blocksList) {
    const initOffsetY = 100;
    let startOffsetX = 100;
    let startOffsetY = 100;
    const width = 180;
    const height = 180;

    const blocksByType = _.groupBy(blocksList, b => b.type);
    _.forEach(blocksByType, (blocks) => {
      blocks.forEach((block) => {
        block.setPosition(startOffsetX, startOffsetY);
        startOffsetY += height;
      });
      startOffsetX += width;
      startOffsetY = initOffsetY;
    });
  }

  getDefinitions() {
    return axios
      .all([
        axios.get('static/bloc-definitions.json'),
        axios.get('static/autocomplete-dictionary.json'),
      ])
      .then(axios.spread((defs, dict) => ({
        defs: defs.data,
        dict: dict.data,
      })))
      .then(data =>
        _.transform(
          data.defs,
          (result, value, key) => {
            for (const bloc in value) {
              if ({}.hasOwnProperty.call(value, bloc)) {
                const name = bloc;
                const clazz = value[bloc].class;
                const { config } = value[bloc];
                const type = key;
                const { group } = value[bloc];
                const suggestions = data.dict[group] || {};
                const description = value[bloc].description || '';
                const details = value[bloc].details || {};
                const { color } = constants.blockTypes[type];
                _.forOwn(config, (e) => {
                  suggestions[e] = suggestions[e] || [];
                  details[e] = details[e] || {};
                });
                result.push({
                  name,
                  clazz,
                  config,
                  type,
                  color,
                  description,
                  details,
                  suggestions,
                });
              }
            }
          },
          [],
        ));
  }
}
