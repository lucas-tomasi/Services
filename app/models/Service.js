var mongoose 		= require('mongoose')
  , uniqueValidator = require('mongoose-unique-validator');

require('mongoose-double')(mongoose);

module.exports = function ()
{
	var imageSchema = mongoose.Schema({
		name:  'String',
		type:  'String',
		bas64: 'Buffer'
	});

	var schema = mongoose.Schema({
	 	
	 	title: { 
	 		type: 'String', 
	 		unique: true , 
	 		required: [ true, 'Name is required' ],
	 		minlength: [2,'Minimum 2 characters']
	 	},	 	
	 	active: {
	 		type: 'Boolean', 
	 		index: true 
	 	},
	 	ref_category: {
	 		type: 'ObjectId',
	 		ref: 'Category',
	 		required: [ true, 'Category is required' ]
	 	},
	 	price: {
	 		type: mongoose.Schema.Types.Double,
	 		required: [ true, 'Price is required' ],
	 		default: 0.00  
	 	},
	 	professional: {
	 		type: 'ObjectId',
	 		ref: 'User',
	 		required: [ true, 'Professional is required' ]
	 	},
	 	dt_start: {
	 		type: Date,
	 		required: [ true, 'Enter a start date' ] 
	 	},
	 	dt_end: {
	 		type: Date
	 	},
	 	images: [ imageSchema ],
	 	active: 'Boolean'

	});
	
	schema.plugin(uniqueValidator, { message: 'Title: {VALUE} already exstis in categories' } );
	
	return mongoose.model( 'Service', schema );
}