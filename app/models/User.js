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
	 		index: true 
	 	},
	 	inclusao: {
	 		type: Date,
	 		default: Date.now
	 	}
	});

	schema.plugin( findOrCreate );

	return mongoose.model( 'User', schema );
}