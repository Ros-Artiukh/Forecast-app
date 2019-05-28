import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addCities } from '../actions/forecastActions';
import Today from './Today';

export class City extends Component {
    constructor(props){
        super(props);
        this.searchCity = this.searchCity.bind(this);
        this.state = {
            field: '',
            city: '',
            temp:0,
            temp_min:0,
            temp_max:0,
            pressure:0,
            visibility: 0,
            humidity:0,
            wind:[],               
            weather:'',
            todayDate:0   
        }
    }

    componentDidMount(){
        const {cities} = this.props;
        const {city} = this.state;
       if(city === '' && cities.length > 0){
        this.searchCity(cities[0])
       } 
    }

     fieldValue(value){
        const rep = /[0-9+А-Яа-я]/; 
        const result = value.replace(rep, '');         
        this.setState({
            field: result            
        })
    }
    searchCity(field){  
        axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${field}&appid=22f4c51fdf2b720df7e32fb96cea9c07`)
        .then(result => {         
            const {temp, temp_min, temp_max, pressure,  humidity } = result.data.main;
            const {visibility, wind, weather} = result.data;
            const{date} = result.headers;
            const{cities, addCities} = this.props
                this.setState({
                field: '',
                city: field,
                temp: Math.round(temp - 273.15),
                temp_min: Math.round(temp_min - 273.15),
                temp_max: Math.round(temp_max - 273.15),
                pressure: pressure,
                visibility: visibility,
                humidity: humidity,
                wind: wind,                
                weather: weather[0].main,
                todayDate: date,
                error: false
                },() => {
                    if(cities.indexOf(field) === -1) {
                        addCities(field)
                      }else{
                       let arr = cities.splice(cities.indexOf(field))
                       arr.map(item =>{
                           if(item !== field){
                            cities.unshift(item);
                           }
                       })
                     addCities(field)
                      }
                    }
                )
            }
        ).catch(err =>{
            console.log(err)
        })
    }
  render() {
      const {field, city,error} = this.state;
      if(error){
        setTimeout(() => this.setState({
            error: false
        }), 2000)
      }
    return (
      <div className="card">
      {error ? <div className="error">Incorect City</div>: ''}
      <h1 className="enter-city">Enter your city</h1>
          <form onSubmit={e => {
              e.preventDefault();
              this.searchCity(field);
              }}>
          <input onChange={e => this.fieldValue(e.target.value)} value={field} required type="text"/>
          <button>Search</button>
          </form>
          {city.length > 0 ?
          <Today searchCity={this.searchCity} detail={this.state}/>
           : ''}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    cities: state.cities.cities
  });
export default connect(mapStateToProps, {addCities})(City);
