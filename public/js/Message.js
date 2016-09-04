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
    
    Message.confirm = function ( message , callback ) {
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

    return Message;

 }));