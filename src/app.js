import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import './scss/main.scss';

class App extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    axios({
      method: 'GET',
      url: '/api/shares/'
    })
      .then(res => console.log(res))
      .then(err => console.log(err));
  }

  render() {
    // console.log(this.state);
    return (
      <main>
        <h1>PROJECT_TITLE</h1>
      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
