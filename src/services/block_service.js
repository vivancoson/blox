import axios from 'axios'
import _ from 'lodash'
import constants from '../constants/constants'
export default class BlockService {
  calculatePositions (blocks) {
    const initOffsetY = 100
    let startOffsetX = 100
    let startOffsetY = 100
    const width = 180
    const height = 180

    const blocksByType = _.groupBy(blocks, (b) => {
      return b.type
    })
    _.forEach(blocksByType, (blocks) => {
      blocks.forEach(block => {
        block.setPosition(startOffsetX, startOffsetY)
        startOffsetY += height
      })
      startOffsetX += width
      startOffsetY = initOffsetY
    })
  }

  getDefinitions () {
    return axios.get('static/bloc-definitions.json').then(res => {
      return res.data
    }).then(data => {
      return _.transform(data, (result, value, key) => {
        for (let bloc in value) {
          const name = bloc
          const clazz = value[bloc].class
          const config = value[bloc].config
          const type = key
          const color = constants.blockTypes[type].color
          result.push({
            name,
            clazz,
            config,
            type,
            color
          })
        }
      }, [])
    })
  }
}
