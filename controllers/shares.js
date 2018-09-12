// No model needed as coming from API
// Just need a way to make calls to API and turn data over to client
const axios = require('axios');

function indexRoute(req, res, next){
  //API call
  axios({
    method: 'GET',
    url: 'http://api.kano.me/share?limit=100'
  })
    .then(data => res.json(data))
    .catch(next);
}

module.exports = {
  index: indexRoute
};
