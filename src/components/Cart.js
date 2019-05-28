import React, { Component } from 'react'

export class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            day:0,
            dayName:0,
            month:0,
            weekend:false
        }
    }
    componentDidMount(){
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
        "Sunday"
        ];
        const numberDates = this.props.item.dt_txt;
        const d = new Date(numberDates);
        const month =  monthNames[d.getMonth()];
        const strDay = d.getDate();
        const numDay = d.getDay();
        const day = dayNames[numDay];
        
        this.setState({
            day: strDay,
            dayName: day,
            month: month,
            weekend:   numDay > 4 ?  true : false
        })

    }
  render() {
    const { temp_min, temp_max, pressure,
        humidity} = this.props.item.main;
    const {wind, weather} = this.props.item;
    const {day, dayName, month, weekend} = this.state;
    return (
       
                 <div className="week">
        <div className="title">            
            <div>
            <div><span className="title-date">{dayName}</span></div>
            <div className={weekend ? "number-date active" : "number-date"}>{day}</div>            
            <div><span className="title-date">{month}</span></div>
            <img className="image-wheather" src={require(`../img/${weather[0].main}.png`)} alt=""/></div>
      </div>
      <div className="main-temp">
      <div>
      <table>
                            <tbody>
                            <tr>
                              <td>min</td>
                              <td>max</td>
                            </tr>
                            <tr>
                              <td>{Math.round(temp_min - 273.15)}<span>°C</span></td>
                              <td>{Math.round(temp_max - 273.15)}<span>°C</span></td>
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
      
                              <div className="day"><h4>ForeCast App<span></span></h4></div>
                           
      </div>
    )
  }
}


export default Cart
