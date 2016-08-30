var mongoose 		= require('mongoose')
  , uniqueValidator = require('mongoose-unique-validator');

require('mongoose-double')(mongoose);

module.exports = function ()
{
	var imageSchema = mongoose.Schema({
		name:  {
			type: 'String',
			require: [ true , 'Name to file is required' ]
		},
		type: {
			type: 'String',
			require: [ true , 'Type to file is required' ]
		},
		bas64: {
			type: 'String',
			require: [ true , 'bas64 to file is required' ]
		}
	});

	var commentSchema = mongoose.Schema({
		comment:  'String',
		username: 'String',
		stars: 'String',
		date: {
			type: Date,
			default: new Date()
		}
	});

	var schema = mongoose.Schema({
	 	
	 	title: { 
	 		type: 'String', 
	 		unique: true , 
	 		required: [ true, 'Name is required' ],
	 		minlength: [2,'Minimum 2 characters']
	 	},
	 	description: 'String',	 	
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
	 		type: Date,
	 		default: ''
	 	},
	 	images: [ imageSchema ],
	 	comments: [ commentSchema ]
	});

	schema.plugin(uniqueValidator, { message: 'Title: {VALUE} already exstis in categories' } );
	
	return mongoose.model( 'Service', schema );
}