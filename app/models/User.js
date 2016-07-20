var mongoose     = require( 'mongoose' )
  , findOrCreate = require( 'mongoose-findorcreate' );

module.exports = function ()
{
	var schemaAddress = mongoose.Schema({
		city:{
			type: 'ObjectId' , ref: 'Cities'
		},
		district: 'String',
		number:   'String',
		street:   'String'
	});

	var schema = mongoose.Schema({
	 	login: { 
	 		type: 'String', 
	 		unique: true, 
	 		required: true 
	 	},
	 	name: {
	 		type: 'String', 
	 		unique: true,
	 		required: true
	 	},
	 	email: {
	 		type: 'String',
	 		unique: true,
	 		required: true
	 	},
	 	phone: 'String',
	 	url:   'String',
	 	provider: 'String',
	 	active: 'Boolean',
	 	address: schemaAddress,
	 	inclusao: {
	 		type: Date,
	 		default: Date.now
	 	}
	});

	schema.plugin( findOrCreate );

	return mongoose.model( 'User', schema );
}