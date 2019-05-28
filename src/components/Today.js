import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
export class Today extends Component {
  render() {
    const {city, temp, temp_min, temp_max, pressure,
         humidity, wind, weather, todayDate} = this.props.detail;
         const{cities, searchCity}= this.props;
         let arr = todayDate.split("2019");
         let day = arr[0];
         
    return (
        <div className="today">
        <ul>{cities.length > 0 ? cities.map((item, i) => <li key={i} onClick={
         () => searchCity(item)
        }>{item}</li>):''}</ul>
        <div className="title">
            <div className="city-name"><h2>{city}</h2><h5>{weather}</h5></div>
            <div><img className="image-wheather" src={require(`../img/${weather}.png`)} alt=""/></div>
      </div>
      <div className="main-temp"><h1>{temp}°C</h1>
      <div>
      <table>
                            <tbody><tr>
                              <th className="details">Details</th>
                            </tr>
                            <tr>
                              <td>min</td>
                              <td>{temp_min}<span>°C</span></td>
                            </tr>
                            <tr>
                              <td>max</td>
                              <td>{temp_max}<span>°C</span></td>
                            </tr>
                            <tr>
                              <td>Wind</td>
                              <td>{wind.speed} m/s </td>
                            </tr>
                            <tr>
                              <td>Humidity</td>
                              <td>{humidity}%</td>
                            </tr>
                            <tr>
                              <td>Pressure</td>
                              <td>{pressure} hPa</td>
                            </tr>
                          </tbody></table>
      </div>
      </div>
      <div className="forecast-5"><Link to={`/index.html/week/${city}`}>Forecast for 5 days</Link>  </div>     
                              <div className="day"><h4>ForeCast App<span>{day}</span></h4></div>
                                     
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cities: state.cities.cities
});

export default connect(mapStateToProps, null)(Today);
