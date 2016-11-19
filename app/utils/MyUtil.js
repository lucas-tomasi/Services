mongoose = require('mongoose');

exports.convertToObjectId = function( ids ){
		if( !ids ) return [];
		return ids.map( function( id ){ return new mongoose.Types.ObjectId(id); });
};

exports.getStatesReservations = function() {

	return {
		A: { color: "#eb9316", name: "STATE_A" },
		E: { color: "#5bc0de", name: "STATE_E" },
		C: { color: "#c12e2a", name: "STATE_C" },
		X: { color: "#5cb85c", name: "STATE_X" },
		Z: { color: "#ddd"   , name: "STATE_Z" }
	};
};
