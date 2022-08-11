import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as LinkRouter } from "react-router-dom";
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import usersActions from '../redux/actions/usersActions';

//ALERT:

import { toast } from 'react-toastify';


import GoogleLogIn from '../components/GoogleLogIn';

//REDIRECCIÓN A INDEX AL LOGUEARME.

import {useNavigate} from 'react-router-dom';

const theme = createTheme();

function LogIn() {

  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");

  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const logedUser = {
    
         email: email,
			   password: pass,
			   from: "form-signup"

    }
    // console.log(logedUser)
    
    const res= await dispatch(usersActions.logInUser(logedUser)) //le paso el objeto creado en 33.
    // console.log(res)

    

    //1 solo condicional, porque en el login no hay validador, sino que solo tendremos los msjs que lleguen del controlador

    
      if(res.data.success){
        toast.success(res.data.message)
        navigate('/index')

      } else {
       toast.error(res.data.message)
       navigate('/signup')
      }
   

    
    //Limpieza:
    
    setEmail("")
    setPass("")
   

  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  return (
    <>
    <h1 className='titlesign'>Welcome!</h1>
    <ThemeProvider theme={theme}>
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}
          alt="Remy Sharp" src="../src/images/logoMyT.png"
          /> */}
          <Typography component="h2" variant="h5" className='formsign'>
            Log In Form
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
             onChange={e=>setEmail(e.target.value)}
             value={email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={e=>setPass(e.target.value)}
              value={pass}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              className='btnsign'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In!
            </Button>
            Or Log In with Google:
          
           <div className='container-googlesign'>
            
            <GoogleLogIn/>

           </div>
            <Grid container>
              
              <Grid item>
                <div className='container-linksign'>
                  Don't have an account?<LinkRouter to="/signup"> Sign Up</LinkRouter> 
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


export default LogIn;

