/**
 * a superclass of all drawable things.
 */
export default class Entity{

    constructor(args){
        this.components = [];
        this.inventory = [];
        this.sprites = [];
        this.bodies = [];
    }

    move(direction){
      if(direction.x){

      }
      if(direction.y){

      }
      if(direction.z){
        //level change
      }
    }
}
