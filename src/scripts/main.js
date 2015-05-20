require.config({
    baseUrl:'/scripts',
    paths:{
        three:'vendor/THREE',
        datGUI:'vendor/dat.gui'
    },
    shim:{
        three:{exports:'THREE'},
        datGUI:{exports:'dat'},
        rng:{exports:'RNG'}
    }
});

define(['minotaur'],function(Minotaur){
    window.minotaur = new Minotaur();
});