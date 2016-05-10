import THREE from 'three';
import RNG from 'rng-js';
import Player from './model/Player';


export default class Minotaur{
   constructor(canvas){
      this.scene = new THREE.Scene();
      this.rng = new RNG(''+Date.now());
      //this.player = new Player();
      this.canvas = canvas;
   }
};

document.addEventListener('DOMContentLoaded',function(){
   new Minotaur(document.getElementById('canvas'));
});