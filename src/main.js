import THREE from 'three';
import datGUI from 'dat-gui';
import Minotaur from './scripts/Minotaur';

var canvas = document.getElementById('minotaur');


window.minotaur = new Minotaur(canvas);
