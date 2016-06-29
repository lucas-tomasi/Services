var mongoose = require('mongoose');

module.exports = function ()
{
	 var schema = mongoose.Schema({
	 	name: { type: 'String', unique: true, required: true },
	 	active: {type: 'Boolean', index: true }
	 });

	 return mongoose.model( 'Category', schema );
}