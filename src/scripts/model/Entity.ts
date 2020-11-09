/**
 * a superclass of all drawable things.
 */
export default class Entity{
	public components: any;
	public inventory: any;
	public sprites: any;
	public bodies: any;

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
