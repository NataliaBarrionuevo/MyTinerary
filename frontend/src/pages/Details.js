import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
// import axios from 'axios';
import '../styles/details.css';
import { Link as LinkRouter } from 'react-router-dom';
import Itinerary from '../components/Itinerary';
import { useDispatch, useSelector } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions';
import NotItineraries from '../components/NotItineraries';
import itinerariesActions from '../redux/actions/itinerariesActions';
import { useState } from 'react';

export default function Details() {
  const { id } = useParams();
  const [reload, setReload] = useState(false);

  // console.log(id);

  // const [city,setCity]=useState({})

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(citiesActions.getOneCity(id))
    dispatch(itinerariesActions.getItinerariesByCity(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  function handleSetReload() {
    setReload(!reload)
  }

  const city = useSelector(store => store.citiesReducer.oneCity);

  // console.log(city)

  const itineraries = useSelector(store => store.itinerariesReducer.getItinerariesByCity);
  // console.log(itineraries)

  // const cardCity=data.find(city=>city.id === id);
  // console.log(cardCity);
  return (
    <>
      <div className='containerButtonComeBack'>
        <LinkRouter to={'/cities'} className='buttonComeBack'>
          <button>
            Go Back
          </button>


        </LinkRouter>
      </div>

      <div className='cardDetail'>
        <div className='face front'>
          <img src={city?.image} alt={city?.name} />

          <h3>Enjoy {city?.name}! </h3>

        </div>
        <div className='face back'>
          <h3>{city?.name}-{city?.country}</h3>
          <p>{city?.description}</p>
        </div>

      </div>
      <div className='containerTitleItineraries'>
        <h1 className='titleItineraries'>Discover the Best Entertainment Proposals</h1>
      </div>

      {/* {itineraries.length > 0 ? (<Itinerary data={itineraries}/>) : (<NotItineraries/>) }
    */}

      {/* De la forma anterior debia mapear en itinerary y al abrir un acordeon se me abria tmb el otro. */}

      {itineraries.length > 0 ? itineraries.map((itinerary) => {
        return (
          <Itinerary key={itinerary._id} data={itinerary} handleSetR={handleSetReload} />
        )
      }) : (<NotItineraries />)}


    </>
  );
}
//data={itineraries}