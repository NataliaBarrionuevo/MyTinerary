import {combineReducers} from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import usersReducer from './usersReducer'

const mainReducer = combineReducers({
    citiesReducer,
    itinerariesReducer,
    usersReducer
})
export default mainReducer;

