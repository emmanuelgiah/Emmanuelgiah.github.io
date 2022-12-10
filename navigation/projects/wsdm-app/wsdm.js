const link1 = "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

var quotes = [];
//generate random number in range
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//pull a random quote from the array
function changeQuote() {
    let index = getRandomInt(quotes.length);
    //reset
    document.getElementById("quotePlaceHolder").innerHTML = "";
    document.getElementById("authorPlaceHolder").innerHTML = "";
    //change
    document.getElementById("quotePlaceHolder").innerHTML = quotes[index].getQuote();
    document.getElementById("authorPlaceHolder").innerHTML = quotes[index].getAuthor();
    //modify the link
    let wiki = "https://en.wikipedia.org/wiki/" + quotes[index].getAuthor();
    document.getElementById("authorQuery").setAttribute("href", wiki);
}

//quote formatting 
function quoteFilter(quote) {
    var quoteLength = quote.split(" ").length;
    if (quoteLength <= 25)  {
        return true;
    }
    return false;
}

//getting the quotes from the first source 
function getQuote() {
    $.getJSON(link1, function( data ) {
        let json = $.each(data, function(key, val) {});
        temp = json.quotes;
        //format json as objects
        for (var i = 0; i < temp.length; i++) {
            if (quoteFilter(temp[i].quote)) {
                quotes.push(new Quote(temp[i].quote, temp[i].author));
            }
        }
        changeQuote();
    });
}

getQuote()
setInterval(getQuote, 6000);