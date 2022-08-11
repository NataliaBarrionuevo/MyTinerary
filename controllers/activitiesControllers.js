const Activity=require('../models/activity');

const activitiesControllers={

    getActivities:async(req,res)=>{
        
        let activities;
        let error=null;

        try{
            activities=await Activity.find()
        }catch(err){error=err}
        res.json({
            response:error ? 'ERROR' : {activities},
            success: error ? false : true,
            error:error

        })

    },

    getOneActivity:async(req,res)=>{
        const id=req.params.id;
        let activity;
        let error=null;

        try{
            activity=await Activity.findOne({_id:id})
        }catch(err){error=err}
        res.json({
            response:error ? 'ERROR' : activity,
            success: error ? false : true,
            error:error

        })

    },


    addActivity:async(req,res)=>{
        const {title,image}=req.body.data;
        let activity;
        let error=null;

        try{
            activity=await new Activity({
                title: title,
                image:image,
               
            
            }).save()
        }catch(err){error=err}
        res.json({
            response:error ? 'ERROR' : activity,
            success: error ? false : true,
            error:error

        })

    },

    modifyActivity:async(req,res)=>{
        const id=req.params.id;
        let activity=req.body;
        let activitydb;
        let error=null;

        try{
            citydb=await Activity.findOneAndUpdate({_id:id},activity,{new:true})
        }catch(err){error=err}
        res.json({
            response:error ? 'ERROR' : activitydb,
            success: error ? false : true,
            error:error

        })

    },

    removeActivity:async(req,res)=>{
        const id=req.params.id;
        let activity;
        let error=null;

        try{
            activity=await Activity.findOneAndDelete({_id:id})
        }catch(err){error=err}
        res.json({
            response:error ? 'ERROR' : activity,
            success: error ? false : true,
            error:error

        })

    },

    multiplesActivities: async (req, res) => {
        let activity = [];
        const data = req.body.data; //almaceno en la constante data la informacion que le pedi al body
        let error = null;
        try {
            data.map(async (item) => {
                await new Activity({
                    title: item.title,
                    image: item.image,
                   
                    
                }).save()
            })
        } catch (err) { error = err }
        city = await Activity.find()
        res.json({
            response: error ? "ERROR" : activity,
            success: error ? false : true,
            error: error
        })
    },

    
}

module.exports=activitiesControllers;