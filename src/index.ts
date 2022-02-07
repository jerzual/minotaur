import Minotaur from './scripts/Minotaur';
import style from './styles/index.scss';

if(process.env.NODE_ENV === 'production') {
 	require('./scripts/utils/pwa');
}
document.addEventListener('DOMContentLoaded', (e) => {
    const minotaur = new Minotaur(document.getElementById('minotaur') as HTMLCanvasElement);
    minotaur.initialize();
});