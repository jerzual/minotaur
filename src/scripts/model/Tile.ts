import Player from './Player';

/**
 * a Tile is the atomic unit of the map. Every thing on the map should be on a tile.
 */
export default class Tile {
  public x: number;
  public y: number;
  /** color */
  public c?: string;
  public isBlock?: boolean;
  public isPlaced?: boolean;

  public isWall?: boolean;

  public isDoor?: boolean;

  constructor(options: Partial<Tile>) {
    this.x = options.x;
    this.y = options.y;
    this.isBlock = true;
    this.isPlaced = options.isPlaced || false;
  }
  toString() {
    return `(${this.x},${this.y})`;
  }
  collide(player: Player) {}
}
