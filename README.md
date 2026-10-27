# craigslist redesign

A responsive Craigslist redesign built from our high-fidelity Figma prototype (ITIS 4390 – Group 6).

**Live site:** https://kailynalisha.github.io/craigslist-redesign/

## Pages
- `index.html` – home / category dashboard
- `search.html` – search results with filters and sort
- `listing.html` – listing details
- `contact.html` – contact seller form
- `404.html` – shown by GitHub Pages for any broken link

`styles.css` holds the layout and light/dark colors; `app.js` holds the listing data and interactions. Icons, the favicon and the link-preview image are in `assets/`.

## Running locally
No dependencies or build step are required. Open the project folder in VS Code, start a terminal in the folder, and run in powershell:
```
py -m http.server 8000
```
Then open http://localhost:8000 and start at `index.html`. Stop the server with `Ctrl+C` in the terminal.