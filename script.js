// Array of quotes
const quotes = [
    "Do it lady!",
    "All of it",
    "All the time",
    "Yeah, Yeah",
    "Back to it then",
    "Casual Friday",
    "Happy Birthday Janus!",
    "Prevention is the best medicine",
    "Is there a black purse in here?",
    "Any more questions?",
    "Let's crunch some numbers",
    "lfkadsf;lkjasdf;lj",
    "Pulled some strings and got'em a job in IT",
    "He is a firecracker",
    "Over the shoulder",
    "Success",
    "Got'er"
];

let shownQuotes = [];

// Get DOM elements
const quoteText = document.getElementById('quote-text');
const newQuoteBtn = document.getElementById('new-quote-btn');
const asciiArtContainer = document.querySelector('.ascii-art-container');
const paperContent = document.querySelector('.paper-content');
const datadogLink = document.querySelector('.datadog-link');
const mainImageGroup = document.getElementById('main-image-group');
const mainAsciiArt = document.getElementById('main-ascii-art');

// Printer state
let paperOffset = 0;
let containerOffset = 300; // Container starts even closer to printer base
let PAPER_LINE_HEIGHT = 65; // px per line feed - realistic dot matrix speed
let containerHeight = 0;
let currentContentHeight = 11000; // Track current content height
let nextGroupId = 9; // Next image group to create

function initializePrinter() {
    if (!asciiArtContainer || !paperContent) return;
    
    containerHeight = asciiArtContainer.clientHeight;
    
    // Start with container and paper hidden
    paperOffset = 0;
    containerOffset = 300; // Container starts even closer to printer base
    setContainerOffset(containerOffset);
    setPaperOffset(paperOffset);
}

function setContainerOffset(offset) {
    if (asciiArtContainer) {
        asciiArtContainer.style.setProperty('--container-offset', `${offset}px`);
    }
}

function setPaperOffset(offset) {
    if (paperContent) {
        paperContent.style.setProperty('--paper-offset', `${-offset}px`);
    }
}

function createImageGroup(groupId, topPosition) {
    const imageGroup = document.createElement('div');
    imageGroup.className = 'paper-image-group';
    imageGroup.id = `repeat-image-group-${groupId}`;
    imageGroup.style.position = 'absolute';
    imageGroup.style.width = '800px';
    imageGroup.style.height = '1100px';
    imageGroup.style.top = `${topPosition}px`;
    imageGroup.style.left = '0';
    
    // Create holes
    const holesLeft = document.createElement('div');
    holesLeft.className = 'holes holes-left';
    const holesRight = document.createElement('div');
    holesRight.className = 'holes holes-right';
    
    for (let i = 0; i < 20; i++) {
        const holeLeft = document.createElement('div');
        holeLeft.className = 'hole';
        holesLeft.appendChild(holeLeft);
        
        const holeRight = document.createElement('div');
        holeRight.className = 'hole';
        holesRight.appendChild(holeRight);
    }
    
    // Create ASCII art image
    const img = document.createElement('img');
    img.src = 'ascii-art.png';
    img.alt = 'ASCII Art';
    img.className = 'ascii-art';
    img.id = `repeat-ascii-art-${groupId}`;
    img.style.position = 'absolute';
    img.style.left = '0';
    img.style.width = '800px';
    img.style.height = '1100px';
    img.style.display = 'block';
    img.style.zIndex = '1';
    img.style.top = '0';
    img.style.objectFit = 'cover';
    
    imageGroup.appendChild(holesLeft);
    imageGroup.appendChild(holesRight);
    imageGroup.appendChild(img);
    
    return imageGroup;
}

