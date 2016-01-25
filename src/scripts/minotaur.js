var THREE = require('three');
var RNG = require('rng-js');
var Player = require('./model/Player');


function Minotaur(canvas){
   this.scene = new THREE.Scene();
   this.rng = new RNG(''+Date.now());
   //this.player = new Player();
   this.canvas = canvas;
}

module.exports = Minotaur;