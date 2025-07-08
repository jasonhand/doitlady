# Do it lady!

This is a playful web app that emulates a classic dot-matrix printer experience, complete with animated paper feed, punch holes, and retro ASCII-art images. Each time you click the button, the paper scrolls up as if printing a new line, and a random motivational quote from "Chit" appears to the right.

## Features
- **Animated Dot-Matrix Paper:** The ASCII art image starts off-screen and scrolls up line-by-line with each button click, just like a real printer.
- **Pink Pony Club Theme:** Features a charming pony image and "Welcome to the Club" branding for a fun, retro aesthetic.
- **Random Quotes:** Each click shows a new quote from a curated list of "Chit chat" - memorable sayings from the legend Chit. Once all quotes are shown, they cycle through again.
- **Datadog Integration:** 
  - Real User Monitoring (RUM) is embedded to track user interactions and performance
  - "Try Datadog" link appears during the experience, opening the Datadog app in a new tab
- **Retro Visuals:** Includes dot-matrix style ASCII-art images, punch holes down the sides, and a printer base at the bottom for extra realism.
- **Responsive Design:** The layout adapts to different screen sizes while maintaining the printer aesthetic.
- **Infinite Scrolling:** The paper content dynamically extends as you scroll, creating a never-ending printing experience.

## How It Works
1. **Start:** Open `index.html` in your browser. The paper and ASCII art start off the bottom of the screen.
2. **Print Effect:** Click the "PRINT" button to "print" a new line and reveal a new quote. The paper scrolls up with each click.
3. **Quote Cycling:** After all quotes are shown, the system resets and starts showing quotes again in a new random order.
4. **Datadog Link:** The "Try Datadog" link becomes visible as you scroll through the content, providing easy access to the Datadog platform.
5. **Repeat:** The experience can be repeated as many times as you like - the paper content extends infinitely.

## Technical Details
- **Datadog RUM:** Real User Monitoring is configured to track user interactions, performance metrics, and session replay data.
- **Dynamic Content:** The paper content is generated dynamically as needed, allowing for infinite scrolling.
- **Smooth Animations:** CSS transitions provide smooth, realistic printer-like movement.
- **No Dependencies:** Pure HTML, CSS, and JavaScript - no external libraries required.

## How to Run
- No installation needed! Just open `index.html` in any modern web browser.

## Customization
- **Quotes:** Edit the `quotes` array in `script.js` to change the "Chit chat" messages.
- **ASCII Art:** Replace `ascii-art.png` with your own image for a different look.
- **Pony Image:** Replace `PinkPonyClub.png` to change the club branding.
- **Printer Look:** Tweak the CSS for different paper/printer effects.
- **Datadog Configuration:** Modify the RUM settings in the HTML head section to customize monitoring.

## Datadog RUM Configuration
The app includes Datadog Real User Monitoring with the following settings:
- **Service:** do-it-lady
- **Environment:** prod
- **Session Sample Rate:** 100%
- **Session Replay Sample Rate:** 100%
- **Privacy Level:** mask-user-input

---
Enjoy your retro printing inspiration from the Pink Pony Club! 🦄✨
