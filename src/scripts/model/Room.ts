import Door from './tiles/Door';
import Tile from './Tile';
import Entity from './Entity';

const GAP_BETWEEN_ROOMS = 2;

class Room {
	public top: number;
	public left: number;
	public width: number;
	public height: number;
	public isPositioned: boolean;
	public isCompleted: boolean;
	public tiles: Tile[];
	public doors: Door[];
	public entities: Entity[];

	constructor(options: Partial<Room>) {
		//position
		this.top = options.top;
		this.left = options.left;
		//dimension
		this.width = options.width;
		this.height = options.height;

		this.isPositioned = false;
		this.isCompleted = false;
		this.tiles = options.tiles || [];
		this.doors = options.doors || [];
		this.entities = options.entities || [];
	}
}
export default Room;
