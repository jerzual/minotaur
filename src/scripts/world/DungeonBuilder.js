import LevelBuilder from './LevelBuilder';

import Dungeon from '../model/Dungeon';
import Seed from '../model/Seed';

class DungeonBuilder {
    constructor({rng}) {
        this.dungeon = new Dungeon();
        this.rng = rng;
    }
}

export default DungeonBuilder;