import Entity from './Entity';

export default class Item extends Entity{

    constructor(props){
        super(props);
        this.name = "default";
        this.weight = 1;
        this.equiped = false;
    }
   /* abstract */
    drop(){

    }
    pickup(){

    }
    use(){

    }
}
