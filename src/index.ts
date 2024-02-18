import Minotaur from './scripts/Minotaur';
import style from './styles/index.scss';

document.addEventListener('DOMContentLoaded', (e) => {
	const minotaur = new Minotaur(
		document.getElementById('minotaur') as HTMLCanvasElement,
	);
	minotaur.initialize();
});
