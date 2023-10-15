import * as types from '../constants/ActionTypes';

export function moveForward() {
	return {
		type: types.MOVE_FORWARD,
	};
}

export function moveBackward() {
	return {
		type: types.MOVE_BACKWARD,
	};
}

export function rotateLeft() {
	return {
		type: types.ROTATE_LEFT,
	};
}

export function rotateRight() {
	return {
		type: types.ROTATE_RIGHT,
	};
}
