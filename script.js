// Array of quotes
const quotes = [
    "Do it lady!",
    "Yeah, Yeah",
    "Back to it then",
    "Casual Friday",
    "Happy Birthday Janus!",
    "Prevention is the best medicine",
    "Is there a black purse in here?",
    "Any more questions?",
    "Let's crunch some numbers",
    "lfkadsf;lkjasdf;ljasdf;lk"
];

let shownQuotes = [];
let datadogTimeout = null;

// Get DOM elements
const quoteText = document.getElementById('quote-text');
const newQuoteBtn = document.getElementById('new-quote-btn');
const asciiArtContainer = document.querySelector('.ascii-art-container');
let paperOffset = 0;
let PAPER_LINE_HEIGHT = 32; // px per line feed (will be recalculated)

function calculateInitialOffset() {
    const container = asciiArtContainer;
    if (!container) return 0;
    return container.clientHeight;
}

function calculateLineHeight() {
    const container = asciiArtContainer;
    if (!container) return 0;
    return container.clientHeight / quotes.length;
}

function setPaperOffset(offset) {
    asciiArtContainer.style.setProperty('--paper-offset', offset + 'px');
}

function resetPaperOffset() {
    // Recalculate line height and initial offset
    PAPER_LINE_HEIGHT = calculateLineHeight();
    paperOffset = calculateInitialOffset();
    setPaperOffset(paperOffset);
}

function advancePaper() {
    paperOffset -= PAPER_LINE_HEIGHT;
    setPaperOffset(paperOffset);
}

// Function to get a random quote
function getRandomQuote() {
    // Filter out already shown quotes
    const availableQuotes = quotes.filter(q => !shownQuotes.includes(q));
    if (availableQuotes.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    return availableQuotes[randomIndex];
}

// Function to display a new quote
function displayNewQuote() {
    // If all quotes have been shown, change button to Datadog and set quote
    if (shownQuotes.length === quotes.length) {
        quoteText.textContent = "Let's monitor";
        newQuoteBtn.textContent = 'Try Datadog';
        newQuoteBtn.onclick = () => {
            if (datadogTimeout) clearTimeout(datadogTimeout);
            window.open('https://app.datadoghq.com', '_blank');
            window.location.reload();
        };
        // Start 5s timeout to revert
        if (datadogTimeout) clearTimeout(datadogTimeout);
        datadogTimeout = setTimeout(() => {
            shownQuotes = [];
            newQuoteBtn.textContent = 'Yeah?';
            newQuoteBtn.onclick = displayNewQuote;
            resetPaperOffset();
            displayNewQuote();
        }, 5000);
        return;
    }
    if (datadogTimeout) clearTimeout(datadogTimeout);
    const quote = getRandomQuote();
    if (!quote) return;
    quoteText.textContent = quote;
    
    // Add a subtle animation effect
    quoteText.style.opacity = '0';
    setTimeout(() => {
        quoteText.textContent = quote;
        quoteText.style.opacity = '1';
    }, 150);
    shownQuotes.push(quote);
    advancePaper();
    // If this was the last quote, update button and quote
    if (shownQuotes.length === quotes.length) {
        setTimeout(() => {
            quoteText.textContent = "Let's monitor";
            newQuoteBtn.textContent = 'Try Datadog';
            newQuoteBtn.onclick = () => {
                if (datadogTimeout) clearTimeout(datadogTimeout);
                window.open('https://app.datadoghq.com', '_blank');
                window.location.reload();
            };
            // Start 5s timeout to revert
            if (datadogTimeout) clearTimeout(datadogTimeout);
            datadogTimeout = setTimeout(() => {
                shownQuotes = [];
                newQuoteBtn.textContent = 'Yeah?';
                newQuoteBtn.onclick = displayNewQuote;
                resetPaperOffset();
                displayNewQuote();
            }, 5000);
        }, 200); // after fade in
    }
}

// Event listener for the button
newQuoteBtn.addEventListener('click', displayNewQuote);

// Display initial quote when page loads
document.addEventListener('DOMContentLoaded', () => {
    shownQuotes = [];
    newQuoteBtn.textContent = 'Yeah?';
    newQuoteBtn.onclick = null;
    // Wait for layout
    setTimeout(() => {
        resetPaperOffset();
        displayNewQuote();
    }, 50);
});

// Recalculate on window resize
window.addEventListener('resize', () => {
    resetPaperOffset();
}); 