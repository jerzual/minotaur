import Entity from './Entity';

class Player extends Entity{
    constructor(...options){
        super(...options);
        this.x = options.x ? options.x : 0;
        this.y = options.y ? options.y : 0;
    }

    move(options) {

    }
}

export default Player;
