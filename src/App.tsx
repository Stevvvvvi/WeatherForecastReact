import React from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { GetweatherForcastAction } from './actions/weatherForcastAction';
import Chart from './components/Chart';

function App() {
  const dispatch= useDispatch();
  return (
    <div className="App">
      <h2>Weather Forcast</h2>
      <div className="custom-select" onChange={(e: any)=>dispatch(GetweatherForcastAction(e.target.value || ""))}>
        <select>
          <option value="">...</option>
          <option value="Sydney">Sydney</option>
          <option value="Warsaw">Warsaw</option>
          <option value="HongKong">Hong Kong</option>
        </select>
      </div>
      <Chart />
    </div>
  );
}

export default App;
