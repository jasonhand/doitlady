# The internet's favorite new sketch comedy character Chit

This is a playful web app that emulates a classic dot-matrix printer experience, complete with animated paper feed, punch holes, and a retro ASCII-art image. Each time you click the button, the paper scrolls up as if printing a new line, and a random motivational quote appears to the right.

## Features
- **Animated Dot-Matrix Paper:** The image starts off-screen and scrolls up line-by-line with each button click, just like a real printer.
- **Random Quotes:** Each click shows a new quote from a curated list. Once all quotes are shown, the button invites you to try Datadog.
- **Datadog Integration:** After all quotes, the button changes to "Try Datadog" and opens the Datadog app in a new tab. If not clicked within 5 seconds, the app resets.
- **Retro Visuals:** Includes a dot-matrix style ASCII-art image, punch holes down the sides, and a printer base at the bottom for extra realism.
- **Responsive & No Cropping:** The image is always fully visible and never cropped, regardless of browser size.

## How It Works
1. **Start:** Open `index.html` in your browser. The paper and image start off the bottom of the screen.
2. **Print Effect:** Click the "Yeah?" button to "print" a new line and reveal a new quote. The paper scrolls up with each click.
3. **End of Quotes:** After all quotes are shown, the button changes to "Try Datadog". Clicking it opens Datadog in a new tab and resets the app. If not clicked in 5 seconds, the app resets automatically.
4. **Repeat:** The experience can be repeated as many times as you like.

## How to Run
- No installation needed! Just open `index.html` in any modern web browser.

## Customization
- **Quotes:** Edit the `quotes` array in `script.js` to change the motivational messages.
- **ASCII Art:** Replace `ascii-art.png` with your own image for a different look.
- **Printer Look:** Tweak the CSS for different paper/printer effects.

---
Enjoy your retro printing inspiration!
