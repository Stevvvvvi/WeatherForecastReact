import { combineReducers } from "@reduxjs/toolkit";
import WeatherReducer, { WeatherReducerType } from "./weatherReducer";
export type RootStateType = {
    WeatherReducer: WeatherReducerType
}
export default combineReducers({
    WeatherReducer,
})
  