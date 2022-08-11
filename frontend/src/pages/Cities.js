import React,{useState,useEffect} from 'react';
import CardsCities from '../components/CardsCities';
import NotResults from '../components/NotResults';
import '../styles/cities.css'
//Redux
import {useDispatch,useSelector} from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'


function Cities (){

  const[inputValue,setInputValue]=useState("");
  
    //let filterCity= props.cities?.filter(city=>city.name.toLowerCase().startsWith(inputValue.trim().toLowerCase()))
    
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(citiesActions.filterCities(inputValue))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[inputValue])
     
    const cityFilter=useSelector(store=>store.citiesReducer.filter)
    return(
           
        <main className='containerCardsCities'>  
          <div className="containerInput">
            <input  aria-label="input" onKeyUp={(event)=>{setInputValue(event.target.value)}} type="text" placeholder='Search a City' className='form-control'/>
          </div>
        
        
          <div className="containerCards">
             {cityFilter && cityFilter.length >0 ? (<CardsCities cardFilter={cityFilter}/>) : (<NotResults/>) }
          </div>
        </main>
       
     
    );
}



export default Cities;

//24 idem filterCity?.length>0


