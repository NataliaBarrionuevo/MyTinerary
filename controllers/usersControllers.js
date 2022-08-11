const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const crypto=require('crypto');
const sendEmail=require('./sendEmail');
const jwt = require("jsonwebtoken");


const usersControllers = {

    signUpUser: async (req,res) => {
        

        let {firstName, lastName, email, password,userPhoto, country,from} = req.body.userData; //recibimos los datos del usuario por body.
        
        try {
            const userExist = await User.findOne({email});
            const verification=false;
            const uniqueString=crypto.randomBytes(15).toString('hex'); //utiliza un método de crypto, establecemos que tendrá 15 caracteres de tipo hexadecimal.
           
            if (userExist) { 
                
                if (userExist.from.indexOf(from) !== -1) { //existe en array from de la db.
                    res.json({
                        success: false,
                        from: from,
                        message: "You have already done you sign up for this way, please log in" 
                    })        
                } else { 
                    const passwordHashed = bcryptjs.hashSync(password, 10)
                    userExist.verification=true; 
                    userExist.from.push(from) 
                    userExist.password.push(passwordHashed) 
                    await userExist.save() //espera que pushee y guarda la respuesta.

                    res.json({
                        success: true,
                        from: from, //cambio, antes 'signup'
                        message: "We add" + " " + from + " to your means to log in" 
                        
                    })
                  
                }
            } else { //acá no se da la respuesta, sino en el condicional de menor nivel.
                const passwordHashed = bcryptjs.hashSync(password, 10) 
                console.log(passwordHashed)
                const newUser = await new User({ 
                    firstName:firstName,
                    lastName: lastName,
                    email: email,
                    password: [passwordHashed],
                    userPhoto: userPhoto,
                    country:country,
                    from: [from],
                    verification:verification,
                    uniqueString: uniqueString
                })
                if (from !== "form-signup") {
                    newUser.verification=true; // signup por medio distinto al formulario-->verification true.
                    await newUser.save() 
                    
                    res.json({
                        success: true, 
                        from: from,
                        message: "Congratulations, your user was created with" + " " +from 
                    })
                    } else { 
                  
                    await newUser.save()
                    console.log(newUser)
                    await sendEmail(email,uniqueString) //enviar un email para verificarlo (pasar de F a T)
                    res.json({
                        success: true, 
                        from:from,
                        message: "We sent you an email to validate it, please check your email to complete the sign up"
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.json({success: false, message: "Something went wrong. Try again in a few seconds!"})
        }
    },

    logInUser: async (req, res) => {
        const {email, password, from, userPhoto} = req.body.logedUser
        // console.log(req.body.logedUser);
      
        try {
            const userExist = await User.findOne({email}) 
            // const indexPass=userExist.from.indexOf(from)
            console.log(userExist)
            if (!userExist) { 
                res.json({success: false, message: "Your user has not been registred,please sign up "})
            } else { 
                if (from !== "form-signup") { 
                    let passwordMatch =  userExist.password.filter(pass => bcryptjs.compareSync(password, pass)) 
                    
                        if (passwordMatch.length > 0) {
                            const userData = {
                                id: userExist._id,//paso el object id del usuario
                                firstName: userExist.firstName,
                                lastName: userExist.lastName,
                                email: userExist.email,
                                userPhoto: userExist.userPhoto,
                                country:userExist.country,
                                from: from
                                //a la contraseña no se la paso al front!!
                            }

                            const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24 });
                            
                            await userExist.save() //para guardarlo

                                                   
                            res.json({
                                success: true, 
                                from: from, 
                                response: {token, userData}, 
                                message: "Welcome back" + " " + userData.firstName  + " " + userData.lastName
                            })
                        }else {
                            res.json({ 
                                success: false, 
                                from: from,
                                message: "You did not register with" + " " + from + "If you wanto to enter with this method, please Sign Up with" + " " + from
                            })
                        }
                   
                } else {
                    let passwordMatch =  userExist.password.filter(pass => bcryptjs.compareSync(password, pass)) //desencriptado de la contraseña
                   
                  if (userExist.verification) { 
                        if (passwordMatch.length > 0) {
                        const userData = {
                            id: userExist._id,
                            firstName: userExist.firstName,
                            lastName: userExist.lastName, 
                            email: userExist.email,
                            userPhoto: userExist.userPhoto,
                            country: userExist.country,
                            from: from
                        }
                        
                        const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24});
                        await userExist.save()

                            
                          
                        
                        res.json({ 
                            success: true, 
                            from: from, 
                            response: {token,userData}, 
                            message: "Welcome back" + " " + userData.firstName + " " + userData.lastName
                        })
                      } else {
                        res.json({ 
                            success: false, 
                            from: from,  
                            message: "The username or password does not match"
                        })
                      }
                  } else{
                    res.json({
                        success: false,
                        from: from,
                        message:
                          "You have not verified your email, please check your email box to complete your sign up",
                      });
                  }
                }
            }
        } catch (error) {
            console.log(error)
            res.json({success: false, message: "Something went wrong.Try again in a few seconds", respuesta:console.log(error)})
        }
    },

    verifyMail: async (req, res) => {
        const {string} = req.params;
        const user = await User.findOne({uniqueString: string})
        //console.log(user)
        if (user) {
            user.verification = true
            await user.save()
            res.redirect("http://localhost:3000")
        }
        else { res.json({
            success: false, 
            message: `email has not been confirmed yet!`
        }) 
        }
    },

    // logOutUser: async (req, res) => {
    //     const { email } = req.body;
    //     const user = await User.findOne({ email });
    //     await user.save();
    //     res.json({
    //       success: true,
    //       message: email + " sign out!",
    //     });
    //   },
    


    verifyToken: (req, res) => {
        console.log(req.user);
        if (!req.err) {
          res.json({
            success: true,
            response: {
              id: req.user.id, //lo genera el token
              firstName: req.user.firstName,
              lastName: req.user.lastName,
              email: req.user.email,
              userPhoto: req.user.userPhoto,
              country: req.user.country,
              from: "token",
            },
            message: "Welcome back " + req.user.firstName,
          });
        } else {
          res.json({
            success: false,
            message: "Please, Log in again",
          });
        }
      },



}

 



module.exports = usersControllers;

