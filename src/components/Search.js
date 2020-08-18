import React, {Component} from 'react';
//import Forecast from './Forecast';

const one = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const two =  '&units=metric&appid=';
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
            <div>
                <div className="search">
                    <form onSubmit={this.submitForm} className="">
                        <input name="input" className="form-control input-city" type="search" 
                        placeholder="Search by city..." aria-label="Search"
                        onChange={this.inputChange} />
                        <button type="submit" className="btn btn-secondary search-button">Search</button>
                    </form>       
                </div>
                {/* <Forecast search={this.state.result} /> */}
            </div>
        )
 
    }

}

export default Search;