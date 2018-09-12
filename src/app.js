import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
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

  render() {
    console.log(this.state);
    if(!this.state.data) return <h1>Loading...</h1>;
    return (
      <main className="container">
        <h1 className="title is-1">PROJECT_TITLE</h1>
        <div className="columns is-multiline">
          {this.state.data.map(share =>

            <div className="card column is-one-quarter-desktop is-one-third-tablet" key={share.id}>
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={share.cover_url} alt="Placeholder image" />
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
