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
      const filteredResults = results.data.entries.map(share => {
        return {
          id: share.id,
          title: share.title,
          image: share.cover_url,
          likes: share.likes.length,
          username: share.user.username
        };
      });
      res.send(filteredResults);
    })
    .catch(next);
}

module.exports = {
  index: indexRoute
};
