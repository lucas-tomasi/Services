(function (root, factory) {

    "use strict";

    // CommonJS module is defined
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('jquery'), require('bootstrap'));
    }
    // AMD module is defined
    else if (typeof define === "function" && define.amd) {
        define("bootstrap-dialog", ["jquery", "bootstrap"], function ($) {
            return factory($);
        });
    } else {
        // planted over the root!
        root.Message = factory(root.jQuery);
    }

}
(this, function ($) 
{
    var Message = new Object();

    Message.alert = function ( message ) 
    {
      swal( MyTranslate.get( 'ALERT' ), message, "warning");
    };

    Message.error = function ( message ) 
    {
        swal( MyTranslate.get( 'ERROR' ) , message , "error" );
    };

    Message.success = function ( message ) 
    {
        swal( MyTranslate.get( 'SUCCESS' ) , message , "success");
    };    
    
    Message.confirm = function ( message , callback, param ) 
    {
        swal({   
            title: MyTranslate.get( 'SURE' ) ,   
            text: message,   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#459c50",   
            confirmButtonText: MyTranslate.get( 'YES_DO_IT' ),   
            closeOnConfirm: true 
        }, function( isConfirm ){   
            if( isConfirm ) {
                eval( callback( param ) );
            }
        });
    };

    Message.question = function ( message , callback, title, message_confirm ) 
    {
        var m = (message_confirm)? message_confirm : MyTranslate.get( 'YES_DO_IT' );
        var t = (title)? title : MyTranslate.get( 'SURE' );;
        swal({   
            title: t,   
            text: message,   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#459c50",   
            confirmButtonText: message_confirm,   
            closeOnConfirm: true 
            }, function(){   
                eval( callback() );
        });
    };

    Message.prompt = function ( message ) 
    {
        swal({   
            title: message,   
            type: "input",   
            showCancelButton: true,   
            closeOnConfirm: false,   
            animation: "slide-from-top",   
            inputPlaceholder: "..." 
        }, function(inputValue) {   
            if (inputValue === false) return false;      
            if (inputValue === "") {     
                swal.showInputError( MyTranslate.get( 'PLEASE' )  + ", " + message + "!" );     
                return false;   
            }      
            swal( MyTranslate.get( 'SUCCESS' ) , "", "success"); 
        });
    };

    Message.text = function ( message, function_eval ) 
    {
        swal({   
            title: message,   
            text: "<textarea id='mytextareaalert' col='10' rows='4'></textarea>",   
            showCancelButton: true,   
            closeOnConfirm: false,   
            animation: "slide-from-top",   
            inputPlaceholder: "..." ,
            html: true
        }, function() {
            var text = $('#mytextareaalert');

            if (text.val() === false) return false;      
            if (text.val() === "") {
                $( '#mytextareaalert' ).after( '<div id="myerror" class="sa-error-container show"><div class="icon">!</div><p>'+ MyTranslate.get( 'PLEASE' ) + ', '+ message +'!</p></div>' );
                return false;   
            }
            eval( function_eval( text.val() ) );      
            swal( MyTranslate.get( "SUCCESS" ), text.val() , "success"); 
        });
    };
    return Message;

 }));