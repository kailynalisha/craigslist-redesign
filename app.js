/* =========================================================
   craigslist redesign — shared behavior for every page
   ========================================================= */

/* ---------- DATA ---------- */
const CATEGORIES = {
  "for-sale": { label: "For Sale", icon: "assets/icon-for-sale.svg" },
  services: { label: "Services", icon: "assets/icon-jobs.svg" },
  jobs: { label: "Jobs", icon: "assets/icon-jobs.svg" },
  community: { label: "Community", icon: "assets/icon-people.svg" },
  discussion: { label: "Discussion", icon: "assets/icon-people.svg" },
  events: { label: "Events", icon: "assets/icon-people.svg" },
};

// The first 12 listings come from the Figma search-result frames.
// price: number, 0 = "Free", null = no price (posts like discussions).
// condition is only shown for items that are for sale.
const LISTINGS = [
  {
    id: 1, title: "Scooter in progress!", heading: "Scooter", price: 120, category: "for-sale",
    area: "NoDa", posted: "2d ago", postedLong: "2 days ago", miles: 1, condition: "Fair",
    address: ["Near 36th St & N Davidson St", "Charlotte, NC 28205"], keywords: "scooter kick",
    description: [
      "Adult kick scooter that I started fixing up and never finished. New wheels and bearings are already on, but the grip tape is worn and the brake could use a tighter spring.",
      "Folds flat and fits in a car trunk. Great project if you like to tinker. Cash or Venmo, pickup only.",
    ],
  },
  {
    id: 2, title: "Bike", heading: "Hybrid commuter bike", price: 350, category: "for-sale",
    area: "Plaza Midwood", posted: "10h ago", postedLong: "10 hours ago", miles: 3, condition: "Good",
    address: ["Near Central Ave & The Plaza", "Charlotte, NC 28205"], keywords: "scooter bike bicycle commuter",
    description: [
      "Medium-frame hybrid bike, 21 speeds. Tuned up last spring, shifts smoothly and the tires hold air. Comes with a rear rack and front light.",
      "Selling because I moved closer to campus and walk everywhere now. Happy to let you take a test ride around the block.",
    ],
  },
  {
    id: 3, title: "Chair", heading: "Wooden kitchen chair", price: 5, category: "for-sale",
    area: "NoDa", posted: "11h ago", postedLong: "11 hours ago", miles: 1, condition: "Fair",
    address: ["Near N Davidson St & E 35th St", "Charlotte, NC 28205"], keywords: "scooter chair furniture",
    description: [
      "Solid wood kitchen chair. A few scratches on the seat but it is sturdy and does not wobble.",
      "Only one available. Porch pickup, just send a message first.",
    ],
  },
  {
    id: 4, title: "Snowboard", heading: "Snowboard with bindings", price: 500, category: "for-sale",
    area: "Uptown", posted: "2h ago", postedLong: "2 hours ago", miles: 4, condition: "Like new",
    address: ["Near S Tryon St & W 4th St", "Charlotte, NC 28202"], keywords: "scooter snowboard ski winter",
    description: [
      "152 cm all-mountain snowboard with bindings, used for one trip. Edges are sharp and the base has no scratches.",
      "Includes a padded board bag. Price is firm, but I can meet anywhere Uptown.",
    ],
  },
  {
    id: 5, title: "Vintage Film Camera", price: 100, category: "for-sale",
    area: "Fort Mill", posted: "1h ago", postedLong: "1 hour ago", miles: 18, condition: "Good",
    address: ["Near Main St & Academy St", "Fort Mill, SC 29715"], keywords: "scooter camera film photography 35mm",
    description: [
      "35mm film SLR with a 50mm lens. The light meter works, the shutter fires at every speed and the viewfinder is clear.",
      "Comes with the original strap and a lens cap. A fresh roll of film is included so you can test it right away.",
    ],
  },
  {
    id: 6, title: "Casio Keyboard", price: 65, category: "for-sale",
    area: "NoDa", posted: "1d ago", postedLong: "1 day ago", miles: 1, condition: "Good",
    address: ["Near 36th St & N Davidson St", "Charlotte, NC 28205"], keywords: "scooter keyboard piano music",
    description: [
      "61-key Casio keyboard with built-in speakers, a power adapter and a music stand. Every key works.",
      "Great for beginners. My little brother has moved on to guitar.",
    ],
  },
  {
    id: 7, title: "Golden puppy", price: 120, category: "for-sale",
    area: "NoDa", posted: "2d ago", postedLong: "2 days ago", miles: 1,
    address: ["Near E 36th St & Cullman Ave", "Charlotte, NC 28205"], keywords: "golden retriever dog puppy pet",
    description: [
      "One golden retriever puppy left, 10 weeks old. Vet checked, first shots done and already working on potty training.",
      "The rehoming fee covers vet costs. Please tell us a little about your home in your message.",
    ],
  },
  {
    id: 8, title: "golden retriever", price: 143.08, category: "for-sale",
    area: "Plaza Midwood", posted: "10h ago", postedLong: "4 days ago", miles: 3,
    address: ["Near Commonwealth Ave & Thomas Ave", "Charlotte, NC 28205"], keywords: "golden retriever dog pet",
    description: [
      "Rehoming our sweet 3-year-old golden retriever, Biscuit. He is house-trained, great with kids and loves car rides. We are moving into an apartment that does not allow large dogs.",
      "His crate, leash, food bowls and favorite toys all come with him. The rehoming fee covers his last vet visit.",
    ],
  },
  {
    id: 9, title: "golden retriever discussion", price: null, category: "discussion",
    area: "NoDa", posted: "11h ago", postedLong: "11 hours ago", miles: 1,
    address: ["NoDa", "Charlotte, NC 28205"], keywords: "golden retriever dog pet",
    description: [
      "Golden owners of Charlotte: which dog parks do your goldens love most? Ours is a year old and has a lot of energy to burn.",
      "Also looking for groomer recommendations near NoDa.",
    ],
  },
  {
    id: 10, title: "looking for puppy sitter", price: 500, category: "jobs",
    area: "Uptown", posted: "2h ago", postedLong: "2 hours ago", miles: 4,
    address: ["Near N Church St & W 6th St", "Charlotte, NC 28202"], keywords: "golden retriever dog puppy sitter pet job",
    description: [
      "Need a reliable sitter for our golden retriever puppy, weekdays from 9 to 3 for two weeks. Pay is $500 per week.",
      "Duties are walks, lunch and play time. Experience with puppies preferred. References please.",
    ],
  },
  {
    id: 11, title: "lightly used dog bowl", price: 10, category: "for-sale",
    area: "Fort Mill", posted: "1h ago", postedLong: "1 hour ago", miles: 18, condition: "Like new",
    address: ["Near Tom Hall St & Massey St", "Fort Mill, SC 29715"], keywords: "golden retriever dog bowl pet",
    description: [
      "Stainless steel dog bowl in a non-slip stand, large size. Used for about a month and washed.",
      "Our dog prefers the raised feeder, so this one has to go.",
    ],
  },
  {
    id: 12, title: "lost golden retriever at noda?", price: null, category: "community",
    area: "NoDa", posted: "1d ago", postedLong: "1 day ago", miles: 1,
    address: ["Near N Davidson St & E 34th St", "Charlotte, NC 28205"], keywords: "golden retriever dog lost pet",
    description: [
      "Saw a golden retriever with a red collar and no tag near the breweries on 34th St around 7pm. He was friendly but ran off toward the greenway.",
      "If he's yours or you've seen him, please reply so we can get him home.",
    ],
  },
  {
    id: 13, title: "Lawn mowing & yard cleanup", price: 40, category: "services",
    area: "South End", posted: "3h ago", postedLong: "3 hours ago", miles: 3,
    address: ["Serving South End & Dilworth", "Charlotte, NC 28203"], keywords: "lawn yard mowing landscaping",
    description: [
      "College student offering lawn mowing, edging and leaf cleanup. $40 for most small yards, and I bring my own equipment.",
      "Available weekends and Wednesday afternoons. Message me your address for a quick quote.",
    ],
  },
  {
    id: 14, title: "Phone & laptop screen repair", price: 60, category: "services",
    area: "University City", posted: "5h ago", postedLong: "5 hours ago", miles: 9,
    address: ["Near University City Blvd & JW Clay Blvd", "Charlotte, NC 28262"], keywords: "phone laptop screen repair tech",
    description: [
      "Cracked screen? I replace phone and laptop screens, usually the same day. Prices start at $60 plus parts.",
      "I can meet on or near campus. Quotes are free.",
    ],
  },
  {
    id: 15, title: "Apartment & house cleaning", price: 90, category: "services",
    area: "Dilworth", posted: "1d ago", postedLong: "1 day ago", miles: 3,
    address: ["Serving Dilworth & Myers Park", "Charlotte, NC 28203"], keywords: "cleaning house apartment move out",
    description: [
      "Detailed cleaning for apartments and small homes, including move-out cleans. $90 for a one-bedroom.",
      "All supplies included. Weekday and weekend slots available.",
    ],
  },
  {
    id: 16, title: "Part-time barista", price: 16, priceSuffix: "/hr", category: "jobs",
    area: "Plaza Midwood", posted: "6h ago", postedLong: "6 hours ago", miles: 3,
    address: ["Near Central Ave & Pecan Ave", "Charlotte, NC 28205"], keywords: "barista coffee job part time",
    description: [
      "Neighborhood coffee shop hiring part-time baristas for morning shifts, 15 to 25 hours a week. $16 an hour plus tips.",
      "No experience needed, we will train you. Must be available at least two weekend mornings.",
    ],
  },
  {
    id: 17, title: "Campus delivery driver", price: 20, priceSuffix: "/hr", category: "jobs",
    area: "University City", posted: "1d ago", postedLong: "1 day ago", miles: 9,
    address: ["Near N Tryon St & W Mallard Creek Church Rd", "Charlotte, NC 28262"], keywords: "delivery driver job",
    description: [
      "Local restaurant looking for evening delivery drivers around campus. Averages $20 an hour with tips.",
      "Need your own car, a clean driving record and a smartphone. Flexible schedule.",
    ],
  },
  {
    id: 18, title: "NoDa gallery crawl", price: 0, category: "events",
    area: "NoDa", posted: "4h ago", postedLong: "4 hours ago", miles: 1,
    address: ["N Davidson St galleries", "Charlotte, NC 28205"], keywords: "art gallery crawl event",
    description: [
      "First Friday gallery crawl from 6 to 10pm, with open studios, live music and food trucks along N Davidson St.",
      "Free to attend and family friendly. Parking fills up fast, so the light rail is your friend.",
    ],
  },
  {
    id: 19, title: "Weekend farmers market", price: 0, category: "events",
    area: "Dilworth", posted: "2d ago", postedLong: "2 days ago", miles: 3,
    address: ["Near East Blvd & Euclid Ave", "Charlotte, NC 28203"], keywords: "farmers market food event",
    description: [
      "Saturday market from 8am to noon with local produce, baked goods, flowers and coffee.",
      "Bring a reusable bag. Most vendors take cards.",
    ],
  },
  {
    id: 20, title: "Trivia night", price: 0, category: "events",
    area: "Plaza Midwood", posted: "8h ago", postedLong: "8 hours ago", miles: 3,
    address: ["Near Central Ave & Thomas Ave", "Charlotte, NC 28205"], keywords: "trivia game night event",
    description: [
      "Weekly team trivia every Tuesday at 7pm. Teams of up to 6, and the winning team gets a gift card.",
      "Free to play. Show up early to grab a table.",
    ],
  },
  {
    id: 21, title: "Community garden volunteers", price: null, category: "community",
    area: "South End", posted: "3d ago", postedLong: "3 days ago", miles: 3,
    address: ["Near Camden Rd & Park Ave", "Charlotte, NC 28203"], keywords: "garden volunteer community",
    description: [
      "Our neighborhood garden needs a few more volunteers for Saturday morning workdays: weeding, watering and harvesting.",
      "No experience needed. Volunteers take home fresh vegetables.",
    ],
  },
  {
    id: 22, title: "Book swap meetup", price: null, category: "community",
    area: "Uptown", posted: "5d ago", postedLong: "5 days ago", miles: 4,
    address: ["Near N Tryon St & E 6th St", "Charlotte, NC 28202"], keywords: "book swap reading meetup",
    description: [
      "Bring a book, take a book! Monthly swap on the last Sunday of the month at 2pm.",
      "All genres welcome. Leftover books go to the library donation bin.",
    ],
  },
  {
    id: 23, title: "Best tacos in Charlotte?", price: null, category: "discussion",
    area: "South End", posted: "7h ago", postedLong: "7 hours ago", miles: 3,
    address: ["South End", "Charlotte, NC 28203"], keywords: "food tacos restaurant",
    description: [
      "Just moved here and I'm on a mission to find the best tacos in town. Food trucks count!",
      "Drop your favorites, especially anything near the light rail.",
    ],
  },
  {
    id: 24, title: "Apartment tips near UNC Charlotte", price: null, category: "discussion",
    area: "University City", posted: "1d ago", postedLong: "1 day ago", miles: 9,
    address: ["University City", "Charlotte, NC 28262"], keywords: "apartment housing campus student",
    description: [
      "Looking for an apartment near campus for next fall. Which complexes are worth it, and which should I avoid?",
      "Bonus points if you know places that allow dogs.",
    ],
  },
];

