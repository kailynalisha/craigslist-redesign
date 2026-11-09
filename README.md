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

## Assignment 12 – Form Validation & User Feedback

### Where to find the form
Click **Log in / Sign up** in the desktop header (or in the ☰ mobile menu). Pressing **Send** on the Contact Seller page also opens it if you aren't signed in. Use the **Sign up** tab to see all five fields: first name, last name, email, password and confirm password.

> Prototype only: no real accounts are created. The profile lives in this browser tab's session storage, and passwords are never saved.

### How validation works
- **Real time, not on submit.** Errors show when you leave a field (blur). After that, the field re-checks on every keystroke, so the error goes away as soon as you fix it. While you're still typing in a field for the first time, you only see positive feedback, never an error.
- **Inline, next to the field.** Each message appears directly under its input. There are no alert boxes or error lists at the top of the page.
- **Visual cues.** Invalid fields get a red border, a ⚠ message and a red "!" icon. Valid fields get a green border, a green ✓ icon and a success message (for example "Valid email address." or "Passwords match.").
- **Live password checklist.** Each rule (8+ characters, a letter, a number) turns green with a ✓ as soon as it's met.
- **Submit as a safety net.** If you press Sign up / Log in early, every field is checked, each problem is shown inline, focus jumps to the first one, and a short note says how many fields need fixing.

### Rules and example messages
| Field | Checks | Example messages |
|---|---|---|
| First / last name | required, 2–40 chars, letters/spaces/hyphens/apostrophes | "Last name needs at least 2 letters." / "First name can only use letters, spaces, hyphens (-) or apostrophes (')." |
| Email | required, no spaces, exactly one @, text before and after @, full domain, 2+ letter ending | "Your email is missing an "@". Use a format like name@example.com." / ""gmail" isn't a complete domain. It needs a dot and an ending, like example.com." |
| Password (sign up) | required, no spaces, 8+ characters, a letter, a number | "Password must be at least 8 characters. Add 4 more." / "Add at least one number (0–9) to your password." |
| Confirm password | required, must match (re-checked live if the password changes) | "Passwords don't match. Re-type the same password you entered above." |
| Email (log in) | must match the account created in this tab | "We couldn't find an account with this email in this browser session. Check for typos, or choose "Sign up" above to create one." |

### Quick demo script
1. Open **Log in / Sign up**, then choose **Sign up**.
2. Type `K` in First name and press Tab: an inline error appears. Type `ailyn`: it turns green ("Looks good!").
3. Type `kailyn`, `kailyn@`, `kailyn@gmail` and `kailyn@gmail.com` in Email. Each one gets its own specific message.
4. Type a password slowly and watch the checklist fill in.
5. Enter a different confirm password to see the mismatch error, then fix it.
6. Press **Sign up**. Your name appears in the header.
7. Sign out, open **Log in**, and press **Log in** with empty fields to see the submit safety net.

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
