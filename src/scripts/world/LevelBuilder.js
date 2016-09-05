import Level from '../models/Level';
import RoomBuilder from './RoomBuilder';

class LevelBuilder {
    constructor(seed) {
        this.rng = seed.rng;
        this.easystar = new EasyStar.js();
    }

    build() {
        let dungeon = new Level();
        dungeon.initialize(DUNGEON_WIDTH, DUNGEON_HEIGHT);
        //this.initEmptyTiles(dungeon);
        this.createRooms(dungeon);
        this.initRooms(dungeon);
        this.connectDoors(dungeon);

        return dungeon;
    }

    createRooms(dungeon) {
        //todo max room number should depend on level.
        for (let n = 0; n < this.rng.random(ROOM_NUMBER, ROOM_NUMBER + 6); n++) {
            //new room with random size.
            let room = new RoomBuilder({
                rng: this.rng,
                index: n
            }).build();
            //to avoid infinite locking whith random position, limit the number of tentatives.
            for (let a = 0; a < ROOM_ATTEMPTS; a++) {
                //set room to a random position
                room.left = Math.floor(
                    this.rng.random(1, DUNGEON_WIDTH - room.width - 1)
                );
                room.top = Math.floor(
                    this.rng.random(1, DUNGEON_HEIGHT - room.height - 1)
                );
                console.log(`attempt #${a + 1}  trying to place room at ${room.left},${room.top}`);
                //if it doesn't colide
                if (room.canBePlaced(dungeon)) {

                    room.placeRoomInDungeon(dungeon);
                    room.isPositioned = true;
                    dungeon.rooms.push(room);
                    break;
                }
            }
        }
    }

    initRooms(dungeon) {
        dungeon.rooms.forEach((room) => {
            //console.log(room);
            room.digWalls(dungeon);
            room.placeDoors(this.rng, dungeon);
        });
    }

    connectDoors(dungeon) {

        let roomIndex = 0;
        dungeon.rooms.forEach((room) => {
            room.doors.forEach((door) => {
                //mark starting door visited
                door.isConnected = true;
                let freeDoors = dungeon.rooms
                    .map((eachRoom) => eachRoom.doors)
                    .reduce((a, b) => a.concat(b), [])
                    .filter((doorFiltered) => (!doorFiltered.isConnected));

                if (freeDoors.length) {
                    let nextDoor = freeDoors[0];
                    nextDoor.isConnected = true;
                    console.log(`path from ${door.x},${door.y} to ${nextDoor.x},${nextDoor.y}`);
                    try {
                        //Reset grid
                        this.easystar.setGrid(dungeon.toDiggableGrid());
                        this.easystar.setAcceptableTiles([1]);
                        //connect doors
                        this.easystar.findPath(
                            door.x,
                            door.y,
                            nextDoor.x,
                            nextDoor.y,
                            (paths) => {
                                console.log(paths);
                                if (paths) {
                                    paths.forEach((path) => {
                                        let tile = dungeon.getTileAt(path.x, path.y);
                                        tile.isBlock = false;
                                    });
                                }
                            });
                        this.easystar.calculate();
                    } catch (e) {
                        console.warn(e.message);
                    }
                }
            });
        })

    }
}
export default LevelBuilder;
