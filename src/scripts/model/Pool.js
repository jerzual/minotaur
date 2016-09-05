/**
 * a pool is a random array of items or entities.
 * it is intialized with an array of object you can pick from
*/
export default class Pool{
  constructor(){
    this.items = opts.objects ? opts.objects : [];
    this.available = [];
  }
  pick(rng){
    return getObject(rng.random(1,this.items.length));
  }
}
