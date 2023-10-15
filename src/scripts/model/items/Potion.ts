import Item from '../Item';

/**
 * Potions have randomized effect.
 */
export default class Potion extends Item {
	public attributes: any;

	constructor() {
		super();
		this.attributes = {};
	}
}
