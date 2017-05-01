var mongoose = require('mongoose');
var credentials = require("../credentials.js");

var dbUrl = 'mongodb://' + credentials.host + ':' + credentials.mongoDbPort +'/' + credentials.mongoDbDatabase;
var connection = null;
var model = null;

var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var transportSchema = new Schema({
    trip: Number,
    name: String,
    info: String,
    travelDate: Date
});

var hotelSchema = new Schema({
    trip: Number,
    name: String,
    address: String,
    travelDate: Date
});

var otherSchema = new Schema({
    name: String,
    category: String,
    address: String,
    phone: String
})

module.exports = {
    getTransportModel: function getTransportModel(){
        if (connection == null){
            connection = mongoose.createConnection(dbUrl);
            model = connection.model('TransportModel', transportSchema);
        }
        return model;
    },

    getHotelModel: function getHotelModel(){
        if (connection == null){
            connection = mongoose.createConnection(dbUrl);
            model = connection.model('HotelModel', hotelSchema);
        }
        return model;
    },

    getOtherModel: function getOtherModel(){
        if (connection == null){
            connection = mongoose.createConnection(dbUrl);
            model = connection.model('OtherModel', otherSchema);
        }
        return model;
    }
};