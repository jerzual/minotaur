import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import style from './Menu.scss';

export default class MenuView extends Component {
	render() {
		return (
			<div style={style.menu}>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/profile">Me</Link>
					<Link to="/profile/john">John</Link>
				</nav>
			</div>
		);
	}
}
