
var Twitter = require('twitter');

require('dotenv').config()

var Tweet = new Twitter({
  consumer_key:         process.env.consumer_key,
  consumer_secret:      process.env.consumer_secret,
  access_token_key:     process.env.acess_token_key,
  access_token_secret:  process.env.acess_token_secret,
});




    function retweet(event) {
      var TweetId = event.id_str
      console.log(TweetId)
      var Tweeter = event.user.screenName
      Tweet.post(`statuses/retweet/${TweetId}`, function(err){
        if(err){
          console.log('deu erro no retweet:')
          console.log(err)

        }else {
          console.log('RETWEETADO: ',  `https://twitter.com/${Tweeter}/status/${TweetId}`)
        }
      })

    }

    var stream = Tweet.stream('statuses/filter', {track: 'Sorriso testeteste'})

    stream.on('data', retweet)

    stream.on('error', function(error) {
      console.log(error)
    })


