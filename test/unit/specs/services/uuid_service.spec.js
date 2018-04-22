import UuidService from '@/services/uuid_service'
import _ from 'lodash'

describe('UUID service tests', () => {
  const uuidService = new UuidService()
  it('should generate different values for every execution', () => {
    const uuids = _.range(10).map(i => uuidService.uuid())
    expect(_.uniq(uuids).length).toBe(10)
  })
})
