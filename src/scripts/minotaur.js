define(['THREE','RNG'],function(THREE, RNG){
   var Minotaur = function(){
       this.scene = new THREE.Scene();
       this.rng = new RNG();
       this.player = new Player();
   };

    return new Minotaur();
});