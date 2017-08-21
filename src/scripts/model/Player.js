import Entity from './Entity';

/**
 * Players control the three.js camera and available actions.
 * 
 */
export default class Player extends Entity{
    constructor(options){
        super(options);
        this.position = {};
        this.direction = {};
    }
    setPosition(x,y){
        this.position = {x,y};
    }
    move(options) {

    }
}
