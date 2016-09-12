module.exports = function ( name ) {
	
	var MyPDF = require('../utils/MyHtmlPDF.js')( name )
	  , MyReport = {}
	  , html = '<body></body>';
	
	MyReport.setHorientation = function ( horientation ) {
			 
	};

	MyReport.setColumns = function( columns ) {

	};

	MyReport.setValues = function( columns ) {

	};

	MyReport.setHeaders = function( headers ) {
		 
	};

	MyReport.setAlignColumns = function( aligns ) {
		 
	};

	MyReport.setTitle = function( title , icon ) {
		
	};

	MyReport.generete = function() {
		MyPDF.setContent( $(html).val() );
		MyPDF.generetePDF();
	};

	return MyReport;
}