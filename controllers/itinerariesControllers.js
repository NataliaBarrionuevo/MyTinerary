const Itinerary=require('../models/itinerary');


const itinerariesControllers={

    getItineraries:async(req,res)=>{
        
        let itineraries;
        let error=null;

        try{
            itineraries=await Itinerary.find()
        }catch(err){error=err}
        res.json({
            response:error ? 'ERROR' : {itineraries},
            success: error ? false : true,
            error:error

        })

    },

    getOneItinerary:async(req,res)=>{
        const id=req.params.id;
        let itinerary;
        let error=null;

        try{
            itinerary=await City.findOne({_id:id})
        }catch(err){error=err}
        res.json({
            response:error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error:error

        })

    },


    addItinerary:async(req,res)=>{
        const {city,itineraryName,personPhoto,personName,price,durationH,hashtags,likes,activities}=req.body.data;
        let itinerary;
        let error=null;

        try{
            itinerary=await new Itinerary({
                city:city,
                itineraryName:itineraryName,
                personPhoto:personPhoto,
                personName:personName,
                price:price,
                durationH:durationH,
                hashtags: hashtags,
                likes:likes,
                activities:activities
                

            }).save()
        }catch(err){error=err}
        res.json({
            response:error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error:error

        })

    },

    modifyItinerary:async(req,res)=>{
        const id=req.params.id;
        let itinerary=req.body;
        let itinerarydb;
        let error=null;

        try{
            itinerarydb=await Itinerary.findOneAndUpdate({_id:id},itinerary,{new:true})
        }catch(err){error=err}
        res.json({
            response:error ? 'ERROR' : itinerarydb,
            success: error ? false : true,
            error:error

        })

    },

    removeItinerary:async(req,res)=>{
        const id=req.params.id;
        let itinerary;
        let error=null;

        try{
            itinerary=await Itinerary.findOneAndDelete({_id:id})
        }catch(err){error=err}
        res.json({
            response:error ? 'ERROR' : itinerary,
            success: error ? false : true,
            error:error

        })

    },

    multiplesItineraries: async (req, res) => {
        let itinerary = [];
        const data = req.body.data; 
        let error = null;
        try {
            data.map(async (item) => {
                await new Itinerary({
                city:item.city,
                itineraryName:item.itineraryName,
                personPhoto:item.personPhoto,
                personName:item.personName,
                price:item.price,
                durationH:item.durationH,
                hashtags: item.hashtags,
                likes:item.likes,
                activities:item.activities
                    
                }).save()
            })
        } catch (err) { error = err }
        itinerary = await Itinerary.find()
        res.json({
            response: error ? "ERROR" : itinerary,
            success: error ? false : true,
            error: error
        })
    },

    getItinerariesByCity: async (req,res)=>{
        const id= req.params.id
        let itineraries
        let error= null
        try{
            itineraries= await Itinerary.find({city:id}).populate("activities").populate("comments.userID",{ firstName: 1, lastName: 1, userPhoto: 1 }) //se popula el campo activities del modelo itinerary
           
        }catch (err) {
            error = err
        }
        res.json({
            response: error ? 'ERROR' : itineraries,
            success: error ? false : true,
            error: error
    })

},

likeDislike:async (req,res) =>{
    const id=req.params.id //LLEGA POR PARÁMETRO DESDE AXIOS (AL HACER LA LLAMADA, LE PASO EL ID DEL ITINERARIO QUE QUIERO BUSCAR)
    const user = req.user.id //LLEGA POR RESPUESTA DE PASSPORT-->VERIFICAR QUE SE LEVANTE EL TOKEN PARA QUE LE LLEGUE A PASSPORT.
  //console.log(id);
  //console.log(user);
   await Itinerary.findOne({_id: id})

    .then((itinerary) =>{
        //console.log(itinerary)
        if(itinerary.likes.includes(user)){
          Itinerary.findOneAndUpdate({_id:id}, {$pull:{likes:user}},{new:true})//PULL QUITA, SACA LIKES (CDO EL USUARIO APRIETA UN BOTÓN YA LIKEADO)
           .then((response)=> res.json({success:true, response:response.likes, message:false}))
           .catch((error) => console.log(error))
        }else{
           Itinerary.findOneAndUpdate({_id: id}, {$push:{likes:user}},{new:true})//PUSH AGREGA LIKES (CDO EL USUARIO APRIETA UN BOTÓN NO LIKEADO)
            .then((response) => res.json({success:true, response:response.likes, message:true}))
            .catch((error) => console.log(error))
        }
    })
    .catch((error) => res.json({success:false, response:error}))
},

}

module.exports=itinerariesControllers;