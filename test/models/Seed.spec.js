/**
 * Tests the Seed model.
 *
 *
 */
import Seed from '../src/scripts/seed.js';

describe('ES6 Foo', function () {

    let foo;

    beforeEach(()=>{
        foo = new Foo();
    });

    it('should return Do Something when calling doSomething', ()=>{
        expect(foo.doSomething()).toEqual('Do Something');
    });
});

describe('Seed',()=>{

});