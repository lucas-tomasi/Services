var mongoose 		= require('mongoose')
  , uniqueValidator = require('mongoose-unique-validator');

module.exports = function ()
{
	var schema = mongoose.Schema({
	 	name: { 
	 		type: 'String', 
	 		unique: true , 
	 		required: [ true, 'Name is required' ],
	 		minlength: [2,'Minimum 2 characters']
	 	},
	 	active: {
	 		type: 'Boolean', 
	 		index: true 
	 	}
	});
	 
	schema.plugin(uniqueValidator, { message: 'Name: {VALUE} already exstis in categories' } );

	return mongoose.model( 'Category', schema );
}