const SUGGESTIONS = ["scooter", "golden retriever"];

const params = new URLSearchParams(location.search);

/* ---------- HELPERS ---------- */
function formatPrice(item) {
  if (item.price === null) return CATEGORIES[item.category].label;
  if (item.price === 0) return "Free";
  const amount = Number.isInteger(item.price) ? item.price : item.price.toFixed(2);
  return "$" + amount + (item.priceSuffix || "");
}

function findListing(id) {
  return LISTINGS.find((item) => item.id === Number(id));
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function img(src, className = "") {
  const node = document.createElement("img");
  node.src = src;
  node.alt = "";
  node.className = className;
  return node;
}

/* ---------- THEME ---------- */
function getTheme() {
  try {
    return localStorage.getItem("theme") || "light";
  } catch {
    return "light";
  }
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* private mode — theme just won't persist */
  }
  document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
    toggle.setAttribute("aria-checked", String(theme === "dark"));
  });
  document.querySelectorAll("[data-theme-label]").forEach((label) => {
    label.textContent = theme === "dark" ? "Dark theme is on" : "Light theme is on";
  });
}

function toggleMarkup() {
  return '<button class="toggle" type="button" role="switch" aria-label="Dark mode" data-theme-toggle><span class="toggle__knob"></span></button>';
}

