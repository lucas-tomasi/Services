var mongoose 		= require('mongoose')
  , uniqueValidator = require('mongoose-unique-validator');

require('mongoose-double')(mongoose);

module.exports = function ()
{
	var schema = mongoose.Schema({
	 	status: {
	 		type: 'String', 
	 		index: true,
	 		required: [ true, 'Status is required' ],
	 		default: 'A' 
	 	},
	 	ref_service: {
	 		type: 'ObjectId',
	 		ref: 'Service',
	 		required: [ true, 'Service is required' ]
	 	},
	 	ref_user: {
	 		type: 'ObjectId',
	 		ref: 'User',
	 		required: [ true, 'User is required' ]
	 	},
	 	price: {
	 		type: mongoose.Schema.Types.Double,
	 		required: [ true, 'Price is required' ],
	 		default: 0.00  
	 	},
	 	dt_start: {
	 		type: Date,
	 		required: [ true, 'Enter a start date' ] 
	 	},
	 	dt_end: {
	 		type: Date
	 	},
	 	message: {
	 		type: 'String',
	 		required: [ true, 'Enter a message for professional' ]
	 	},
		details: {
			type: 'String',
			required: [ true , 'Enter a detail to service' ]
		},
	 	response: 'String'
	});
	
	return mongoose.model( 'Reserve', schema );
}