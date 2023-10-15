import React, { Component } from 'react';

import style from './Field.scss';

export default class Field {
	render({ label, children }) {
		return (
			<div className={style.field}>
				<label>{label}</label>
				{children}
			</div>
		);
	}
	handleFocused() {}
}
