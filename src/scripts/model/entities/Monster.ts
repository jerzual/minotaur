const MonsterState = {SLEEPING: 1, HUNTING: 2, IDLING: 3, WALKING: 4};


export default class Monster{
	public position: any;

    defaults(){
        return {
            position: {
                x: 0,
                y: 0
            },
            state: MonsterState.IDLING,
            direction: {
                x: 0,
                y: 1
            },
            currentLife: 100
        }
    }
    constructor (options) {
        this.position.x = options.position.x;
        this.position.y = options.position.y;

    }
}

