import Entity from './Entity';


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
