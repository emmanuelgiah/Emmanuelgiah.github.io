var Twit = require('twit');
var config = require('./config');
console.log(config);
var T = new Twit(config);
//load twitter api
const baseTwitterSearchUrl = 'https://api.twitter.com/1.1/search/tweets.json';
const defaultFetchOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
};
//test run
console.log("Hello World!");