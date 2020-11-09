import RNG from '../utils/rng';

export const SEED_LENGTH = 8;
export const SEED_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

/**
 * Encapsulate a seed string and a RandomNumberGenerator
 */
export class Seed {
	public string: any;
	public rng: RNG;

    constructor(seed?: any) {
        this.string = seed ? seed.string : Seed.randomString();
        this.rng = new RNG(this.string);
    }

    /**
     * Generates a Math.random() human-readable based Seed.
     */
    static randomString() {
        var randomSeed = "";
        for (let i = 0; i < SEED_LENGTH; i++) {
            randomSeed += SEED_CHARS.charAt(Math.floor(Math.random() * SEED_CHARS.length));
        }
        return randomSeed;
    }

    static dailyString() {
        let today = new Date();
        let isoString = today.toISOString().replace(/-/, '').replace(/-/, '');
        let string = isoString.substring(0, 3) + isoString.substring(5, 6) + isoString.substring(7, 8);
        return new Seed({string});
    }

    static seededRandomString(rng: {random: () => number}) {
        var randomSeed = "";
        for (let i = 0; i < SEED_LENGTH; i++) {
            randomSeed += SEED_CHARS.charAt(Math.floor(rng.random() * SEED_CHARS.length));
        }

        return new Seed({string:randomSeed});
    }
}
export default Seed;
