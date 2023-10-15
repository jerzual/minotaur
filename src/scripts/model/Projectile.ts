export default class Projectile {
	public damage: any;
	public velocity: any;
	public speed: any;
	public friction: any;

	constructor() {
		this.damage = 2;
		this.velocity = 0.5;
		this.speed = 1;
		this.friction = 0;
	}

	move() {}

	collide() {}
}
