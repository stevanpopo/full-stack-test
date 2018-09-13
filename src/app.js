import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import _ from 'lodash';
// import './scss/main.scss';

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
      <main className="container">
        <header className="header columns">
          <img src="http://pong.kano.me/assets/kano-logo.png" alt="Kano logo" />
          <h1 className="title is-1">PROJECT_TITLE</h1>
        </header>

        <section className="section columns is-centered">
          <form className="column is-half-desktop" onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Search</label>
              <div className="control">
                <input className="input" name="search" type="text" placeholder="Search..." onChange={this.handleChange} />
              </div>
            </div>
            <button className="button">Search</button>
          </form>
        </section>

        <div className="field">
          <label className="label">Filter</label>
          <div className="control">
            <div className="select">
              <select name="selected" onChange={this.handleChange}>
                <option>Select dropdown</option>
                <option>Time</option>
                <option>Title</option>
                <option>Likes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="columns is-multiline">
          {_.sortBy((this.state.filteredData? this.state.filteredData : this.state.data), [ this.state.selected ]).map(share =>
            <div className="card column is-one-quarter-desktop is-one-third-tablet" key={share.id}>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={share.cover_url} alt="Shared item image" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{share.title}</p>
                    <p className="subtitle is-6">{share.user.username}</p>
                    {share.likes.forEach(like => <p>{like}</p>)}
                  </div>
                </div>

                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec iaculis mauris.
                </div>
              </div>
            </div>
          )}
        </div>

      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
