
class Dungeon{
	public levels: any;
	public player: any;

    constructor(options?){
        Object.assign(this,options);
        this.levels = [];
        this.player = {};
    }
}
export default Dungeon;