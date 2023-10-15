import Tile from '../Tile';

class Exit extends Tile {
	public isEntrance: boolean;

	constructor(options: Partial<Exit>) {
		super(options);
		this.isEntrance = true;
	}
}
