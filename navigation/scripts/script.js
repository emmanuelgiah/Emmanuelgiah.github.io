var Twit = require('twit');
var config = require('./config');
console.log(config);
var T = new Twit(config);
//console feedback
console.log("finding tweets.")
//search twitter for all tweets containing the word 'banana' since July 11, 2011
var params = { 
    q: 'elon musk since:2021-07-11', 
    count: 20 
};
T.get('search/tweets', params, getData);
//callback function print tweets to the console
function getData(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
    }
};
  