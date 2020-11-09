import Item from '../model/Item';

export default class ItemBuilder {
  public item: Item;

  constructor() {
    this.item = new Item();
  }
  fromTreasurePool() {}
  randomConsumable() {}
  build(): Item {
    return this.item;
  }
}
