import React, { FunctionComponent } from "react";
import Menu from './Menu';
import { renderToString } from "react-dom/server";

describe('views/Menu', () => {
    let scratch = null;
    
    beforeEach(() => {
        scratch = document.createElement('div');
    });

    test('renders', () => {
       const result = renderToString(<Menu />);
       expect(result).toBeDefined();
    });

});