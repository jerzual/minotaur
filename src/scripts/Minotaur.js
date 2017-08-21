import { SEED_LENGTH, DUNGEON_WIDTH, DUNGEON_HEIGHT } from './Constants';
import { Scene } from 'three';
import Seed from './model/Seed';
import DungeonBuilder from './world/DungeonBuilder';
import Renderer from './world/Renderer';

//principal namespace
const SDG = {
    needsUpdate: true
}
class Minotaur {
    constructor(canvas) {
        //this.scene = new Scene();
        //this.player = new Player();
        this.canvas = canvas;
        this.initialize();
        this.renderers = [];
    }

    //launch dungeon generation
    generate(event) {

        this.seed = new Seed({
            string: this.input.value
        });
        this.dungeon = new DungeonBuilder(this.seed).build();
        this.renderers = this.dungeon.levels.map((level)=>{
            let canvas = document.createElement('canvas');
            canvas.id = `dungeon-${this.seed.string}-level-${level.index}`;
            canvas.width = level.width;
            canvas.height = level.height;
            document.body.appendChild(canvas);

            let renderer = new Renderer({
                dungeon: level,
                canvas: canvas
            });
            return renderer;
        });
        this.needsUpdate = true;

    }

    //reload seed
    reload(event) {
        console.log('reload');
        this.seed = new Seed().string;
        this.input.value = this.seed;

    }

    submit(event) {
        console.log('submit');
        //don't reload page on form submit
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    click() {
        console.log(event);
        let point = {
            x: Math.floor(event.clientX / event.target.width * DUNGEON_WIDTH),
            y: Math.floor(event.offsetY / event.target.height * DUNGEON_HEIGHT)
        };
        console.log(point);
    }

    //animation ?
    animate() {
        if(this.renderers){
        this.renderers.forEach(
            (renderer)=>
            {
                renderer.clearCanvas();
                renderer.draw();
            }
        );
        }
        requestAnimationFrame(()=>{this.animate();});
    }


    initialize(event) {

        this.input = document.getElementById('seed');
        this.input.maxLength = SEED_LENGTH;
        //prefill seed form
        this.input.value = new Seed().string;

        document.getElementById('seed-input').addEventListener('submit', (e)=>{ this.submit(e) });
        document.getElementById('reload').addEventListener('click', (e)=>{ this.reload(e)});
        //convert clicks on canvas to position indexes.
        document.getElementById('canvasView').addEventListener('click',(e)=>{ this.click(e) });
        //window.addEventListener('resize', this.renderer.resizeHandler );
        document.getElementById('generate').addEventListener('click',(e) =>{ this.generate(e) });

        this.animate();
    }
}

export default Minotaur;
