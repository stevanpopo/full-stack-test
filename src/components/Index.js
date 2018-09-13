import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
// import './scss/main.scss';

import 'bulma';

class SharesIndex extends React.Component {
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
      <div>
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
          {_.orderBy((this.state.filteredData? this.state.filteredData : this.state.data), [this.state.selected], (this.state.selected==='likes'? ['desc']: ['asc'])).map(share =>
            <div className="card column is-one-quarter-desktop is-one-third-tablet" key={share.id}>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={share.image} alt="Shared item image" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <Link to={`/${share.id}`}>
                      <p className="title is-4">{share.title}</p>
                    </Link>
                    <p className="subtitle is-6">{share.username}</p>
                    <p className="subtitle is-6">{share.likes}</p>

                  </div>
                </div>

                <div className="content">{share.description}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SharesIndex;
