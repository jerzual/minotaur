define([],function(){
 var MonsterState = {SLEEPING:1, HUNTING:2, IDLING:3,WALKING:4};
   var Monster = {
       position:{x:0, y:0},
       state:MonsterState.IDLING,
       direction:{x:0,y:1},
       currentLife:100
   };
    Monster.prototype.constructor = function(options){
        this.position.x = options.position.x;
        this.position.y = options.position.y;

    };

    Monster.prototype.sniff = function(map){

    };
    return Monster;
});