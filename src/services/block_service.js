import axios from 'axios'
import _ from 'lodash'
import constants from '../constants/constants'
export default class BlockService {
  calculatePositions (blocks) {
    const initOffsetX = 100
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
        console.log(block)
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
        const name = key
        const config = value.config
        const type = value.type
        const color = constants.blockTypes[type].color
        result.push({
          config,
          type,
          name,
          color
        })
      }, [])
    })
  }
}
