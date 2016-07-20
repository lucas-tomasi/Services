var mongoose     = require( 'mongoose' )
  , findOrCreate = require( 'mongoose-findorcreate' );

module.exports = function ()
{
	var schema = mongoose.Schema({
	 	city: 'String',
	 	state:   'String',
	 	initials: 'String'
	});

	schema.plugin( findOrCreate );

	return mongoose.model( 'City', schema );
}