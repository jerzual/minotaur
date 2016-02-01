/**
 * Tests the Seed model.
 *
 *
 */
import Seed from '../../src/scripts/model/Seed.js';

describe('Seed Object', function () {

    let seed;

    beforeEach(()=>{
        seed = new Seed();
    });

    it('should return Do Something when calling doSomething', ()=>{
        expect(seed.doSomething()).toEqual('Do Something');
    });
});

describe('Seed generate function',()=>{

});