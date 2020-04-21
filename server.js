
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
      const {retweeted_status, id_str, screen_name, is_quote_status} = event
      const {location, name} = event.user;
      // console.log(TweetId)
      if(location !== null && !retweeted_status && !is_quote_status){
        Tweet.post(`statuses/retweet/${id_str}`, function(err){
          if(err){
            if(err[0].code == 327){
              return
            }else {
              console.log('deu erro no retweet: ' + err[0].message)
            }
  
          }else {
            console.log('RETWEETADO: ',  `https://twitter.com/${name}/status/`+id_str)
          }
        })
        Tweet.post('favorites/create', {id: id_str}, err => {
          if (err){
            return console.log("Erro no like: " + err)
          }
          return console.log("Tweet Likado. URL do Tweet: " + `https:twitter.com/${screen_name}/status/${id_str}`)
        })
      
      }else {
          return 
        }
    }
    // function like(data) {
    //   const {retweeted_status, id_str} = data;
    //   const {screen_name} = data.user;
    //   if(!retweeted_status){
    //     Tweet.post('favorites/create', {id: id_str}, err => {
    //       if (err){
    //         return console.log("Erro no like: " + err)
    //       }
    //       return console.log("Tweet Likado. URL do Tweet: " + `https:twitter.com/${screen_name}/status/${id_str}`)
    //     })
    //   }
    // }

    var stream = Tweet.stream('statuses/filter', {track: 'Sorriso'})
    // var streamLikes = Tweet.stream('statuses/filter', {track: 'sorriso bot'})

    stream.on('data', retweet)
    // streamLikes.on('data', like)

    stream.on('error', err => console.log("Erro: " + err))
    // streamLikes.on('error', err => console.log("Erro: " + err))


