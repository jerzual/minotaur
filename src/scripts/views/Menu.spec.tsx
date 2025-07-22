import { describe, it, expect, beforeEach } from 'vitest';

import React, { FunctionComponent } from 'react';
import Menu from './Menu';
import { render } from '@testing-library/react';

describe('views/Menu', () => {
	let scratch = null;

	beforeEach(() => {
		scratch = document.createElement('div');
	});

	it('renders', () => {
		const result = render(<Menu />);
		expect(result).toBeDefined();
	});
});
