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
      swal("Alert!", message, "warning");
    };

    Message.error = function ( message ) 
    {
        swal("Error!", message , "error" );
    };

    Message.success = function ( message ) 
    {
        swal("Success!", message , "success");
    };    
    
    Message.confirm = function ( message , callback ) 
    {
        swal({   
            title: "Are you sure?",   
            text: message,   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#459c50",   
            confirmButtonText: "Yes, do it!",   
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
                swal.showInputError("Please, " + message + "!" );     
                return false;   
            }      
            swal("Success!", "", "success"); 
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
                $( '#mytextareaalert' ).after( '<div id="myerror" class="sa-error-container show"><div class="icon">!</div><p> Please, '+ message +'!</p></div>' );
                return false;   
            }
            eval( function_eval( text.val() ) );      
            swal("Success!", text.val() , "success"); 
        });
    };
    return Message;

 }));