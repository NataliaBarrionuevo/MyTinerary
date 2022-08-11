import React from 'react'
import '../styles/hero.css'
import {Link as LinkRouter} from 'react-router-dom';

function Hero(){
    return(

        <section className="bgimage d-flex flex-direction-column justify-center align-items-end">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
             
              <h1>MyTinerary</h1>
              <h2 className='sub'>Find your perfect trip, designed by insiders who know and love their cities!</h2>
              <LinkRouter to="/cities">
              <button  className="btn btn-warning btn-large mb-2 buttonHero"></button>
              </LinkRouter>

            </div>
          </div>
        </div>
      </section>
    );
}

export default Hero;

