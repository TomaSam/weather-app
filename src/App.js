import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import Forecast from './components/Forecast';
import Footer from './components/Footer';
import Search from './components/Search';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        {/* <Search /> */}
        <Forecast />
        <Footer />
      </div>
    )
  }
  
}

export default App;
