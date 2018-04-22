import axios from 'axios'
import _ from 'lodash'

export default class BlocService {
  getDefinitions () {
    return axios.get('static/bloc-definitions.json').then(res => {
      return res.data
    }).then(data => {
      return _.transform(data, (result, value, key) => {
        const name = key
        const config = value.config
        const type = value.type
        result.push({
          config,
          type,
          name
        })
      }, [])
    })
  }
}
