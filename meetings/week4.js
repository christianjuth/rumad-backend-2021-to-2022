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

function getTweet(id) {
  return tweets.find(t => t.id === id)
}

function deleteTweet(id) {
  let foundTweet = false

  tweets = tweets.filter(tweet => {
    if (tweet.id === id) {
      foundTweet = true
      return false
    }
    return true
  }) 

  return foundTweet
}

function updateTweet(id, { msg }) {
  const tweet = getTweet(id);

  if (tweet === undefined) {
    return false;
  }

  tweet.msg = msg;

  return true;
}

function createErrorMsg(msg) {
  return {
    error: msg
  }
}

function createMsg(msg) {
  return {
    msg
  }
}

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
app.delete('/tweets/:id', function(req, res) {
  const id = req.params.id;
  const foundTweet = deleteTweet(id);

  if (foundTweet === false) {
    res.status(404);
    res.send(createErrorMsg(`tweet with id "${id}" not found`));
    return;
  }
  res.send(createMsg(`deleted tweet with id "${id}"`));
})

/**
 * Get single tweet
 */
app.get('/tweets/:id', (req, res) => {
  const { id } = req.params
  const tweet = getTweet(id)

  if (tweet === undefined) {
    res.status(404);
    res.send(createErrorMsg(`tweet with id "${id}" not found`));
    return;
  }

  res.send(tweet);
})

/**
 * Update tweet
 */
app.put('/tweets/:id', (req, res) => {
  const { id } = req.params
  const { msg } = req.body

  const foundTweet = updateTweet(id, { msg })

  if (foundTweet === false) {
    res.status(404);
    res.send(createErrorMsg(`tweet with id "${id}" not found`));
    return;
  } 

  res.send(createMsg(`updated tweet with id ${id}`));
})
 
app.listen(3000);