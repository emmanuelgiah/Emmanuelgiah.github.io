// WSDM - Wisdom Quote App - Refactored
const QUOTE_API_URL_1 = "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const QUOTE_API_URL_2 = "https://raw.githubusercontent.com/AtaGowani/daily-motivation/refs/heads/master/src/data/quotes.json";
const QUOTE_REFRESH_INTERVAL = 11000; // 11 seconds (was 6 seconds)
const MAX_QUOTE_WORDS = 30;

let quotes = [];
let isFirstLoad = true; // No longer needed but keeping for potential future use

// Initialize app
async function init() {
	try {
		// Set initial blue background
		setBackgroundColor(10, 50, 75);
		
		await fetchQuotes();
		displayRandomQuote();
		setInterval(displayRandomQuote, QUOTE_REFRESH_INTERVAL);
		
		// Perpetual color fade: trigger new color every 6 seconds
		// With 8-second transition, it never fully settles before next color starts
		setInterval(() => {
			const color = generateMutedColor();
			setBackgroundColor(color.r, color.g, color.b);
		}, 6000);
	} catch (error) {
		console.error('Failed to initialize WSDM:', error);
		displayError();
	}
}

// Generate muted random background color (brightened by 25% + expanded by 3%)
function generateMutedColor() {
	const r = Math.floor(Math.random() * 45) + 20;  // 20-65 (was 20-60)
	const g = Math.floor(Math.random() * 35) + 15;  // 15-50 (was 15-45)
	const b = Math.floor(Math.random() * 55) + 30;  // 30-85 (was 30-80)
	return { r, g, b };
}

// Set background color with smooth transition
function setBackgroundColor(r, g, b) {
	// 4-second transition for smooth, visible color changes
	document.body.style.transition = 'background-color 4s ease-in-out';
	document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// Fetch quotes from both APIs and combine
async function fetchQuotes() {
	try {
		// Fetch from both sources
		const [response1, response2] = await Promise.all([
			fetch(QUOTE_API_URL_1),
			fetch(QUOTE_API_URL_2)
		]);
		
		if (!response1.ok || !response2.ok) throw new Error('Failed to fetch quotes');
		
		const data1 = await response1.json();
		const data2 = await response2.json();
		
		// Extract quotes from both sources (different structures)
		const quotes1 = data1.quotes || [];
		const quotes2 = data2 || [];
		
		// Combine all quotes
		const allQuotes = [...quotes1, ...quotes2];
		
		// Remove duplicates based on quote text (case-insensitive)
		const uniqueQuotes = [];
		const seenQuotes = new Set();
		
		for (const item of allQuotes) {
			const quoteText = item.quote.toLowerCase().trim();
			if (!seenQuotes.has(quoteText) && isQuoteValid(item.quote)) {
				seenQuotes.add(quoteText);
				uniqueQuotes.push(item);
			}
		}
		
		// Map to Quote objects
		quotes = uniqueQuotes.map(item => new Quote(item.quote, item.author));
		
		if (quotes.length === 0) {
			throw new Error('No valid quotes found');
		}
		
		console.log(`Loaded ${quotes.length} unique quotes`);
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
