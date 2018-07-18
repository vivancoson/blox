import Chance from 'chance';

export default class NameService {
  constructor() {
    this.chance = new Chance(new Date().getTime());
  }
  get name() {
    return this.chance.animal();
  }
}
