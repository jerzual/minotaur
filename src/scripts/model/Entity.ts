/**
 * a superclass of all drawable things.
 */
export default class Entity {
  public components: any;
  public inventory: any;
  public sprites: any;
  public bodies: any;

  constructor(options?: Partial<Entity>) {
    Object.assign(this, options);
    this.components = [];
    this.inventory = [];
    this.sprites = [];
    this.bodies = [];
  }
}
