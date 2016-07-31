var mongoose     = require( 'mongoose' )
  , findOrCreate = require( 'mongoose-findorcreate' );

module.exports = function ( app )
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
	 		required: [ true , 'Login is required' ]
	 	},
	 	name: {
	 		type: 'String', 
	 		required: true
	 	},
	 	email: {
	 		type: 'String',
	 		required: [ true , 'Email is required' ]
	 	},
	 	phone: 'String',
	 	url:   'String',
	 	provider: 'String',
	 	active: 'Boolean',
	 	professional: {
	 		type: 'Boolean',
	 		default: false 
	 	},
	 	password: 'String',
	 	address: schemaAddress,
	 	inclusao: {
	 		type: Date,
	 		default: Date.now
	 	}
	});

	schema.plugin( findOrCreate );

	return mongoose.model( 'User', schema );
}