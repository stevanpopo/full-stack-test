import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
// import './scss/main.scss';

import SharesIndex from './components/Index';
import SharesShow from './components/Show';

import 'bulma';

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
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log('err', err));
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value.toLowerCase() });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const searchRegEx = new RegExp(this.state.search, 'i');
    const filteredData = _.filter(this.state.data, (share) => searchRegEx.test(share.title));
    this.setState({ filteredData });
  }

  render() {
    console.log(this.state);
    if(!this.state.data) return <h1>Loading...</h1>;
    return (
      <BrowserRouter>
        <main className="container">
          <header className="header columns">
            <img src="http://pong.kano.me/assets/kano-logo.png" alt="Kano logo" />
            <h1 className="title is-1">PROJECT_TITLE</h1>
          </header>

          <Switch>
            <Route path="/:id" component={SharesShow} />
            <Route path="/" component={SharesIndex} />
          </Switch>

        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
