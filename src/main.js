import THREE from 'three';
import datGUI from 'dat-gui';
import Minotaur from './scripts/Minotaur';

document.addEventListener('DOMContentLoaded', (e) => {
    window.minotaur = new Minotaur(document.getElementById('minotaur'));
    window.minotaur.initialize(e);
});