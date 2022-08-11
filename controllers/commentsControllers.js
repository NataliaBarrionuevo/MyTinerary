const Itinerary = require("../models/itinerary");

const commentsControllers = {

  addComment: async (req, res) => {
    const { itinerary, comment } = req.body.comment;
    const user = req.user._id;
    
    //console.log(req.body)
    //console.log(comment)
    try {
      const newComment = await Itinerary.findOneAndUpdate(
        { _id: itinerary },
        { $push: { comments: { comment: comment, userID: user, date: Date.now() } } },
        { new: true }
      )
      // .populate("comments.userID", { firstName: 1, lastName: 1, userPhoto: 1 }); NO SIRVE, SE POPULA EN GET ITINERARIES BY ID
      res.json({
        success: true,
        response: { newComment },
        message: "Thanks for your comment!",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong please try again in a few seconds",
      });
    }
    //console.log(user);
    //console.log(res.json());
  },
  modifyComment: async (req, res) => {
   
    const {commentID, comment}=req.body.comment
    const user = req.user._id;
    //console.log(req.body)

    try {
      const newComment = await Itinerary.findOneAndUpdate(
        { "comments._id": commentID  },
        { $set: { "comments.$.comment": comment, "comments.$.date": Date.now() } },
        { new: true }
      );
      //console.log(newComment);
      res.json({
        success: true,
        response: { newComment },
        message: "Your comment has been successfully modified",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong, please try again in a few seconds",
      });
    }
  },

  removeComment: async (req, res) => {
    const id=req.params.id
    const user= req.user._id

    try {
      const removeComment = await Itinerary.findOneAndUpdate(
        { "comments._id":id },
        {
          $pull: {
            comments: {
              _id: id,
            }
          }
        },
        { new: true }
      );
      //console.log(removeComment);
      res.json({
        success: true,
        response: {removeComment},
        message: "You have deleted your comment",
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "Something went wrong, try it again in some minutesAlgo ha salido mal intentalo en unos minutos",
      });
    }
  }
};
module.exports = commentsControllers;