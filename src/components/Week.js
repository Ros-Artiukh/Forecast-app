import React, { Component } from 'react'
import Cart from './Cart';
import {connect} from 'react-redux';
import {addCities} from '../actions/forecastActions';
import axios from 'axios';

class Week extends Component {
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }
    componentDidMount(){
        const {city} = this.props.match.params
        const{cities, addCities}= this.props;
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=22f4c51fdf2b720df7e32fb96cea9c07`)
        .then(result => {
            let {list} = result.data;
            let arr = []
            for(let i=0; i < list.length; i+=8){
                arr.push(list[i])
            }
            this.setState({
                list:arr
            },() => cities.length === 0 ? addCities(city) : ''
            )
        })
    }
  render() {
    const {list} = this.state;
    const {city} = this.props.match.params;
    return (
      <React.Fragment>
          <h1>{city}</h1>
          <button onClick={()=>this.props.history.goBack()}>Go back</button>
          <div className="container">{list.length > 0 ? list.map((item, i) => <Cart key={i} item={item}/>) : ''}</div>         
          </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
    cities: state.cities.cities
  });
  
  export default connect(mapStateToProps, {addCities})(Week);