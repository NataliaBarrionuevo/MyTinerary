import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import logo from '../images/logoMyT.png';
import '../styles/navbar.css'
import {Link as LinkRouter,useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

import usersActions from '../redux/actions/usersActions';

import Avatar from '@mui/material/Avatar';

const pages = [
  {
    name: 'Home',
    to: '/index'
  },
  
  {
    name:'Cities',
    to: '/cities'
  }
  
  ];
// const settings = ['Sign Up', 'Log In'];

const settings  = [
  {
    name: 'Sign Up' ,
    to: '/signup'
  },
  
  {
    name: 'Log In',
    to: '/login'
  },

    
  ];


const NavBar = () => {

const user=useSelector(store=>store.usersReducer.user)
const navigate=useNavigate()
const dispatch=useDispatch()

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function LogOut() {
    dispatch(usersActions.LogOutUser())
      navigate("/")
  }

 

  

  return (
    <AppBar position="static" sx={{backgroundColor:"black"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src={logo} alt="logo" style={{width: "60px"}} />
          </Box>

          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                       
               {pages.map((page,index) => (
                <LinkRouter key={index} onClick={handleCloseNavMenu} to={page.to} className="linkNav">
                  <MenuItem>
                  {/* {console.log(page)} */}
                
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </LinkRouter>
                
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width:"100vw", justifyContent:"center", padding:1 }}>
                 <img src={logo} alt="logo" style={{width: "70px"}} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    
              {pages.map((page,index) => (
             <LinkRouter
                
                 key={index}
                 to={page.to}
                onClick={handleCloseNavMenu}
                 sx={{ my: 2, color: 'white', display: 'block' }}
                 
              >
                <button  className="linkNav">
                {page.name}
                </button>

               
             </LinkRouter> 
            
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? <Avatar alt="User Photo" src={user?.userPhoto}/> : <Avatar alt="Remy Sharp" src="https://secure.gravatar.com/avatar/a6321ca519c15d35a4e297efc45d5ecb?s=500&d=mm&r=g" sx={{ color: "white"}}/> }
                
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

{user ? (
                <Box>
                
                  <MenuItem sx={{'&:hover': {bgcolor: 'rgb(224,224,224)'}}} onClick={handleCloseUserMenu}>
                    <Typography className='logOut' onClick={LogOut}>Log Out</Typography>
                  </MenuItem>
                </Box>
              


              ):settings.map((setting,index) => (
                <LinkRouter key={index} onClick={handleCloseUserMenu} to={setting.to} className="linkNav">
                  <MenuItem>
                      <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </LinkRouter>
                
              ))}


              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
