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

### Adding a listing
Add an object to the `LISTINGS` array at the top of `app.js` with a new `id`. Use `price: 0` for free items and `price: null` for posts with no price (discussions, community posts). `condition` is optional and only shows when set.

## Editing
Open the repo on github.com and press `.` to edit in the browser, or clone it and open the folder in VS Code. Changes pushed to `main` go live in about a minute.

### After editing `styles.css` or `app.js`
Every page loads them as `styles.css?v=…` and `app.js?v=…`. When you change either file, bump that number in all the `.html` files (any new number works) so browsers download the new version instead of reusing an old cached copy.
