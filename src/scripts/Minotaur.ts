import { SEED_LENGTH, DUNGEON_WIDTH, DUNGEON_HEIGHT } from './Constants';
import Seed from './model/Seed';
import DungeonBuilder from './world/DungeonBuilder';
import Renderer from './world/Renderer';
import Level from './model/Level';

//principal namespace
const SDG = {
	needsUpdate: true,
};
class Minotaur {
	public canvas: HTMLCanvasElement;
	public renderers: Renderer[];
	public seed: any;
	public input: any;
	public dungeon: any;
	public needsUpdate: any;

	constructor(canvas: HTMLCanvasElement) {
		//this.scene = new Scene();
		//this.player = new Player();
		this.canvas = canvas;
		this.initialize();
		this.renderers = [];
	}

	//launch dungeon generation
	generate() {
		this.seed = new Seed({
			string: this.input.value,
		});
		this.dungeon = new DungeonBuilder(this.seed).build();
		const container = document.createElement('div');
		container.id = this.seed;
		container.classList.add('map-container');
		this.renderers = this.dungeon.levels.map((level: Level) => {
			let canvas = document.createElement('canvas');
			canvas.id = `dungeon-${this.seed.string}-level-${level.index}`;
			canvas.width = level.width;
			canvas.height = level.height;
			container.appendChild(canvas);

			let renderer = new Renderer({
				dungeon: level,
				canvas: canvas,
			});
			return renderer;
		});
		document.body.appendChild(container);
		this.needsUpdate = true;
	}

	//reload seed
	reload() {
		console.log('reload');
		this.seed = new Seed().string;
		this.input.value = this.seed;
	}

	submit(event: Event) {
		console.log('submit');
		//don't reload page on form submit
		event.preventDefault();
		event.stopImmediatePropagation();
	}

	click(event: MouseEvent) {
		console.log(event);
		let point = {
			x: Math.floor(
				(event.clientX / (event.target as HTMLCanvasElement).width) *
					DUNGEON_WIDTH,
			),
			y: Math.floor(
				(event.offsetY / (event.target as HTMLCanvasElement).height) *
					DUNGEON_HEIGHT,
			),
		};
		console.log(point);
	}

	//animation ?
	animate() {
		if (this.renderers) {
			this.renderers.forEach((renderer) => {
				renderer.clearCanvas();
				renderer.draw();
			});
		}
		requestAnimationFrame(() => {
			this.animate();
		});
	}

	initialize() {
		this.input = document.getElementById('seed');
		this.input.maxLength = SEED_LENGTH;
		//prefill seed form
		this.input.value = new Seed().string;

		document.getElementById('seed-input').addEventListener('submit', (e) => {
			this.submit(e);
		});
		document.getElementById('reload').addEventListener('click', (e) => {
			this.reload();
		});
		//convert clicks on canvas to position indexes.
		document.getElementById('canvasView').addEventListener('click', (e) => {
			this.click(e);
		});
		//window.addEventListener('resize', this.renderer.resizeHandler );
		document.getElementById('generate').addEventListener('click', (e) => {
			this.generate();
		});

		this.animate();
	}
}

export default Minotaur;
