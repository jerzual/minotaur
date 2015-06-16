var THREE = require('three');
var RNG = require('rng');
var Player = require('./player');

var Minotaur = function(){
       this.scene = new THREE.Scene();
       this.rng = new RNG();
       this.player = new Player();
   };

module.exports = Minotaur;