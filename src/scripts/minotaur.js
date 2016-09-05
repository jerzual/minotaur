import {SEED_LENGTH, DUNGEON_WIDTH, DUNGEON_HEIGHT} from './Constants';
import {Scene} from 'three';
import RNG from 'rng-js';
import Seed from './model/Seed';
import DungeonBuilder from './world/DungeonBuilder';
import Renderer from './world/Renderer';

//principal namespace
const SDG = {
    needsUpdate: true
}
export class Minotaur {
    constructor(canvas) {
        this.scene = new Scene();
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
        this.dungeon = new DungeonBuilder(this.seed).build();
        this.renderer = new Renderer({
            dungeon: this.dungeon,
            canvas: document.getElementById('canvasView')
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
        if (this.needsUpdate) {
            this.renderer.clearCanvas();
            this.renderer.draw();
        }
        requestAnimationFrame(this.animate);
    }


    initialize(event) {

        this.input = document.getElementById('seed');
        this.input.maxLength = SEED_LENGTH;
        //prefill seed form
        this.input.value = new Seed().string;

        document.getElementById('reload').addEventListener('click', this.reload);
        document.getElementById('seed-input').addEventListener('submit', this.submit);

        //convert clicks on canvas to position indexes.
        document.getElementById('canvasView').addEventListener('click', this.click);
        //window.addEventListener('resize', this.renderer.resizeHandler );
        document.getElementById('generate').addEventListener('click', this.generate);

        this.animate();
    }
}

document.addEventListener('DOMContentLoaded', (e) => {
    window.minotaur = new Minotaur(document.getElementById('canvas'));
    window.minotaur.initialize(e);
});
