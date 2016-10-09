mongoose = require('mongoose');

exports.convertToObjectId = function( ids ){
		if( !ids ) return [];
		return ids.map( function( id ){ return new mongoose.Types.ObjectId(id); });
};

exports.getStatesReservations = function() {

	return {
		A: { color: "#eb9316", name: "Waiting Accept" },
		E: { color: "#5bc0de", name: "Waiting Realization" },
		C: { color: "#c12e2a", name: "Rejected" },
		X: { color: "#5cb85c", name: "Completed" },
		Z: { color: "#ddd"   , name: "Unrealized" }
	};
};