/* ---------- MENU DRAWER ---------- */
function buildDrawer() {
  const page = document.body.dataset.page;
  const drawer = el("div", "drawer");
  drawer.id = "menu";
  drawer.innerHTML = `
    <button class="drawer__scrim" type="button" aria-label="Close menu" data-close-menu></button>
    <nav class="drawer__panel" aria-label="Main menu" role="dialog" aria-modal="true">
      <p class="drawer__title">Menu</p>
      <a class="drawer__link" href="index.html" ${page === "home" ? 'aria-current="page"' : ""}>Home</a>
      <a class="drawer__link" href="search.html?category=for-sale">For Sale</a>
      <a class="drawer__link" href="contact.html" ${page === "contact" ? 'aria-current="page"' : ""}>Contact Seller</a>
      <hr class="drawer__divider" />
      <p class="drawer__section">SETTINGS</p>
      <div class="drawer__row">
        <div>
          <strong>Dark mode</strong>
          <small data-theme-label>Light theme is on</small>
        </div>
        ${toggleMarkup()}
      </div>
    </nav>`;
  document.body.append(drawer);

  let lastFocus = null;

  function open() {
    lastFocus = document.activeElement;
    drawer.classList.add("is-open");
    document.querySelectorAll("[data-open-menu]").forEach((b) => b.setAttribute("aria-expanded", "true"));
    drawer.querySelector(".drawer__link").focus();
  }

  function close() {
    drawer.classList.remove("is-open");
    document.querySelectorAll("[data-open-menu]").forEach((b) => b.setAttribute("aria-expanded", "false"));
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll("[data-open-menu]").forEach((button) => {
    button.setAttribute("aria-controls", "menu");
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", open);
  });
  drawer.querySelector("[data-close-menu]").addEventListener("click", close);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) close();
  });
}

