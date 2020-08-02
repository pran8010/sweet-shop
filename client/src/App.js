import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      tes: ''
    }
  }

  componentDidMount(){

    fetch('test1')
      .then(res => res.json())
      .then(tes => this.setState(tes),console.log('setState',this.state.tes))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
            <br></br>
            {this.state.tes + ' world'}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  
  }

}
export default App;
