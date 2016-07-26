module.exports = function () {
	
	var MyMail = {}
	  , nodemailer  = require( 'nodemailer' )
	  , config      = require( 'node-ini' )
	  , user        = ''
	  , pass        = ''
	  , service     = ''
	  , from        = ''
	  , to          = ''
	  , subject     = ''
	  , html        = ''
	  , attachments = []
	  , from        = '';

    config.parse( './config/mail.ini' , function ( error , mail ) {
        service = mail.service;
        from    = mail.from;
        user    = mail.user;
        pass    = mail.pass;
    });    
    
    var mymail = nodemailer.createTransport({
        service: service,
        auth: { user: user, pass: pass }
    });

	MyMail.addAttachment = function( _attachment ) {

	    if( _attachment.path && _attachment.filename ) {  
	        attachments[] = _attachment;
	    } else {
	        throw "it is necessary attributes: 'path' and 'filename' ";
	    }
	};

	MyMail.setSubject = function( _subject ){
	    subject = _subject;
	};

	MyMail.setTo = function( name , email ){
	    if( name && email )
	    {
	        to = name + '<' + email + '>'; 
	    }
	};

	MyMail.setHtml = function( content ){
	    html = content;
	};

	MyMail.send = function(){
	    
	    mymail.sendMail({
	        from:    from, 
	        to:      to,   
	        subject: subject,
	        html:    html,
	        attachments: attachments 
	    }, function(err) {
	        if(err) {
	            throw err;
	        }
	        return true;
	    });
	};

	return MyMail;
}