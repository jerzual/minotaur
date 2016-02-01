import Options from '../../src/scripts/model/Options';

describe('Options', function () {

    let options;

    beforeEach(()=>{
        options = new Options();
    });

    it('should return Do Something when calling doSomething', ()=>{
        expect(options.doSomething()).toEqual('Do Something');
    });
});