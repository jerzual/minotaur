import Entity from './Enntity';

export default class Item extends Entity{

    constructor(props){
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
