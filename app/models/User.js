var mongoose     = require( 'mongoose' )
  , findOrCreate = require( 'mongoose-findorcreate' );

module.exports = function ()
{
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
	 	url: {
	 		type: 'String'
	 	},
	 	provider: {
	 		type: 'String'
	 	},
	 	inclusao: {
	 		type: Date,
	 		default: Date.now
	 	}
	});

	schema.plugin( findOrCreate );

	return mongoose.model( 'User', schema );
}