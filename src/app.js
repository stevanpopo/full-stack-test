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
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log('err', err));
  }

  render() {
    console.log(this.state);
    if(!this.state.data) return <h1>Loading...</h1>;
    return (
      <main>
        <h1>PROJECT_TITLE</h1>
        {this.state.data.map(share =>
          <div key={share.id}>
            <h3>{share.title}</h3>
            <h4>{share.user.username}</h4>
            {share.likes.forEach(like => <p>{like}</p>)}
            <img src={share.cover_url} />
          </div>
        )}
      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
