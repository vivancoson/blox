/* Generate a random ID */

import uuid from 'uuid/v4';

export default class UuidService {
  uuid() {
    return uuid();
  }
}
