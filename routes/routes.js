const Router=require('express').Router();

 //CITIES
const citiesControllers=require('../controllers/citiesControllers');
const {getCities,getOneCity,addCity,modifyCity,removeCity,multiplesCities}=citiesControllers;

//ITINERARIES
const itinerariesControllers=require('../controllers/itinerariesControllers');
const {getItineraries,getOneItinerary,addItinerary,modifyItinerary,removeItinerary,multiplesItineraries,getItinerariesByCity,likeDislike}=itinerariesControllers;

//ACTIVITIES

const activitiesControllers=require('../controllers/activitiesControllers');
const {getActivities,getOneActivity,addActivity,modifyActivity,removeActivity,multiplesActivities}=activitiesControllers;

//COMMENTS

const commentsControllers = require('../controllers/commentsControllers')
const {addComment, modifyComment,removeComment}= commentsControllers

//USERS
const usersControllers = require('../controllers/usersControllers');
const {signUpUser,logInUser,verifyMail,verifyToken} = usersControllers;

//VALIDATOR

const validator=require('../config/validator');

//PASSPORT

const passport = require('../config/passport')

//CITIES

Router.route('/cities')
.get(getCities) //llamo
.post(addCity)

Router.route('/cities/:id')
.delete(removeCity)
.put(modifyCity)
.get(getOneCity)

Router.route('/multiplesCities')
.post(multiplesCities)

//ITINERARIES

Router.route('/itineraries')
.get(getItineraries) 
.post(addItinerary)

Router.route('/itineraries/:id')
.post(removeItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

Router.route('/multiplesItineraries')
.post(multiplesItineraries)

Router.route('/like/:id')
.put(passport.authenticate("jwt", {session: false}),likeDislike)

//De controlador de leer.
Router.route('/itinerarybycity/:id')
.get(getItinerariesByCity)

//ACTIVITIES 
Router.route("/activities")
.get(getActivities)
.post(addActivity);


Router.route("/allActivities/:id")
.post(removeActivity)
.put(modifyActivity)
.get(getOneActivity)


Router.route('/multiplesActivities')
.post(multiplesActivities)

//COMMENTS.

Router.route('/allItineraries/comment')
.post(passport.authenticate('jwt',{ session: false }),addComment)
.put(passport.authenticate('jwt',{ session: false }),modifyComment)

Router.route('/allItineraries/comment/:id')
.post(passport.authenticate('jwt',{ session: false }),removeComment)

//SIGN UP USERS, CON VALIDACIÓN.

Router.route('/auth/signup')
.post(validator,signUpUser)

//VERIFICAR TOKEN.

Router.route('/auth/logintoken')
.get(passport.authenticate('jwt',{ session:false }), verifyToken)

//LOGIN USER.

Router.route('/auth/login')
.post(logInUser)

//VERIFICAR EMAIL.

Router.route('/verify/:string')
.get(verifyMail)

//LOGOUT USER

// Router.route('/auth/logout')
// .post(logOutUser)


module.exports=Router;

