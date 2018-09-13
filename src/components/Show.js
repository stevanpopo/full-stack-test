import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
// import './scss/main.scss';

import 'bulma';

class SharesShow extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    axios({
      method: 'GET',
      url: `/api/shares/${this.props.match.params.id}`
    })
      .then(res => {
        console.log(res.data);
        this.setState({ share: res.data });
      })
      .catch(err => console.log('err', err));
  }

  render() {
    console.log(this.state);
    if(!this.state.share) return <h1>Loading...</h1>;
    return (
      <div>
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={this.state.share.image} alt="Shared item image" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.state.share.title}</p>
                <p className="subtitle is-6">{this.state.share.username}</p>
                <p className="subtitle is-6">{this.state.share.likes}</p>
              </div>
            </div>
            <div className="content">{this.state.share.description}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default SharesShow;
