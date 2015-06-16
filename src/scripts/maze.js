var Monster = require('monster');

    var Edge = {NORTH: 0, EAST: 1, SOUTH: 2, WEST: 3};
    var Direction = {HORIZONTAL: 0, VERTICAL: 1};

    var Maze = function Maze() {
        /**
         * Default size.
         * @type {{width: number, height: number}}
         */
        this.size = {
            width: 64,
            height: 48
        };
        /**
         * Stores the location of the chest with their contents.
         * @type {Array}
         */
        this.chestMap = [];
        /**
         * Tiles map, each
         * @type {*[]}
         */
        this.tilesMap = [[]];
        /**
         * Only one monster. it's the minotaur !
         * @type {Monster}
         */
        this.monster = new Monster();
        /**
         * Amount of gold found in chest.
         * @type {number}
         */
        this.goldAmount = 0.3;
    };

    /**
     * Initialize the map with filled tiles.
     *
     * @param width of the map
     * @param height of the map
     * @param rng initialized Random number generator
     */
    Maze.prototype.initialize = function initialize(width, height, rng) {
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var tile = {edges: [Edge.NORTH, Edge.WEST]};
                this.tilesMap[x][y].push(tile);
            }
        }

        this.size = {width: width, height: height};
    };

    /**
     * Create a path between two rooms.
     */
    Maze.prototype.createPath = function createPath() {

    };

    /**
     * Removes the wall from a side of a tile and the other side of the wall on the adjacent tile.
     *
     * @param position
     * @param edge wich wall
     */
    Maze.prototype.removeWall = function (position, edge) {

    };

    Maze.prototype.digTowards = function (x, y, direction) {
        if (direction === Direction.HORIZONTAL) {
            this.removeWall({x: x, y: y}, Edge.NORTH);
        }
        else {

        }
        //this.tilesMap[x][y].edges
    };

    /**
     * Randomly place the Minotaur on the map.
     *
     * @param rng the initialized random number generator.
     */
    Maze.prototype.initializeMonster = function initializeMonster(rng) {
        var position = {
            x: rng.random(0, this.width - 1),
            y: rng.random(0, this.height - 1)
        };

        var monster = new Monster();
    };

    Maze.prototype.initializeChests = function initializeChests() {

    };

    Maze.prototype.setup3DScene = function setupScene(scene) {
        scene.add();
    };

module.exports = Maze;