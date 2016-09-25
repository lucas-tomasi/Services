(function (root, factory) {

    "use strict";

     // CommonJS module is defined
     if (typeof module !== 'undefined' && module.exports) {
         module.exports = factory(require('jquery'), require('bootstrap'));
     }
     // AMD module is defined
     else if (typeof define === "function" && define.amd) {
         define("bootstrap dialog", ["jquery", "bootstrap"], function ($) {
             return factory($);
         });
     } else {
         // planted over the root!
         root.MySession = factory(root.jQuery);
     }


    root.MySession = factory();
}
(this, function ($) 
{
    var MySession = {};
    var args = [];
    MySession.set = function( name , value )
    {
        args.push( name );
        localStorage.setItem( name , JSON.stringify( value ) );
    };


    MySession.get = function ( name ) 
    {
        return JSON.parse( localStorage.getItem( name ) );  
    };

    MySession.remove = function ( name ) 
    {
        args = args.filter( function ( value ) {
           return name != value;  
        });
        localStorage.removeItem( name );
    };

    MySession.clear = function () 
    {
        localStorage.clear();
    };

    return MySession;

}));