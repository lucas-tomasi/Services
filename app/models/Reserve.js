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
	 		default: 'A' // A - aguardando aprovação, E - aguardanco execução, C - cancelada, X - Concluida, Z - Não efetuada 
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
	 	start: {
	 		type: Date,
	 		required: [ true, 'Enter a start date' ] 
	 	},
	 	end: {
	 		type: Date
	 	},
		details: {
			type: 'String',
			required: [ true , 'Enter a detail to service' ]
		},
	 	response: 'String'
	});
	
	return mongoose.model( 'Reserve', schema );
}