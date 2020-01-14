
var Twitter = require('twitter');

require('dotenv').config()

var Tweet = new Twitter({
  consumer_key:         process.env.BOT_CONSUMER_KEY,
  consumer_secret:      process.env.BOT_CONSUMER_SECRET,
  access_token_key:     process.env.BOT_ACESS_TOKEN,
  access_token_secret:  process.env.BOT_ACESS_TOKEN_SECRET,
});




    function retweet(event) {
      // console.log(event)
      var Tweetlocation = event.user.location
      var TweetId = event.id_str
      // console.log(TweetId)
      var Tweeter = event.user.name
      if(Tweetlocation !== null && event.is_quote_status !== true){
        Tweet.post(`statuses/retweet/${TweetId}`, function(err){
          if(err){
            if(err[0].code == 327){
              return
            }else {
              console.log('deu erro no retweet:')
              console.log(err)
            }
  
          }else {
            console.log('RETWEETADO: ',  `https://twitter.com/${Tweeter}/status/${TweetId}`)
          }
        })
      }else {
        return 
      }

    }

    var stream = Tweet.stream('statuses/filter', {track: 'Sorriso'})

    stream.on('data', retweet)

    stream.on('error', function(error) {
      console.log(error)
    })


