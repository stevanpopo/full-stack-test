// No model needed as coming from API
// Just need a way to make calls to API and turn data over to client
const axios = require('axios');
const _ = require('lodash');

let allResults = undefined;

function indexRoute(req, res, next){
  //API call
  axios({
    method: 'GET',
    url: 'http://api.kano.me/share?limit=100'
  })
    .then(results => {
      // console.log(results.data.entries);
      allResults = results.data.entries;
      const filteredResults = results.data.entries.map(share => {
        return {
          id: share.id,
          title: share.title,
          image: share.cover_url,
          likes: share.likes.length,
          username: share.user.username,
          description: share.description
        };
      });
      res.send(filteredResults);
    })
    .catch(next);
}

function showRoute(req, res, next){
  // console.log('hit show route', req.params.id);
  let share = _.find(allResults, { id: req.params.id });
  share = {
    id: share.id,
    title: share.title,
    image: share.cover_url,
    likes: share.likes.length,
    username: share.user.username,
    description: share.description
  };
  res.send(share);
}

module.exports = {
  index: indexRoute,
  show: showRoute
};
