'use strict';
var rng = require('rng-js');

/**
 * Generates a Math.random() human-readablebased Seed.
 * @param length number of characters
 */
module.exports = function seed(length){
    const CHARSET = 'ABCDEFGHIJKLMNOOPQRSTUVWXYZ0123456789';
    return {
        randomSeed:()=>{
            let randomString = '';
            for(let i =0; i< length ? length : 7 ;i++){
             randomString += CHARSET[Math.floor(Math.random() * CHARSET.length)];
            }
            return randomString;
        }
    };
};