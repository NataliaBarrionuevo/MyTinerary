const nodemailer = require('nodemailer')
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2

const sendEmail = async (email, string) => { //recibe dos parámetros
    console.log('clientID')


    const myOAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
    )

    
    myOAuth2Client.setCredentials({
        refresh_token:process.env.GOOGLE_REFRESHTOKEN
    })
    
    console.log(myOAuth2Client)

    const accessToken = await myOAuth2Client.getAccessToken()
    console.log(accessToken)

    const transporter = nodemailer.createTransport({  //mediante este método creará el medio de transporte necesario para enviar nuestro email, al cual le definiremos el servicio de mensajería y los parámetros de auth.
        service: "gmail", //servicio de mensajería.
        auth: { //parámetros de auth
            user: process.env.USER,
            type: "OAuth2",
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false //para evitar que bloquee el antivirus
        }
    })

    //Configuración del contenido del mail.

    let mailOptions = {
        from: process.env.USER,
        to: email,
        subject: 'verify account',
        html:
        `
        <a href=http://localhost:4000/api/verify/${string}>CLICK!</a>
        <h3>to Confirm!</h3>
        ` 
            
    }

    await transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error)
        } else {
            console.log(`check ${email} to confirm your account`)
        }
    })
}

module.exports = sendEmail;





// const nodemailer=require('nodemailer');
// const {google}=require('googleapis');
// const OAuth2=google.auth.OAuth2;

// const sendEmail=async(email,string)=>{
//     console.log(email)
//     console.log(string)
//     const myOAuth2Client=new OAuth2(
//         process.env.GOOGLE_CLIENTID,
//         process.env.GOOGLE_CLIENTSECRET,
//         "https://developers.google.com/oauthplayground"
//     )

//     myOAuth2Client.setCredentials({refresh_token:process.env.GOOGLE_REFRESHTOKEN})

//     const accessToken=myOAuth2Client.getAccessToken()

//     const transporter=nodemailer.createTransport({
//         service:"gmail",
//         auth:{
//             user: process.env.USER,
//             type:"OAuth2",
//             // user: process.env.USER,
//             clientId: process.env.GOOGLE_CLIENTID,
//             clientSecret: process.env.GOOGLE_CLIENTSECRET,
//             accessToken: accessToken,
//             refreshToken: process.env.GOOGLE_REFRESHTOKEN

//         },
//         tls:{
//             rejectUnauthorized:false
//         }
//     })
//     let mailOptions={
//         from: process.env.USER,
//         to: email,
//         subject: 'verify account',
//         html:`
//         <a href=http://localhost:4000/api/verify/${string}>CLICK!></a>
//         <h3>TO CONFIRM!</h3>
//         `
        
//     }
//     await transporter.sendMail(mailOptions,function(error,response){
//         if(error){
//             console.log(error);
//         } else{
//             console.log(`Check your ${email} to confirm your account`);
//         }
//     })
// }

// module.exports=sendEmail;