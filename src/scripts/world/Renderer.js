import {DUNGEON_HEIGHT,DUNGEON_WIDTH,GRID_WIDTH,TILE_SIZE} from '../Constants';
//Canvas Renderer
class Renderer {
    constructor(options) {
        this.level = options.dungeon;
        this.colors = {
            //http://paletton.com/#uid=7000u0kllllaFw0g0qFqFg0w0aF
            red: 'rgb(170,57,57)',
            green: 'rgb(122,159,53)',
            blue: 'rgb(34,102,102)',
            orange: 'rgb(170,108,57)',
            purple: 'rgb(136,45,96)',
            //background
            EMPTY_TILE: 'rgb(138,138,138)',
            WALL_TILE: 'rgb(53,53,53)',
            BACKGROUND: 'rgb(25,25,25)',
            grid: 'rgb(0,0,0)',
            chest: 'rgb()',
            blood: 'rgb(128,21,21)',
            trap: 'rgb(255,0,0)',
            player: 'rgb(255,255,255)',
            tile: 'rgb(128,128,128)',
            empty: 'rgb(0,0,0)'
        }
        this.canvas = options.canvas;
        this.context = this.canvas.getContext('2d');
        this.gridEnabled = false;
        this.resizeHandler();
    }
    resizeHandler() {
        this.canvas.width = this.level.width * this.getTileSize();
        this.canvas.height = this.level.height * this.getTileSize();
    }
    getTileSize(){
        return TILE_SIZE + (this.gridEnabled ? GRID_WIDTH : 0);
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    draw() {
        var context = this.context;
        //clean frame
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        //draw dungeon level
        this.level.tiles.forEach(
            (line) => {
                line.forEach(
                    (tile) => {
                        this.drawTile(tile)
                    }
                )
            });
        if(this.gridEnabled){
            this.drawGrid();
        }
    }
    drawCircle(x, y, color) {
        var context = this.context;
        context.beginPath();
        context.fillStyle = color;
        context.beginPath();
        context.arc(
            x * this.getTileSize(),
            y * this.getTileSize(),
            TILE_SIZE,
            0, 2 * Math.PI);

        context.fill();
    }
    drawRectangle(x, y, color) {
        var context = this.context;
        context.beginPath();
        context.fillStyle = color;
        context.fillRect(
            x * this.getTileSize(),
            y * this.getTileSize(),
            TILE_SIZE,
            TILE_SIZE
        );
    }
    /**
     * prepare a tile for drawing
     */
    drawTile(tile) {
        let color = this.colors.BACKGROUND;
        if (!tile.isBlock) {
            color = this.colors.EMPTY_TILE;
        }
        if (tile.isWall) {
            color = this.colors.WALL_TILE;
        }
        if (tile.isDoor) {
            color = this.colors.orange;
        }

        this.drawRectangle(tile.x, tile.y, color);
    }
    drawGrid() {
        var context = this.context;
        context.strokeStyle = this.colors.grid;
        context.lineWidth = GRID_WIDTH;

        context.beginPath();
        context.strokeStyle = this.colors.grid;
        for (let i = 1; i <= this.level.width; i++) {
            //draw vertical lines at x positions
            let realX = i * this.getTileSize();
            //console.log(`realX : ${realX}`);
            context.moveTo( realX, 0);
            context.lineTo( realX, this.level.height * this.getTileSize());

        }
        for (let j = 1; j <= this.level.height; j++) {
            //draw horizontal lines.
            let realY = j * this.getTileSize();
            //console.log(`realY : ${realY}`);
            context.moveTo(0, realY);
            context.lineTo( (this.level.width) * this.getTileSize(), realY);
        }
        context.stroke();
    }
    drawChest(chest) {
        this.drawTile({
            x: chest.x,
            y: chest.y,
            c: this.colors.chest
        });
    }
    drawPlayer(player) {
        this.drawCircle({
            x: player.x,
            y: player.y,
            c: this.colors.yellow
        });
    }
}

export default Renderer;