/* ---------- SEARCH FIELD + SUGGESTIONS ---------- */
function setupSearch(form) {
  const input = form.querySelector(".search__input");
  const clear = form.querySelector(".search__clear");
  const list = el("ul", "suggestions");
  list.hidden = true;
  list.id = "suggestions-" + Math.random().toString(36).slice(2, 7);
  list.append(el("li", "suggestions__label", "Popular searches"));
  SUGGESTIONS.forEach((term) => {
    const li = el("li");
    const link = el("a", "", term);
    link.href = "search.html?q=" + encodeURIComponent(term);
    li.append(link);
    list.append(li);
  });
  form.append(list);
  input.setAttribute("aria-controls", list.id);

  const current = params.get("q");
  if (current && document.body.dataset.page === "search") input.value = current;

  function sync() {
    form.classList.toggle("has-text", input.value.length > 0);
  }
  sync();

  input.addEventListener("input", sync);
  input.addEventListener("focus", () => {
    list.hidden = false;
  });
  clear.addEventListener("click", () => {
    input.value = "";
    sync();
    input.focus();
  });
  // close when focus or clicks leave the form
  form.addEventListener("focusout", (event) => {
    if (!form.contains(event.relatedTarget)) list.hidden = true;
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      list.hidden = true;
    }
  });
  form.addEventListener("submit", (event) => {
    if (!input.value.trim()) {
      event.preventDefault();
      input.focus();
    }
  });
}

