import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../styles/footer.css'
import {Link as LinkRouter} from 'react-router-dom';


const pages = [
  {
    name: "Home",
    to: "/index"
  },
  
  {
    name:'Cities',
    to: '/cities'
  }
  
  ];


const Footer = () => {
 
  const [setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

   const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
<>
  
   
<AppBar position="static" className="footer">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FacebookIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
          <InstagramIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
          <WhatsAppIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
          
          
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, justifyContent:"end" }}>
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
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
   
  <div className="footer-second">
    <h5> © MyTinerary|2022</h5>

  </div>  
</> 
    
  );
};
export default Footer;
