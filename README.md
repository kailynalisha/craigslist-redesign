# craigslist redesign

A responsive Craigslist redesign built from our high-fidelity Figma prototype (ITIS 4390 – Group 6).

**Live site:** https://kailynalisha.github.io/craigslist-redesign/

## Running locally
No dependencies, installs or build step are needed — it's plain HTML, CSS and JavaScript. You only need Python 3 (to serve the files) and a web browser.

1. Unzip the project and open the `craigslist-redesign` folder.
2. Open a terminal in that folder (in VS Code: **Terminal → New Terminal**).
3. Start a local web server:
   - **Windows (PowerShell):** `py -m http.server 8000`
   - **macOS / Linux:** `python3 -m http.server 8000`
4. Open **http://localhost:8000** in your browser (it loads `index.html`).
5. Stop the server with `Ctrl+C` in the terminal.

> Opening `index.html` by double-clicking also works for most features, but use the server above so every page behaves exactly as intended. The listing map and web fonts load from the internet; everything else works offline.

## Pages
- `index.html` – home / category dashboard
- `search.html` – search results with filters and sort
- `listing.html` – listing details with map
- `contact.html` – contact seller form
- `404.html` – shown for any broken link

`styles.css` holds the layout, light/dark colors and animations; `app.js` holds the listing data and all interactions. Icons and photos are in `assets/`.

## Assignment 12 - Form Validation & User Feedback
## Account prototype
Use **Log in / Sign up** in the desktop header or mobile menu to open the account dialog. Sign-up collects a first name, last name, email, password, and matching password confirmation. The profile is kept only in the current browser tab's session storage; passwords are compared for a match but never saved. Once signed in, the user's name appears in the account control; clicking it reveals options to log in/sign up or sign out. Signing out keeps the demo profile for the current tab so it can be used to log in again. Sending a seller message also prompts users to log in or sign up first. This is a front-end demonstration only: it does not create real accounts or authenticate users.

## Assignment 11 – Interactive search & micro-interactions

### 1. Client-side search with live suggestions
Try it from the search bar on any page.
- Suggestions update **on every keystroke** — no need to press Search. Matching text is highlighted in purple.
- Each suggestion shows the listing photo, price, category and neighborhood. Results are ranked (title starts with your text → title contains it → other matches).
- "In categories" rows jump straight to the search filtered to that category, with a match count.
- "See all N results" opens the full results page.
- **No results:** typing something with no matches (e.g. `zzz`) shows "No matches for …" with clickable suggestions to try instead.
- **Clearing the input** (✕ button or deleting the text) hides the suggestions.
- Keyboard: ↑/↓ to move through suggestions, Enter to open one, Esc to close.
- On the **search results page**, typing also filters the results grid live, updates the heading and URL, and clearing the input resets to the full list. The empty-results state explains what happened and offers a way back.

### 2. Loading indicators
The site has no backend, so async actions go through a small `fakeRequest()` helper in `app.js` that waits like a real request and **fails when the browser is offline** — so loading *and* error states are real and testable (DevTools → Network → Offline).
- **Search results:** animated progress bar + "Searching…" message + shimmering skeleton cards while listings load. If loading fails, the bar turns red and a "Try again" button appears.
- **Listing photos:** each card photo shows a shimmer placeholder and fades in once loaded.
- **Listing details:** skeleton shimmer for the title, price, description and address; Contact Seller buttons are disabled until the listing loads, then content fades in.
- **Map:** "Loading map…" spinner overlay until map tiles arrive; if they never load, a message points to "Open in Google Maps" instead of spinning forever.
- **Contact form:** on Send, the button is disabled and shows a spinner + "Sending…", and the message box locks so it can't be double-sent. On failure, an error appears, the typed message is kept, and the button becomes "Try again". On success, the confirmation dialog appears.

### 3. Micro-interactions (each has a purpose)
1. **Search field focus glow** – a soft ring eases in around the field so it's clear where you're typing.
2. **Suggestions drop-in** – the panel fades/slides down from the field, so new suggestions read as a response to typing.
3. **Suggestion highlight slide** – the hovered / arrow-key-selected suggestion slides right and tints, showing which one Enter will open.
4. **Card hover lift** – listing and category cards lift with a shadow on hover to show they're clickable.
5. **Staggered fade-in of results** – result cards rise in one after another, so the change from loading to results is easy to follow.
6. **Dialog pop-in + button press** – the "Message sent!" dialog scales in, and buttons shrink slightly when pressed for tactile feedback.

All animations are turned off automatically for users with "reduce motion" enabled in their system settings.
