'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise (){
    this._state = 'pending'; 
    this._value = {}; 
    this._handlerGroups = [];

    this.then = function(resolve, reject){
        if(typeof resolve !== 'function' && typeof reject !== 'function'){
            this._handlerGroups.push({successCb: false, errorCb: false});
        } else if (typeof resolve !== 'function'){
            this._handlerGroups.push({successCb: false, errorCb: reject});
          } else if (typeof reject !== 'function'){
              this._handlerGroups.push({successCb: resolve, errorCb: false});
            } else {this._handlerGroups.push({successCb: resolve, errorCb: reject});
        }
        this.callHandlers(this._value);
    };
    
    return this; 
}

$Promise.prototype.callHandlers = function(value){
        if(this._state === "resolved"){
            this._handlerGroups[0].successCb(value);
            this._handlerGroups.shift();
        }
};
    
function Deferral (){
    this.$promise = new $Promise(); 
    this.resolve = function (data){
        if(this.$promise._state === 'pending'){
            this.$promise._state = 'resolved'; 
            this.$promise._value = data; 
        }
    }; 
    this.reject = function (reason){
        if(this.$promise._state === 'pending'){
            this.$promise._state = 'rejected'; 
            this.$promise._value = reason; 
        }
    }; 
    return this; 
}

var defer = function(){
    return new Deferral();
};






/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/
