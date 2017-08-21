import LevelBuilder from './LevelBuilder';

import Dungeon from '../model/Dungeon';
import Seed from '../model/Seed';
import Player from '../model/Player';

const MIN_DUNGEON_WIDTH =32;
const MIN_DUNGEON_HEIGHT=24;

class DungeonBuilder {
    constructor({rng}) {
        this.dungeon = new Dungeon();
        this.rng = rng;
    }
    generatePlayer(){
        let player = new Player();
        player.setPosition();
    }
    generateLevels(max=7){
        for(let i = 1; i<=max;i++){
            //generate new rng seed for each levels
            let builder = new LevelBuilder(Seed.seededRandomString(this.rng));
            builder.withDifficulty(i);
            builder.withSize(
                MIN_DUNGEON_WIDTH * Math.floor(this.rng.random(1,i)),
                MIN_DUNGEON_HEIGHT * Math.floor(this.rng.random(1,i))
            );
            this.dungeon.levels.push(builder.build());
        }
    }
    build(){
        this.generateLevels(3);
        this.generatePlayer();
        return this.dungeon;
    }
}

export default DungeonBuilder;