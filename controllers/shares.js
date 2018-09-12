// No model needed as coming from API
// Just need a way to make calls to API and turn data over to client
const axios = require('axios');

function indexRoute(req, res, next){
  //API call
  axios({
    method: 'GET',
    url: 'http://api.kano.me/share?limit=100'
  })
    .then(results => {
      console.log(results.data.entries);
      res.send(results.data.entries);
    })
    .catch(next);
}

module.exports = {
  index: indexRoute
};
