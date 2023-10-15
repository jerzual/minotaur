import Room from '../model/Room';

import { ROOM_MIN_SIZE, ROOM_MAX_SIZE } from '../Constants';

class RoomBuilder {
	public rng: any;
	public room: any;

	constructor(options: { index?: number; rng: { random: () => number } }) {
		this.rng = options.rng;
		this.room = new Room({
			top: 0,
			left: 0,
		});
		this.room.index = options.index;
	}
	generateRandomSize() {
		this.room.width = this.rng.random(ROOM_MIN_SIZE, ROOM_MAX_SIZE);
		this.room.height = this.rng.random(ROOM_MIN_SIZE, ROOM_MAX_SIZE);
	}
	build() {
		this.generateRandomSize();
		return this.room;
	}
}

export default RoomBuilder;
