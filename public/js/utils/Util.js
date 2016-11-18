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
         root.Util = factory(root.jQuery);
     }


    root.Util = factory();
}
(this, function ($)
{
	var Util = {};

    Util.getStates = function() {
        return [
            {  id: '0' , text: MyTranslate.get('INACTIVE') },
            {  id: '1' , text: MyTranslate.get('ACTIVE') }
        ];
    };

	Util.getProviders = function() {
        return [
            { id: 'facebook' , text: 'Facebook' },
            { id: 'github'   , text: 'Github'   },
            { id: 'google'   , text: 'Google'   },
            { id: 'services' , text: 'Services' }
        ];
    };

    Util.hoursBetween = function( data1, data2 ) {
        var hours=1000*60;
        var date1_ms = data1.getTime();
        var date2_ms = data2.getTime();
        var difference_ms = date2_ms - date1_ms;

        return Math.round(difference_ms/hours);
    };

    Util.scapeToHtml = function( param ) {
        return param.replace( /\r\n|\r|\n/g , "<br>" );
    };

    Util.formatDateToBR = function( date ) {
        return moment( date ).add( 2, 'hours' ).format('DD/MM/YYYY HH:mm');
    };

    Util.getStatusReserve = function( state ) {
        if( state == 'A' ){
            return MyTranslate.get( 'STATE_A' );
        } else if( state == 'E' ) {
            return MyTranslate.get( 'STATE_E' );
        } else if( state == 'C' ) {
            return MyTranslate.get( 'STATE_C' );
        } else if( state == 'X' ) {
            return MyTranslate.get( 'STATE_X' );
        } else if( state == 'Z' ) {
            return MyTranslate.get( 'STATE_Z' );
        }
    };

    Util.getIconReserve = function( state ) {
        if( state == 'A' ) {
            return "fa fa-clock-o";
        } else if( state == 'E' ) {
            return "fa fa-cogs";
        } else if( state == 'C' ) {
            return "fa fa-remove";
        } else if( state == 'X' ) {
            return "fa fa-check";
        } else if( state == 'Z' ) {
            return "fa fa-ban";
        }
    };

    Util.getClassReserve = function( state ){
        if( state == 'A' ) {
            return "alert alert-warning";
        } else if( state == 'E' ) {
            return "alert alert-info";
        } else if( state == 'C' ) {
            return "alert alert-danger";
        } else if( state == 'X' ) {
            return "alert alert-success";
        } else if( state == 'Z' ) {
            return "alert alert-ban";
        }
    };

    Util.generateTable = function( _id, _title ) {

        if( jQuery('#' + _id ).attr( 'type_table' ) == 'my_data_tables' ){
            jQuery('#' + _id ).DataTable().destroy();
        }

        jQuery(document).ready(function(){
            jQuery.fn.dataTable.moment( 'DD/MM/YYYY HH:mm' );
            jQuery('#'+ _id +' tfoot th').each( function () {
                var title = jQuery(this).text();
                jQuery(this).html( '<input type="text" style="width:100%;" class="form-control" placeholder="'+title+'" />' );
            });

            var table = jQuery('#' + _id ).DataTable({
                columnDefs: [],
                processing: true,
                dom: 'Bfrtip',
                caption: { p : 'dasd' },
                buttons: [
                    {
                        extend: 'pdf',
                        text: '<i class="fa fa-file-pdf-o"></i>&nbsp;PDF',
                        title: _title,
                        className: 'btn btn-default'
                    },
                    {
                        extend: 'excel',
                        text: '<i class="fa fa-file-excel-o"></i>&nbsp;Excel',
                        title: _title,
                        className: 'btn btn-default'
                    },
                    {
                        extend: 'print',
                        text: '<i class="fa fa-print"></i>&nbsp;Print',
                        title: _title,
                        className: 'btn btn-default'
                    }
                ]
            });

            table.columns().every( function () {
                var that = this;
                jQuery( 'input', this.footer() ).on( 'keyup change', function () {
                    if ( that.search() !== this.value ) {
                        that.search( this.value ).draw();
                    }
                } );
            } );

            jQuery(".dataTables_filter").remove();
            jQuery("div.dt-buttons").append('<span class="btn" style="float:right;font-size:18px;"><b>'+_title+'</b></span>');
            jQuery('#' + _id ).attr( 'type_table' , 'my_data_tables' );
        });
    };

    return Util;
}));
