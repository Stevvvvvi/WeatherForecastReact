import { ClearCurrentData, GetWeatherForcastFailed, GetWeatherForcastStart, GetWeatherForcastSuccess } from "../actions/actionType"
import { WeatherForcastRootAction } from "../actions/weatherForcastAction"

export type WeatherReducerType={
    loading: boolean;
    data: any;
    errorMessage: null | string;
}
const initialState: WeatherReducerType={
    loading: false,
    data: null,
    errorMessage: null
}

const WeatherReducer = (state = initialState, action: WeatherForcastRootAction) => {
    switch (action.type) {
      case GetWeatherForcastStart:
        return {
            ...state,
            loading: true,
            errorMessage: null,
        }
      case GetWeatherForcastSuccess:
        return {
            ...state,
            loading: false,
            data: action.payload,
            errorMessage: null,
        }
      case GetWeatherForcastFailed:
        return {
            ...state,
            loading: false,
            errorMessage: "Cannot Visit the Backend API"
        }
      case ClearCurrentData:
        return {
          ...state,
          loading: false,
          errorMessage: null,
          data: null,
        }
      default:
        return state
    }
  }
export default WeatherReducer;