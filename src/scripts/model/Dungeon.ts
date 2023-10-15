class Dungeon {
	public levels: any;
	public player: any;

	constructor(options?: Partial<Dungeon>) {
		Object.assign(this, options);
		this.levels = [];
		this.player = {};
	}
}
export default Dungeon;
