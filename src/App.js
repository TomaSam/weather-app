import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import Forecast from './components/Forecast';
import Footer from './components/Footer';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Forecast />
        <Footer />
      </div>
    )
  }
  
}

export default App;
