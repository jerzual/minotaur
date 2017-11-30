import { h, render } from 'preact'; /* @jsx h */
import Menu from '../Menu';

describe('views/Menu', () => {
    let scratch = null;
    
    beforeEach(() => {
        scratch = document.createElement('div');
    });

    test('renders', () => {
        render(<Menu/>);
    });

});