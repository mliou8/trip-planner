var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripplanner');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));
var Schema = mongoose.Schema;

var placeSchema = new Schema ({
	address: String,
	city: String,
	state: String,
	phone: String,
	location: [Number],
});

var hotelSchema = new Schema ({
	name: String,
	place: {
	 	type: [placeSchema],
	 	get: function (place) {
	 		return place[0];
	 	}
	},
	num_stars: {
		type: Number, min: 1, max: 5
	},
	amenities: {
		type: [String],
		get: function (amenities) {
			return amenities.join(', ');
		}
	}
})

var activitySchema = new Schema ({
	name: String,
	place: {
	 	type: [placeSchema],
	 	get: function (place) {
	 		return place[0];
	 	}
	},
	age_range: String,
})

var restaurantSchema = new Schema ({
	name: String,
	place: {
	 	type: [placeSchema],
	 	get: function (place) {
	 		return place[0];
	 	}
	},
	cuisines: {
		type: [String],
		get: function (amenities) {
			return amenities.join(', ');
		}
	},
	price: Number
})

var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var Activity = mongoose.model('Activity', activitySchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
	Place: Place,
	Hotel: Hotel,
	Activity: Activity,
	Restaurant: Restaurant
}
