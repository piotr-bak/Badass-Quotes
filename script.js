const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const nextQuoteBtn = document.querySelector("#next-quote");
const spinner = document.querySelector("#spinner");

let apiQuotes = [];

const showLoadingSpinner = () => {
    spinner.hidden = false;
    quoteContainer.hidden = true;
};

const hideLoadingSpinner = () => {
    spinner.hidden = true;
    quoteContainer.hidden = false;
};

const newQuote = () => {
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (!quote.author) {
        authorText.textContent = "(Anonymous)";
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
};

// Get Quotes From API. If anything goes south, try to fecht 5 more times.
let errCount = 0;
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        hideLoadingSpinner();
    } catch (error) {
        console.log("Something went wrong!", error);
        ++errCount;
        if (errCount <= 5) {
            console.log("Trying again...");
            getQuotes();
        }
    }
}

// Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
};

nextQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load:
getQuotes();