/* ---------- BACK BUTTONS ---------- */
function setupBackButtons() {
  document.querySelectorAll("[data-back]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const cameFromSite = document.referrer && new URL(document.referrer).origin === location.origin;
      if (cameFromSite && history.length > 1) {
        event.preventDefault();
        history.back();
      }
    });
  });
}

/* ---------- LISTING CARD ---------- */
function listingCard(item) {
  const li = el("li");
  const link = el("a", "listing-card");
  link.href = "listing.html?id=" + item.id;

  const thumb = el("div", "listing-card__thumb");
  thumb.append(img(CATEGORIES[item.category].icon, "icon"));

  const body = el("div", "listing-card__body");
  const meta = el("p", "listing-card__meta");
  meta.append(img("assets/icon-location.svg", "icon-muted"), document.createTextNode(`${item.area} · ${item.posted}`));
  body.append(el("p", "listing-card__price", formatPrice(item)), el("h2", "listing-card__title", item.title), meta);

  link.append(thumb, body);
  li.append(link);
  return li;
}

/* ---------- PAGE: SEARCH RESULTS ---------- */
function initSearchPage() {
  const query = (params.get("q") || "").trim();
  const startCategory = params.get("category");
  const heading = document.getElementById("results-heading");
  const grid = document.getElementById("results-grid");
  const count = document.getElementById("results-count");
  const loading = document.getElementById("loading");
  const results = document.getElementById("results-page");
  const sortButtons = document.querySelectorAll("[data-sort]");

  const state = {
    category: CATEGORIES[startCategory] ? startCategory : null,
    distance: null,
    price: null,
    sort: null,
  };

  const PRICE_RANGES = {
    under50: (p) => p !== null && p < 50,
    "50to200": (p) => p !== null && p >= 50 && p <= 200,
    over200: (p) => p !== null && p > 200,
  };

  if (query) {
    heading.textContent = `Search Results for: ${query}`;
    document.title = `${query} — craigslist`;
    document.getElementById("loading-query").textContent = query;
  } else if (state.category) {
    heading.textContent = CATEGORIES[state.category].label;
    document.title = `${CATEGORIES[state.category].label} — craigslist`;
    document.getElementById("loading-query").textContent = CATEGORIES[state.category].label;
  } else {
    heading.textContent = "All listings";
  }

  function matches(item) {
    if (query) {
      const words = query.toLowerCase().split(/\s+/);
      const haystack = `${item.title} ${item.keywords}`.toLowerCase();
      if (!words.every((word) => haystack.includes(word))) return false;
    }
    if (state.category && item.category !== state.category) return false;
    if (state.distance && item.miles > Number(state.distance)) return false;
    if (state.price && !PRICE_RANGES[state.price](item.price)) return false;
    return true;
  }

  function render() {
    let items = LISTINGS.filter(matches);
    // posts without a price always go last
    if (state.sort === "asc") items = [...items].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (state.sort === "desc") items = [...items].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));

    grid.replaceChildren(...items.map(listingCard));
    count.textContent = `${items.length} result${items.length === 1 ? "" : "s"}`;

    if (items.length === 0) {
      const empty = el("li", "empty-state");
      empty.style.gridColumn = "1 / -1";
      empty.append(el("strong", "", "No listings found"), document.createTextNode("Try a different search or clear a filter."));
      grid.append(empty);
    }
  }

  // filter chips: one choice per group, click again to clear.
  // The same chip can appear twice (mobile row + desktop sidebar), so sync by value.
  function syncChips() {
    document.querySelectorAll("[data-filter]").forEach((chip) => {
      chip.setAttribute("aria-pressed", String(state[chip.dataset.filter] === chip.dataset.value));
    });
  }
  document.querySelectorAll("[data-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const group = chip.dataset.filter;
      state[group] = state[group] === chip.dataset.value ? null : chip.dataset.value;
      syncChips();
      render();
    });
  });
  syncChips();

  // filter group headers expand / collapse
  document.querySelectorAll(".filter-group__header").forEach((header) => {
    const panel = document.getElementById(header.getAttribute("aria-controls"));
    header.addEventListener("click", () => {
      const expanded = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    });
  });

  // sort cycles: none → low to high → high to low
  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.sort = state.sort === null ? "asc" : state.sort === "asc" ? "desc" : null;
      const label = state.sort === "asc" ? "Price: Low → High" : state.sort === "desc" ? "Price: High → Low" : "Sort";
      sortButtons.forEach((b) => {
        b.textContent = label;
        b.setAttribute("aria-pressed", String(state.sort !== null));
      });
      render();
    });
  });

  // brief loading state, like the "Mobile - Loading" frame
  setTimeout(() => {
    loading.hidden = true;
    results.hidden = false;
    render();
  }, 700);
}

