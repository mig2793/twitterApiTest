const express = require('express');
const Twitter = require('twit');
const url = require('url');

const app = express();

const client = new Twitter({
  consumer_key: 'ZG5zCR07OZ5tOQu2FssHStHaP',
  consumer_secret: '8XMVhF7jQ3jd8QEjBxE8MsPXPICRv3og78N7SFKVtXwMFs9vd0',
  access_token: '1326303309993533441-GLU8sQZ1p9oEBmmpTS3gOKhXoYtNH5',
  access_token_secret: 'YD1Lj5Z37tHL6ZHEHDe9Jf9Qg93Tlfj0q9tJAWC72B3ST'
});


app.use(require('cors')());

app.use(require('body-parser').json());

app.get('/twitters', (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  let tweet = {
    q: queryObject.q,
    count: queryObject.count,
    max_id: queryObject.max_id != undefined ? queryObject.max_id : "",
    include_entities: 1,
    tweet_mode: "extended"
  };
  client
    .get('search/tweets', tweet)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.send(error);
    });
})

app.get('/retweet-me', (req, res) => {
  client
    .get('statuses/retweets_of_me')
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.send(error);
    });
});

app.get('/favorite-me', (req, res) => {
  client
    .get('favorites/list')
    .then(response => {
      res.send(response);
    })

    .catch(error => {
      res.send(error);
    });
});

app.post('/favorite', (req, res) => {
  tweet = { id: req.body.id };
  client
    .post('favorites/create', tweet)
    .then(response => {
      res.send(response);
    })

    .catch(error => {
      res.send(error);
    });
});

app.post('/favorite-destroy', (req, res) => {
  tweet = { id: req.body.id };
  client
    .post('favorites/destroy', tweet)
    .then(response => {
      res.send(response);
    })

    .catch(error => {
      res.send(error);
    });
});

app.post('/retweet', (req, res) => {
  tweet = { id: req.body.id };
  console.log(tweet);
  client
    .post('statuses/retweet', tweet)
    .then(response => {
      res.send(response);
    })

    .catch(error => {
      res.send(error);
    });
});

app.listen(3000, () => console.log('Server running'));



