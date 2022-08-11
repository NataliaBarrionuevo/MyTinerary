const initialState={
    cities:[], //para contener todas las ciudades
    auxiliar:[],
    oneCity: {}, //para contener una única ciudad.
    filter:[]  //para contener todas las ciudades filtradas
}

const citiesReducer=(state=initialState,action )=>{
    
    switch(action.type){
        case "GETCITIES":
            return{
               ...state,
               cities:action.payload,
               auxiliar:action.payload,
               filter:action.payload //para cargar todas las ciudades por defecto.
            }
        case "GETONECITY":
            return {
                ...state,
                oneCity: action.payload,
                auxiliar: action.payload
            }

        case "FILTERCITIES":
                let cityFilter = state.cities.filter(city => city.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            return {
                ...state,
                filter: cityFilter

            }

        default:
            return state
    }

}

export default citiesReducer;
