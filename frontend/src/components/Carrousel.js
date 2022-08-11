import React from 'react'
import Carousel from 'react-grid-carousel'
import "../styles/carousel.css"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
//Redux
import { connect } from 'react-redux'


const Carrousel = (props) => {

  return (
    <>
      <div className='container-sub'>
        <h2> Popular MyTineraries:</h2>
      </div>

      <div className="container-carousel">
        <Carousel cols={2} rows={2} gap={10} loop autoplay={2000}
          mobileBreakpoint={300}
          responsiveLayout={[
            {
              breakpoint: 760,
              cols: 1,
              rows: 4,
              gap: 5,
              loop: true
            },


          ]}
        >
          {props.cities && props.cities.map((city) =>
            <Carousel.Item key={city._id}>
              <Card sx={{ Width: 100 }}>
                <CardActionArea>
                  <CardMedia
                    className="cardsCarousel"
                    component="img"
                    height="250"
                    image={city.image}
                    alt={city.name}
                  />
                  <CardContent className='name'>
                    <Typography gutterBottom variant="h5" component="div">
                      {city.name}
                    </Typography>

                  </CardContent>
                </CardActionArea>
              </Card>

            </Carousel.Item>
          )}

        </Carousel>
      </div>

    </>

  )
}

const mapStateToProps = (state) => {
  return {
    cities: state.citiesReducer.cities,
    auxiliar: state.citiesReducer.auxiliar,
  }
}

export default connect(mapStateToProps, null)(Carrousel);