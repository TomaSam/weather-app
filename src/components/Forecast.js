import React, {Component} from 'react';
import '../App.css';
import Search from './Search';
import axios from 'axios';
 
class Forecast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: false,
      result: {}
    } 
  }

  componentDidMount() {
    
    this.getCurrentLocation();
  
  }

  getCurrentLocation() {
    var city = ''; 
    // var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    var targetUrl = 'https://api.ipgeolocation.io/ipgeo?apiKey=c8428e67e74c44d4b109e061f5751dd5';
        // fetch(targetUrl)
        axios.get(targetUrl)
        // .then(response=>response.json())
          .then(response => {
            console.log(response);
            city = response.data.city;
            console.log(city);
            if(typeof city !== "undefined") {
              this.getCurrentWeather(city);
            }
            
            // return location;
            
          })
          .catch(e => {
            console.log(e);
            // return e;
          });
          
  }

  getCurrentWeather(city) {
    //city = {this.getCurrentLocation};


    console.log(city);
    const one = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    const two =  '&units=metric&appid=9e4a17e4c70309cd53b8dc8bfe8cdd96';
    const API = one + city + two;

    fetch(API)
    // .then(response=>response.json())
    axios.get(API)
        .then((response) => {
            console.log(response);
            this.setState({
              isLoading: true,
              result: response.data,
              list: response.data.list  
        });
        console.log(response.data);
        },
        (error) => {
            this.setState({
            isLoading: true,
            error
            });
        }
        );       
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

  search = (result) => {
    this.setState({
            isLoading: true,
            result: result,
            list: result.list  
          });
          console.log(result);
          console.log(result.list);
          
  }
  
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

            <div className="view intro-2">
                <div className="full-bg-img">
                  <div className="mask rgba-black-strong flex-center">
                    <div className="container">
                      <div className="text-light text-center header-text">
                        <h3>Current weather conditions and detailed weather forecast for all cities in the world on WEATHER FORECAST!</h3>
                      <Search search={this.search} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

           
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