function createTextSection(topPosition) {
    const textSection = document.createElement('div');
    textSection.className = 'paper-text-section';
    textSection.style.position = 'absolute';
    textSection.style.width = '800px';
    textSection.style.height = '1100px';
    textSection.style.top = `${topPosition}px`;
    textSection.style.left = '0';
    textSection.style.background = 'white';
    textSection.style.display = 'flex';
    textSection.style.alignItems = 'center';
    textSection.style.justifyContent = 'center';
    
    // Create holes
    const holesLeft = document.createElement('div');
    holesLeft.className = 'holes holes-left';
    const holesRight = document.createElement('div');
    holesRight.className = 'holes holes-right';
    
    for (let i = 0; i < 20; i++) {
        const holeLeft = document.createElement('div');
        holeLeft.className = 'hole';
        holesLeft.appendChild(holeLeft);
        
        const holeRight = document.createElement('div');
        holeRight.className = 'hole';
        holesRight.appendChild(holeRight);
    }
    
    // Create text content
    const textDiv = document.createElement('div');
    textDiv.className = 'dot-matrix-text';
    textDiv.innerHTML = `
        <p>Brought to you w/ &lt;3 from j:hand</p>
        <p>=====================================</p>
        <p>* Pink Pony Club Dot Matrix Printer *</p>
        <p>=====================================</p>
        <p>Thank you for printing with us!</p>
    `;
    
    textSection.appendChild(holesLeft);
    textSection.appendChild(holesRight);
    textSection.appendChild(textDiv);
    
    return textSection;
}

function extendContent() {
    if (!paperContent) return;
    
    // Add 5 more image groups
    for (let i = 0; i < 5; i++) {
        const imageGroup = createImageGroup(nextGroupId, currentContentHeight);
        paperContent.appendChild(imageGroup);
        currentContentHeight += 1100;
        nextGroupId++;
    }
    
    // Add text section
    const textSection = createTextSection(currentContentHeight);
    paperContent.appendChild(textSection);
    currentContentHeight += 1100;
    
    // Update paper content height
    paperContent.style.height = `${currentContentHeight}px`;
}

function advancePaper() {
    // Move container up to reveal it from bottom (first clicks bring it into view)
    if (containerOffset > 0) {
        containerOffset = Math.max(0, containerOffset - PAPER_LINE_HEIGHT);
        setContainerOffset(containerOffset);
    } else {
        // Once container is fully visible, advance the paper content
        paperOffset += PAPER_LINE_HEIGHT;
        
        // Check if we need to add more content (when we're within 3000px of the end)
        if (paperOffset > currentContentHeight - 3000) {
            extendContent();
        }
        
        setPaperOffset(paperOffset);
    }
    
    updateDatadogLinkVisibility();
}

function resetPrinter() {
    paperOffset = 0;
    containerOffset = 300;
    setContainerOffset(containerOffset);
    setPaperOffset(paperOffset);
    updateDatadogLinkVisibility();
}

function updateDatadogLinkVisibility() {
    if (!datadogLink) return;
    // Show link when paper has scrolled up enough (about 60% of container height)
    const scrollThreshold = containerHeight * 0.6;
    if (paperOffset >= scrollThreshold) {
        datadogLink.classList.add('visible');
    } else {
        datadogLink.classList.remove('visible');
    }
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
    const quote = getRandomQuote();
    if (!quote) {
        // If all quotes have been shown, reset just the quotes (keep paper scrolling)
        shownQuotes = [];
        displayNewQuote();
        return;
    }
    quoteText.textContent = `“${quote}”`;
    // Add a subtle animation effect
    quoteText.style.opacity = '0';
    setTimeout(() => {
        quoteText.textContent = `“${quote}”`;
        quoteText.style.opacity = '1';
    }, 150);
    shownQuotes.push(quote);
    advancePaper();
}

// Event listener for the button
newQuoteBtn.addEventListener('click', displayNewQuote);

// Display initial quote when page loads
document.addEventListener('DOMContentLoaded', () => {
    shownQuotes = [];
    newQuoteBtn.textContent = 'Yeah';
    newQuoteBtn.disabled = false;
    
    // Initialize the printer
    setTimeout(() => {
        initializePrinter();
        displayNewQuote();
    }, 100);
    
    // Also recalc on image load
    if (mainAsciiArt) {
        mainAsciiArt.onload = () => {
            initializePrinter();
        };
    }
});

// Recalculate on window resize
window.addEventListener('resize', () => {
    initializePrinter();
    updateDatadogLinkVisibility();
}); 