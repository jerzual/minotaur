import Entity from './Entity';

/**
 * Players control the three.js camera and available actions.
 * 
 */
export default class Player extends Entity{
	public position: any;
	public direction: any;

    constructor(options?: any){
        super(options);
        this.position = {};
        this.direction = {};
    }
    setPosition(x?: number,y?: number){
        this.position = {x,y};
    }
    move() {

    }
}
