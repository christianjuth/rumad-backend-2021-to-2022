const express = require('express');
const uuid = require('uuid').v4;

const app = express();

/**
 * Body parsing middleware
 */
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/**
 * Creates tweet by adding uuid
 * to the tweet data given by user.
 */
function createTweet(config) {
  const { handle, msg } = config
  // This is the same as the following:
  // const handle = config.handle;
  // const msg = config.msg;

  return {
    handle,
    msg,
    id: uuid()
  };
}

let tweets = [
  createTweet({ 
    handle: 'lordsnipp', 
    msg: 'stay safe' 
  }),
]

/**
 * Add a new tweet to the top of the feed.
 */
app.post('/tweets', function (req, res) {
  const { handle, msg } = req.body
  // This is the same as the following:
  // const handle = req.body.handle
  // const msg = req.body.msg

  const tweet = createTweet({ handle, msg })
  tweets.unshift(tweet);
  res.send(tweet);
})

/**
 * Get a list (feed) of tweets posted by everyone.
 */
app.get('/tweets', function (req, res) {
  res.send(tweets);
})

/**
 * Deletes a tweet by its id
 */
app.delete('/tweets', function(req, res) {
  // let newTweets = tweets.filter(tweet => tweet.handle !== 'elonmusk')
  // tweets = newTweets
  // res.send(newTweets)
})
 
app.listen(3000);