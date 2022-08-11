import '../styles/forms.css';
import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import usersActions from '../redux/actions/usersActions';
//ALERT:
import { toast } from 'react-toastify';
//GOOGLE
import GoogleSignUp from '../components/GoogleSignUp';
//SWAL PARA SELECT:
import Swal from 'sweetalert2'
import { Link as LinkRouter } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {

  
  // const [firstName,setFirstName]=useState("");
  // const [lastName,setLastName]=useState("");
  // const [email,setEmail]=useState("");
  // const [pass,setPass]=useState("");
  // const [userPhoto,setUserPhoto]=useState("");
  const [selectCountry,setSelectCountry]=useState("");
  
  
  const dispatch=useDispatch();
 
  //SELECT PAÍSES:

Swal.fire({
  title: 'Please, select a country to start registration',
  input: 'select',
  inputOptions: {
      'Argentina': 'Argentina',
      'Australia': 'Australia',
      'Brazil': 'Brazil',
      'Chile': 'Chile',
      'Colombia': 'Colombia',
      'China': 'China',
      'Mexico': 'Mexico',
      'Germany': 'Germany',
      'France': 'France',
      'India': 'India',
      'Italy': 'Italy',
      'Japan': 'Japan',
      'Korea': 'Korea',
      'Quatar': 'Quatar',
      'England': 'England',
      'EEUU': 'EEUU',
      'Spain': 'Spain',
  },
  inputPlaceholder: 'Country...',
  inputAttributes: {
      name: 'select-country'
  },
  showCancelButton: false,
  allowOutsideClick: false,
  preConfirm: (country) => {
      setSelectCountry(country)
  },
  inputValidator: (value) => {
      return new Promise((resolve) => {
          if (value === '') {
              resolve('You need to select a country')
          } else {
              resolve()
          }
      })
  },
}).then((result) => {
  if (result.value) {
      Swal.close()
}
})
  const handleSubmit = async (event) => {
    // console.log(event); //para ver en que posición me llega cada dato.
    event.preventDefault();
    const userData = {
      
         firstName: event.target[0].value,
         lastName: event.target[2].value ,
         email: event.target[4].value ,
         password: event.target[6].value,
         userPhoto: event.target[8].value ,
         country: selectCountry,
         from: "form-signup"

    }
    // console.log(userData)
   
    const res= await dispatch(usersActions.signUpUser(userData));

    // console.log(res); //para ver como vienen los mensajes: si hay errores, tira los del validador en data.message (from validator), si esta todo bien, tira los msjs del controlador en data.message (from signup)

    //ALARMAS:
    const errorValidator=res.data.message; //para acceder directamente al array con mensajes del validador y simplificar el forEach.

    //Condicionales según el from para las alarmas.

    if(res.data.from === 'validator'){
      errorValidator.forEach(elem=>{
        toast.error(elem.message)
      })
    } else

    {
       if(res.data.success){
        toast.success(res.data.message)
       } else {
        toast.error(res.data.message)
       }
    }
 
  };

  return (
    <>
    <h1 className='titlesign'>Are you ready?</h1>
    <ThemeProvider theme={theme}  >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        className="container-sign"

        sx={{
            
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
        
          <Typography component="h2" variant="h5" className='formsign'>
            Register Form
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                 
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
               
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
 {/* url image */}
              <Grid item xs={12}>
                <TextField
                  
                  required
                  fullWidth
                  name="urlImage"
                  label="URL Image"
                  type="urlImage"
                  id="urlImage"
                  autoComplete="urlImage"
                />
              </Grid>

              <Grid item xs={12}>
                
              </Grid>
            </Grid>
            <Button
              
              className='btnsign'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up!
            </Button>
           Or Sign Up with Google:
          
           <div className='container-googlesign'>
            <GoogleSignUp country={selectCountry}/>

           </div>
            <br></br>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <div className='container-linksign'>
                  Already have an account? <LinkRouter to="/login">Log in</LinkRouter>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
    </>
    
  );

}



