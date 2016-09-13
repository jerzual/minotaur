import {ROOM_ATTEMPTS,ROOM_NUMBER, GAP_BETWEEN_ROOMS} from '../Constants';
import Level from '../model/Level';
import Door from '../model/tiles/Door';
import RoomBuilder from './RoomBuilder';
import EasyStar from 'easystarjs';

class LevelBuilder {
    constructor(seed) {
        this.seed = seed;
        this.rng = seed.rng;
        this.easystar = new EasyStar.js();
        this.level = new Level({seedString:seed.string});
        this.difficulty = 1;
    }
    withSize(width,height){
        this.level.initialize(width, height);
    }
    withDifficulty(index){
        this.difficulty = index;
    }
    createRooms(max = 6) {
        //todo max room number should depend on level.
        for (let n = 0; n < this.rng.random(ROOM_NUMBER, ROOM_NUMBER + max); n++) {
            //new room with random size.
            let room = new RoomBuilder({
                rng: this.rng,
                index: n
            }).build();
            //to avoid infinite locking whith random position, limit the number of attemps.
            for (let a = 0; a < ROOM_ATTEMPTS; a++) {
                //set room to a random position
                room.left = Math.floor(
                    this.rng.random(1, this.level.width - room.width - 1)
                );
                room.top = Math.floor(
                    this.rng.random(1, this.level.height - room.height - 1)
                );
                //console.log(`attempt #${a + 1}  trying to place room at ${room.left},${room.top}`);
                //if it doesn't colide
                if (this.canBePlaced(room)) {

                    this.placeRoomInDungeon(room);
                    this.digWalls(room);
                    this.placeDoors(this.rng, room);
                    room.isPositioned = true;
                    this.level.rooms.push(room);
                    break;
                }
            }
        }
    }

    placeRoomInDungeon(room) {

        for (let x = 0; x < room.width; x++) {
            for (let y = 0; y < room.height; y++) {
                let tile = this.level.getTileAt(room.left + x, room.top + y);
                tile.isPlaced = true;
                tile.isBlock = false;
            }
        }

    }
    canBePlaced(room) {
        console.log('checking if room can be placed in dungeon');
        let result = true;
        for (let x = -GAP_BETWEEN_ROOMS; x < room.width + GAP_BETWEEN_ROOMS; x++) {
            for (let y = -GAP_BETWEEN_ROOMS; y < room.height + GAP_BETWEEN_ROOMS; y++) {
                let tileAt = this.level.getTileAt(room.left + x, room.top + y);
                if (tileAt && tileAt.isPlaced) {
                    result &= false;
                }
            }
        }
        return result;
    }
    digWalls(room) {
        for (let x = 0; x < room.width; x++) {
            for (let y = 0; y < room.height; y++) {
                if (x == 0 || x == room.width - 1 || y == 0 || y == room.height - 1) {
                    this.level.getTileAt(room.left + x, room.top + y).isWall = true;
                }
            }
        }
    }

    placeDoors(rng, room) {
        var amount = rng.random(1, 3.2);
        for (let n = 0; n < amount; n++) {
            //random position inside room
            let door = {
                x: room.left + Math.floor(rng.random() * (room.width - 2)) + 1,
                y: room.top + Math.floor(rng.random() * (room.height - 2)) + 1
            }
            if (n == 0) {
                door.x = room.left;
            }
            if (n == 1) {
                door.x = room.left + room.width - 1;
            }
            if (n == 2) {
                door.y = room.top + room.height - 1;
            }
            if (n == 3) {
                door.y = room.top;
            }
            let tile = this.level.getTileAt(door.x, door.y);
            tile = new Door(door);
            this.level.tiles[door.x][door.y] = tile;
            room.doors.push(tile);
        }
    }
    connectDoors() {

        let roomIndex = 0;
        this.level.rooms.forEach((room) => {
            room.doors.forEach((door) => {
                //mark starting door visited
                door.isConnected = true;
                let freeDoors = this.level.rooms
                    .map((eachRoom) => eachRoom.doors)
                    .reduce((a, b) => a.concat(b), [])
                    .filter((doorFiltered) => (!doorFiltered.isConnected));

                if (freeDoors.length) {
                    let nextDoor = freeDoors[0];
                    nextDoor.isConnected = true;
                    console.log(`path from ${door.x},${door.y} to ${nextDoor.x},${nextDoor.y}`);
                    try {
                        //Reset grid
                        this.easystar.setGrid(this.level.toDiggableGrid());
                        this.easystar.setAcceptableTiles([1]);
                        //connect doors
                        this.easystar.findPath(
                            door.x,
                            door.y,
                            nextDoor.x,
                            nextDoor.y,
                            (paths) => {
                                if (paths) {
                                    paths.forEach((path) => {
                                        let tile = this.level.getTileAt(path.x, path.y);
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

    build() {


        this.createRooms();
        this.connectDoors();
        this.level.index = this.difficulty;
        return this.level;
    }
}
export default LevelBuilder;
