var THREE = require('three');
var datGUI = require('dat-gui');
var Minotaur = require('./minotaur');

var canvas = document.getElementById('minotaur');


window.minotaur = new Minotaur(canvas);