/* ---------- PAGE: LISTING DETAILS ---------- */
function initListingPage() {
  const item = findListing(params.get("id"));
  if (!item) {
    location.replace("404.html");
    return;
  }
  const category = CATEGORIES[item.category];
  const heading = item.heading || item.title;

  document.title = `${heading} — craigslist`;
  document.getElementById("listing-title").textContent = heading;
  document.getElementById("listing-price").textContent = formatPrice(item);
  document.getElementById("listing-price-row").hidden = item.price === null;

  const meta = [category.label];
  if (item.condition) meta.push(`Condition: ${item.condition}`);
  meta.push(`Posted ${item.postedLong}`);
  document.getElementById("listing-meta").textContent = meta.join(" · ");

  document.getElementById("listing-tag").textContent = category.label;
  document.getElementById("listing-condition").textContent = item.condition || "";
  document.getElementById("listing-condition-row").hidden = !item.condition;
  document.getElementById("listing-posted").textContent = item.postedLong;
  document.getElementById("listing-icon").src = category.icon.replace("icon-for-sale.svg", "icon-for-sale-lg.svg");
  document.getElementById("listing-desc").replaceChildren(...item.description.map((text) => el("p", "", text)));

  const address = document.getElementById("listing-address");
  address.replaceChildren();
  item.address.forEach((line, i) => {
    if (i > 0) address.append(el("br"));
    address.append(line);
  });

  document.querySelectorAll("[data-contact-link]").forEach((link) => {
    link.href = "contact.html?id=" + item.id;
  });
}

/* ---------- PAGE: CONTACT SELLER ---------- */
function initContactPage() {
  const item = findListing(params.get("id"));
  const form = document.getElementById("message-form");
  const field = document.getElementById("message");
  const counter = document.getElementById("message-count");
  const error = document.getElementById("message-error");
  const dialog = document.getElementById("sent-dialog");
  const max = Number(field.getAttribute("maxlength"));

  if (item) {
    const about = document.getElementById("contact-about");
    const link = el("a", "", item.heading || item.title);
    link.href = "listing.html?id=" + item.id;
    about.append("About: ", link, ` · ${formatPrice(item)}`);
    about.hidden = false;
  }

  function updateCount() {
    counter.textContent = `${field.value.length}/${max} characters`;
  }
  updateCount();

  field.addEventListener("input", () => {
    updateCount();
    if (field.value.trim()) {
      form.classList.remove("has-error");
      field.removeAttribute("aria-invalid");
      error.hidden = true;
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!field.value.trim()) {
      form.classList.add("has-error");
      field.setAttribute("aria-invalid", "true");
      error.hidden = false;
      field.focus();
      return;
    }
    field.value = "";
    updateCount();
    dialog.showModal();
  });

  dialog.querySelector("[data-done]").addEventListener("click", () => {
    location.href = item ? "listing.html?id=" + item.id : "index.html";
  });
}

/* ---------- START ---------- */
document.querySelectorAll("[data-theme-slot]").forEach((slot) => {
  slot.innerHTML = toggleMarkup();
});
buildDrawer();
setTheme(getTheme());
document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
});
document.querySelectorAll(".search").forEach(setupSearch);
setupBackButtons();

const pageInit = {
  search: initSearchPage,
  listing: initListingPage,
  contact: initContactPage,
};
pageInit[document.body.dataset.page]?.();
