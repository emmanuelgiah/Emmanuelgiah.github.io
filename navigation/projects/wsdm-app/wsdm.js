// WSDM - Wisdom Quote App - Refactored
const QUOTE_API_URL = "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const QUOTE_REFRESH_INTERVAL = 6000;
const MAX_QUOTE_WORDS = 20;

let quotes = [];

// Initialize app
async function init() {
	try {
		await fetchQuotes();
		displayRandomQuote();
		setInterval(displayRandomQuote, QUOTE_REFRESH_INTERVAL);
	} catch (error) {
		console.error('Failed to initialize WSDM:', error);
		displayError();
	}
}

// Fetch quotes from API
async function fetchQuotes() {
	try {
		const response = await fetch(QUOTE_API_URL);
		if (!response.ok) throw new Error('Failed to fetch quotes');
		
		const data = await response.json();
		quotes = data.quotes
			.filter(item => isQuoteValid(item.quote))
			.map(item => new Quote(item.quote, item.author));
		
		if (quotes.length === 0) {
			throw new Error('No valid quotes found');
		}
	} catch (error) {
		console.error('Error fetching quotes:', error);
		throw error;
	}
}

// Validate quote length
function isQuoteValid(quoteText) {
	const wordCount = quoteText.split(' ').length;
	return wordCount <= MAX_QUOTE_WORDS;
}

// Display random quote
function displayRandomQuote() {
	if (quotes.length === 0) return;
	
	const randomIndex = Math.floor(Math.random() * quotes.length);
	const selectedQuote = quotes[randomIndex];
	
	updateDOM(selectedQuote);
}

// Update DOM elements
function updateDOM(quote) {
	const quoteElement = document.getElementById('quotePlaceHolder');
	const authorElement = document.getElementById('authorPlaceHolder');
	const linkElement = document.getElementById('authorQuery');
	
	if (quoteElement) quoteElement.textContent = `"${quote.getQuote()}"`;
	if (authorElement) authorElement.textContent = `— ${quote.getAuthor()}`;
	if (linkElement) {
		const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(quote.getAuthor())}`;
		linkElement.setAttribute('href', wikiUrl);
	}
}

// Display error message
function displayError() {
	const quoteElement = document.getElementById('quotePlaceHolder');
	if (quoteElement) {
		quoteElement.textContent = 'Unable to load quotes. Please refresh the page.';
	}
}

// Start the app
init();
