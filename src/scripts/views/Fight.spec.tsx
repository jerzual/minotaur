/* global jest, describe, it */
import Fight from './Fight';

describe('views/Fight', () => {
    let fightView: Fight;
    beforeEach(() => {
        fightView = new Fight({});
    })
    it('shows the game state', () => { 
        expect(fightView).toBeDefined();
    });
});