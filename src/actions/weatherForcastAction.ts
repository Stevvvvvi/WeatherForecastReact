import { GetWeatherForcastFailed, GetWeatherForcastStart, GetWeatherForcastSuccess } from "./actionType"

export type WeatherForcastRootAction=
          GetWeatherForcastStartType 
        | GetWeatherForcastSuccessType
        | GetWeatherForcastFailedType;

type GetWeatherForcastStartType={
    type: typeof GetWeatherForcastStart;
    
}
type GetWeatherForcastSuccessType={
    type: typeof GetWeatherForcastSuccess;
    payload: any;
    
}
type GetWeatherForcastFailedType={
    type: typeof GetWeatherForcastFailed;
    
}
export const GetweatherForcastAction=(country: string) => (dispatch: (arg0: WeatherForcastRootAction) => void)=>{
    dispatch({type: GetWeatherForcastStart});
    console.log(country);
    if (country==""){
        dispatch({type: GetWeatherForcastFailed})
        return
    }
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=c717ab506269416bab9231151220103&q=${country}&days=3&aqi=no&alerts=no`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response
      })
      .then((response) => response.json())
      .then((repos) => {
          dispatch({type: GetWeatherForcastSuccess, payload: repos})
      })
      .catch((e) => {
          console.log(e);
          dispatch({type: GetWeatherForcastFailed})
       })
}