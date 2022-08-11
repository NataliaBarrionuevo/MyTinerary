const mongoose=require('mongoose');

const itinerarySchema=new mongoose.Schema({
    city: {type: mongoose.Types.ObjectId , ref:'cities'}, //relaciono la colección con un elemento de otra coleccion
    itineraryName:{type:String, required:true},
    personPhoto: {type:String, required:true},
    personName: {type:String, required:true},
    price: {type:String, required:true},
    durationH: {type:String, required:true},
    hashtags: {type:Array, required:true},
    likes: {type:Array},
    activities: [{type:mongoose.Types.ObjectId,ref:'activities'}], //ref se refiere a la colección activities.
    comments: [{
        date:{type:Date},
        comment: {type:String},
        userID:{type:mongoose.Types.ObjectId,ref:'users'} //autor (populado con los datos del usuario)
    }]

    
})

const Itinerary=mongoose.model('itineraries',itinerarySchema);

module.exports=Itinerary;