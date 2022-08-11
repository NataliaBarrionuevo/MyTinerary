import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
// import data from './data';
import {Link as LinkRouter} from 'react-router-dom';
import '../styles/cardsCities.css';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
export default function CardsCities({cardFilter}) {
  
  return (
  <>
    {cardFilter.map((city)=>(
    <Card sx={{ maxWidth: 345 }} key={city._id} className="cards">
      <CardActionArea>
        <CardMedia
          className="imgCards"
          component="img"
          height="140"
          image={city.image}
          alt={city.name}
        />
        <CardContent className='nameCard'>
          <Typography gutterBottom variant="h5" component="div">
            {city.name}
          </Typography>

          <Typography gutterBottom variant="h5" component="div">
            {city.country}
          </Typography>
          
        </CardContent>
      </CardActionArea>
      <CardActions>
      <LinkRouter to={`/city/${city._id}`} className='buttonCard'>
        <Button size="small" className='buttonSeeMore'>
          <ZoomInIcon/>
        </Button>
      </LinkRouter> 
        
      </CardActions>
    </Card>
    
    ))}; 
</>
  );

}
