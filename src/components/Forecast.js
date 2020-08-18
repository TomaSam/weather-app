import React, {Component} from 'react';
import '../App.css';
//import Search from './Search';

const one = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const two =  '&units=metric&appid=11034ede81a0d91d8e891e1f44ae9d82';
const city = 'Paris';
const API = one + city + two;

class Forecast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: false,
      result: {}
    };
  }

  componentDidMount() {
    fetch(API)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            this.setState({
              isLoading: true,
              result: response,
              list: response.list  
        });
        console.log(response);
        console.log(response.list);
        },
        (error) => {
            this.setState({
            isLoading: true,
            error
            });
        }
        )       
  }

  getCardinalDirection(angle) {
    const directions = ['↑ North', '↗ NorthEast', '→ East', '↘ SouthEast', '↓ South', '↙ SouthWest', '← West', '↖ NorthWest'];
    return directions[Math.round(angle / 45) % 8];
  }

  getIconUrl(icon) {
    const iconUrl1 = "http://openweathermap.org/img/wn/"
    const iconUrl2 = "@2x.png";
    return iconUrl1 + icon + iconUrl2;
  }

  // search = () => {
  //   this.setState({
  //           isLoading: true,
  //           item: this.props.result,
  //           list: this.props.result.list  
  //         });
  //         console.log(this.props.result);
  //         console.log(this.props.result.list);
          
  // }
  
   render() {
     const { isLoading, error, result, list } = this.state; 
      console.log(result);

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoading) {
        return <div>Loading...</div>;
      } else {
        return (   
          <div>
            {/* <Search search={this.result} />       */}
          <div className="forecast-container">

            <div className="card">
                <div className="card-header">
                  {result.city.name}, {result.city.country}
                </div>
          
                <div className="card-body">
                  {list.map(e => 
                <div className="card" key={e.dt}>
                  <h5 className="card-header">{e.dt_txt}</h5>

                    <div className="card-content">
                     
                      <img src = {this.getIconUrl(e.weather.map(d => d.icon))} className="card-img" alt=""></img>
                      
                      <div className="card-body"> 
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">Temperature: {e.main.temp} &#8451;</li>
                          <li className="list-group-item">Weather description: {e.weather.map(d => d.description)}</li>
                          <li className="list-group-item">Wind speed: {e.wind.speed} m/s, wind direction: {this.getCardinalDirection(e.wind.deg)}</li>
                        </ul> 
                      </div>

                    </div>

                </div>
                  )}
                </div>

            </div>

          </div>   
          </div>
        )      
   }
  }

}

export default Forecast;