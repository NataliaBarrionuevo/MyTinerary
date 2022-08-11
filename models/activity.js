const mongoose = require('mongoose');

const activitiesSchema = new mongoose.Schema({
    
    title:{type:String, required:true},
    image:{type:String, required:true},
    // itineraryID:{type: mongoose.Schema.ObjectId, ref: "itineraries"},
    
})
const Activity = mongoose.model('activities', activitiesSchema)
module.exports = Activity

