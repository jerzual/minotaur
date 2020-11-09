import RNG from '../../utils/rng';
import Seed from '../Seed';

describe('model/Seed', () => {

    let seed;

    beforeEach(()=>{
        seed = new Seed();
    });

    describe('static functions', () => {
        it('randomString',() => {
            const randomStringOne = Seed.randomString();
            const randomStringTwo = Seed.randomString();
            expect(randomStringOne).not.toBe(randomStringTwo);
        });
        it('seededRandomString', () => { 
            const result = Seed.seededRandomString(Math);
            expect(result).toBeInstanceOf(Seed);
        });
        it('dailyString', () => {
            const result = Seed.dailyString();
            expect(result).toBeDefined();
        });
    });

});