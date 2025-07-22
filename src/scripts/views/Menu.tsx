import React, { Component } from 'react';

import style from './Menu.scss';

export default class MenuView extends Component {
	render() {
		return (
			<div style={style.menu}>
				<nav>
					<a href="/">Home</a>
					<a href="/game">Play</a>
				</nav>
			</div>
		);
	}
}
