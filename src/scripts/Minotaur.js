import {SEED_LENGTH, DUNGEON_WIDTH, DUNGEON_HEIGHT} from './Constants';
import {Scene} from 'three';
import RNG from 'rng-js';
import Seed from './model/Seed';
import DungeonBuilder from './world/DungeonBuilder';
import LevelBuilder from './world/LevelBuilder';
import Renderer from './world/Renderer';

//principal namespace
const SDG = {
    needsUpdate: true
}
class Minotaur {
    constructor(canvas) {
        //this.scene = new Scene();
        this.rng = new RNG('' + Date.now());
        //this.player = new Player();
        this.canvas = canvas;
        this.initialize();
    }

    //launch dungeon generation
    generate(event) {

        this.seed = new Seed({
            string: this.input.value
        });
        this.dungeon = new LevelBuilder(this.seed).build();
        this.renderer = new Renderer({
            dungeon: this.dungeon,
            canvas: document.getElementById('minotaur')
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
        if(this.renderer){
            this.renderer.clearCanvas();
            this.renderer.draw();
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
