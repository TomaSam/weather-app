import React, {Component} from 'react';
//import Forecast from './Forecast';

const one = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const two =  '&units=metric&appid=9e4a17e4c70309cd53b8dc8bfe8cdd96';
let city = '';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: '',
            result: {}
        }
    }

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        city = e.target.value;
        console.log(city);
    }

    submitForm = (event) => {
        console.log(city);
        const API = one + city + two;

        event.preventDefault();
        fetch(API)
        .then(response => response.json())
        .then((response) => {
            console.log(response);
            this.setState({
            result: response,
            list: response.list  
        });
        console.log(response);
        console.log(response.list);
        this.props.search(response);
        })       
    }

    render() {
        console.log(this.state.result);
       
        return (
                <div className="search">
                    <form onSubmit={this.submitForm} className="form-inline my-2 my-lg-0">
                        <input name="input" className="form-control mr-sm-2" type="search" 
                        placeholder="Search by city..." aria-label="Search"
                        onChange={this.inputChange} />
                        <button type="submit" className="btn btn-outline-secondary my-2 my-sm-0">Search</button>
                    </form>       
                </div>
        )
 
    }

}

export default Search;