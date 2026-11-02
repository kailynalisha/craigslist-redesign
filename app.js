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
// coords are approximate (neighborhood level) and drive the listing map.
const LISTINGS = [
  {
    id: 1, title: "Scooter in progress!", heading: "Scooter", price: 120, category: "for-sale",
    image: "assets/listings/scooterinprogress.PNG",
    area: "NoDa", posted: "2d ago", postedLong: "2 days ago", miles: 1, condition: "Fair",
    coords: [35.2479, -80.8076],
    address: ["Near 36th St & N Davidson St", "Charlotte, NC 28205"], keywords: "scooter kick",
    description: [
      "Adult kick scooter that I started fixing up and never finished. New wheels and bearings are already on, but the grip tape is worn and the brake could use a tighter spring.",
      "Folds flat and fits in a car trunk. Great project if you like to tinker. Cash or Venmo, pickup only.",
    ],
  },
  {
    id: 2, title: "Bike", heading: "Hybrid commuter bike", price: 350, category: "for-sale",
    image: "assets/listings/bike.PNG",
    area: "Plaza Midwood", posted: "10h ago", postedLong: "10 hours ago", miles: 3, condition: "Good",
    coords: [35.221, -80.8105],
    address: ["Near Central Ave & The Plaza", "Charlotte, NC 28205"], keywords: "scooter bike bicycle commuter",
    description: [
      "Medium-frame hybrid bike, 21 speeds. Tuned up last spring, shifts smoothly and the tires hold air. Comes with a rear rack and front light.",
      "Selling because I moved closer to campus and walk everywhere now. Happy to let you take a test ride around the block.",
    ],
  },
  {
    id: 3, title: "Chair", heading: "Wooden kitchen chair", price: 5, category: "for-sale",
    image: "assets/listings/chair.PNG",
    imageInset: true,
    area: "NoDa", posted: "11h ago", postedLong: "11 hours ago", miles: 1, condition: "Fair",
    coords: [35.2462, -80.8095],
    address: ["Near N Davidson St & E 35th St", "Charlotte, NC 28205"], keywords: "scooter chair furniture",
    description: [
      "Solid wood kitchen chair. A few scratches on the seat but it is sturdy and does not wobble.",
      "Only one available. Porch pickup, just send a message first.",
    ],
  },
  {
    id: 4, title: "Snowboard", heading: "Snowboard with bindings", price: 500, category: "for-sale",
    area: "Uptown", posted: "2h ago", postedLong: "2 hours ago", miles: 4, condition: "Like new",
    coords: [35.2269, -80.8433],
    address: ["Near S Tryon St & W 4th St", "Charlotte, NC 28202"], keywords: "scooter snowboard ski winter",
    description: [
      "152 cm all-mountain snowboard with bindings, used for one trip. Edges are sharp and the base has no scratches.",
      "Includes a padded board bag. Price is firm, but I can meet anywhere Uptown.",
    ],
  },
  {
    id: 5, title: "Vintage Film Camera", price: 100, category: "for-sale",
    area: "Fort Mill", posted: "1h ago", postedLong: "1 hour ago", miles: 18, condition: "Good",
    coords: [35.0074, -80.9451],
    address: ["Near Main St & Academy St", "Fort Mill, SC 29715"], keywords: "scooter camera film photography 35mm",
    description: [
      "35mm film SLR with a 50mm lens. The light meter works, the shutter fires at every speed and the viewfinder is clear.",
      "Comes with the original strap and a lens cap. A fresh roll of film is included so you can test it right away.",
    ],
  },
  {
    id: 6, title: "Casio Keyboard", price: 65, category: "for-sale",
    area: "NoDa", posted: "1d ago", postedLong: "1 day ago", miles: 1, condition: "Good",
    coords: [35.2479, -80.8076],
    address: ["Near 36th St & N Davidson St", "Charlotte, NC 28205"], keywords: "scooter keyboard piano music",
    description: [
      "61-key Casio keyboard with built-in speakers, a power adapter and a music stand. Every key works.",
      "Great for beginners. My little brother has moved on to guitar.",
    ],
  },
  {
    id: 7, title: "Golden puppy", price: 120, category: "for-sale",
    image: "assets/listings/puppies.PNG",
    area: "NoDa", posted: "2d ago", postedLong: "2 days ago", miles: 1,
    coords: [35.249, -80.8045],
    address: ["Near E 36th St & Cullman Ave", "Charlotte, NC 28205"], keywords: "golden retriever dog puppy pet",
    description: [
      "One golden retriever puppy left, 10 weeks old. Vet checked, first shots done and already working on potty training.",
      "The rehoming fee covers vet costs. Please tell us a little about your home in your message.",
    ],
  },
  {
    id: 8, title: "golden retriever", price: 143.08, category: "for-sale",
    image: "assets/listings/golden3-1.PNG",
    area: "Plaza Midwood", posted: "10h ago", postedLong: "4 days ago", miles: 3,
    coords: [35.2165, -80.803],
    address: ["Near Commonwealth Ave & Thomas Ave", "Charlotte, NC 28205"], keywords: "golden retriever dog pet",
    description: [
      "Rehoming our sweet 3-year-old golden retriever, Biscuit. He is house-trained, great with kids and loves car rides. We are moving into an apartment that does not allow large dogs.",
      "His crate, leash, food bowls and favorite toys all come with him. The rehoming fee covers his last vet visit.",
    ],
  },
  {
    id: 9, title: "golden retriever discussion", price: null, category: "discussion",
    area: "NoDa", posted: "11h ago", postedLong: "11 hours ago", miles: 1,
    coords: [35.247, -80.809],
    address: ["NoDa", "Charlotte, NC 28205"], keywords: "golden retriever dog pet",
    description: [
      "Golden owners of Charlotte: which dog parks do your goldens love most? Ours is a year old and has a lot of energy to burn.",
      "Also looking for groomer recommendations near NoDa.",
    ],
  },
  {
    id: 10, title: "looking for puppy sitter", price: 500, category: "jobs",
    area: "Uptown", posted: "2h ago", postedLong: "2 hours ago", miles: 4,
    coords: [35.2297, -80.843],
    address: ["Near N Church St & W 6th St", "Charlotte, NC 28202"], keywords: "golden retriever dog puppy sitter pet job",
    description: [
      "Need a reliable sitter for our golden retriever puppy, weekdays from 9 to 3 for two weeks. Pay is $500 per week.",
      "Duties are walks, lunch and play time. Experience with puppies preferred. References please.",
    ],
  },
  {
    id: 11, title: "lightly used dog bowl", price: 10, category: "for-sale",
    area: "Fort Mill", posted: "1h ago", postedLong: "1 hour ago", miles: 18, condition: "Like new",
    coords: [35.008, -80.947],
    address: ["Near Tom Hall St & Massey St", "Fort Mill, SC 29715"], keywords: "golden retriever dog bowl pet",
    description: [
      "Stainless steel dog bowl in a non-slip stand, large size. Used for about a month and washed.",
      "Our dog prefers the raised feeder, so this one has to go.",
    ],
  },
  {
    id: 12, title: "lost golden retriever at noda?", price: null, category: "community",
    image: "assets/listings/lostdog.PNG",
    imageInset: true,
    area: "NoDa", posted: "1d ago", postedLong: "1 day ago", miles: 1,
    coords: [35.245, -80.811],
    address: ["Near N Davidson St & E 34th St", "Charlotte, NC 28205"], keywords: "golden retriever dog lost pet",
    description: [
      "Saw a golden retriever with a red collar and no tag near the breweries on 34th St around 7pm. He was friendly but ran off toward the greenway.",
      "If he's yours or you've seen him, please reply so we can get him home.",
    ],
  },
  {
    id: 13, title: "Lawn mowing & yard cleanup", price: 40, category: "services",
    area: "South End", posted: "3h ago", postedLong: "3 hours ago", miles: 3,
    coords: [35.2105, -80.858],
    address: ["Serving South End & Dilworth", "Charlotte, NC 28203"], keywords: "lawn yard mowing landscaping",
    description: [
      "College student offering lawn mowing, edging and leaf cleanup. $40 for most small yards, and I bring my own equipment.",
      "Available weekends and Wednesday afternoons. Message me your address for a quick quote.",
    ],
  },
  {
    id: 14, title: "Phone & laptop screen repair", price: 60, category: "services",
    image: "assets/listings/phoneandlaptop.PNG",
    area: "University City", posted: "5h ago", postedLong: "5 hours ago", miles: 9,
    coords: [35.3076, -80.7337],
    address: ["Near University City Blvd & JW Clay Blvd", "Charlotte, NC 28262"], keywords: "phone laptop screen repair tech",
    description: [
      "Cracked screen? I replace phone and laptop screens, usually the same day. Prices start at $60 plus parts.",
      "I can meet on or near campus. Quotes are free.",
    ],
  },
  {
    id: 15, title: "Apartment & house cleaning", price: 90, category: "services",
    image: "assets/listings/cleaning.PNG",
    area: "Dilworth", posted: "1d ago", postedLong: "1 day ago", miles: 3,
    coords: [35.204, -80.85],
    address: ["Serving Dilworth & Myers Park", "Charlotte, NC 28203"], keywords: "cleaning house apartment move out",
    description: [
      "Detailed cleaning for apartments and small homes, including move-out cleans. $90 for a one-bedroom.",
      "All supplies included. Weekday and weekend slots available.",
    ],
  },
  {
    id: 16, title: "Part-time barista", price: 16, priceSuffix: "/hr", category: "jobs",
    area: "Plaza Midwood", posted: "6h ago", postedLong: "6 hours ago", miles: 3,
    coords: [35.219, -80.8125],
    address: ["Near Central Ave & Pecan Ave", "Charlotte, NC 28205"], keywords: "barista coffee job part time",
    description: [
      "Neighborhood coffee shop hiring part-time baristas for morning shifts, 15 to 25 hours a week. $16 an hour plus tips.",
      "No experience needed, we will train you. Must be available at least two weekend mornings.",
    ],
  },
  {
    id: 17, title: "Campus delivery driver", price: 20, priceSuffix: "/hr", category: "jobs",
    area: "University City", posted: "1d ago", postedLong: "1 day ago", miles: 9,
    coords: [35.311, -80.746],
    address: ["Near N Tryon St & W Mallard Creek Church Rd", "Charlotte, NC 28262"], keywords: "delivery driver job",
    description: [
      "Local restaurant looking for evening delivery drivers around campus. Averages $20 an hour with tips.",
      "Need your own car, a clean driving record and a smartphone. Flexible schedule.",
    ],
  },
  {
    id: 18, title: "NoDa gallery crawl", price: 0, category: "events",
    area: "NoDa", posted: "4h ago", postedLong: "4 hours ago", miles: 1,
    coords: [35.2465, -80.81],
    address: ["N Davidson St galleries", "Charlotte, NC 28205"], keywords: "art gallery crawl event",
    description: [
      "First Friday gallery crawl from 6 to 10pm, with open studios, live music and food trucks along N Davidson St.",
      "Free to attend and family friendly. Parking fills up fast, so the light rail is your friend.",
    ],
  },
  {
    id: 19, title: "Weekend farmers market", price: 0, category: "events",
    area: "Dilworth", posted: "2d ago", postedLong: "2 days ago", miles: 3,
    coords: [35.207, -80.853],
    address: ["Near East Blvd & Euclid Ave", "Charlotte, NC 28203"], keywords: "farmers market food event",
    description: [
      "Saturday market from 8am to noon with local produce, baked goods, flowers and coffee.",
      "Bring a reusable bag. Most vendors take cards.",
    ],
  },
  {
    id: 20, title: "Trivia night", price: 0, category: "events",
    area: "Plaza Midwood", posted: "8h ago", postedLong: "8 hours ago", miles: 3,
    coords: [35.2195, -80.803],
    address: ["Near Central Ave & Thomas Ave", "Charlotte, NC 28205"], keywords: "trivia game night event",
    description: [
      "Weekly team trivia every Tuesday at 7pm. Teams of up to 6, and the winning team gets a gift card.",
      "Free to play. Show up early to grab a table.",
    ],
  },
  {
    id: 21, title: "Community garden volunteers", price: null, category: "community",
    area: "South End", posted: "3d ago", postedLong: "3 days ago", miles: 3,
    coords: [35.212, -80.859],
    address: ["Near Camden Rd & Park Ave", "Charlotte, NC 28203"], keywords: "garden volunteer community",
    description: [
      "Our neighborhood garden needs a few more volunteers for Saturday morning workdays: weeding, watering and harvesting.",
      "No experience needed. Volunteers take home fresh vegetables.",
    ],
  },
  {
    id: 22, title: "Book swap meetup", price: null, category: "community",
    image: "assets/listings/bookswap.PNG",
    imageInset: true,
    area: "Uptown", posted: "5d ago", postedLong: "5 days ago", miles: 4,
    coords: [35.2295, -80.841],
    address: ["Near N Tryon St & E 6th St", "Charlotte, NC 28202"], keywords: "book swap reading meetup",
    description: [
      "Bring a book, take a book! Monthly swap on the last Sunday of the month at 2pm.",
      "All genres welcome. Leftover books go to the library donation bin.",
    ],
  },
  {
    id: 23, title: "Best tacos in Charlotte?", price: null, category: "discussion",
    area: "South End", posted: "7h ago", postedLong: "7 hours ago", miles: 3,
    coords: [35.2105, -80.856],
    address: ["South End", "Charlotte, NC 28203"], keywords: "food tacos restaurant",
    description: [
      "Just moved here and I'm on a mission to find the best tacos in town. Food trucks count!",
      "Drop your favorites, especially anything near the light rail.",
    ],
  },
  {
    id: 24, title: "Apartment tips near UNC Charlotte", price: null, category: "discussion",
    area: "University City", posted: "1d ago", postedLong: "1 day ago", miles: 9,
    coords: [35.305, -80.733],
    address: ["University City", "Charlotte, NC 28262"], keywords: "apartment housing campus student",
    description: [
      "Looking for an apartment near campus for next fall. Which complexes are worth it, and which should I avoid?",
      "Bonus points if you know places that allow dogs.",
    ],
  },
  {
    id: 25, title: "Scooter & bike tune-ups", price: 25, category: "services",
    area: "NoDa", posted: "2h ago", postedLong: "2 hours ago", miles: 1,
    coords: [35.2455, -80.8085],
    address: ["Near N Davidson St & E 35th St", "Charlotte, NC 28205"], keywords: "scooter bike bicycle repair tune up",
    description: [
      "Mobile repair for kick scooters, e-scooters and bikes. Tune-ups start at $25: brakes adjusted, bolts tightened, tires checked and chains oiled.",
      "I come to you anywhere in NoDa or Plaza Midwood. Most repairs take under an hour.",
    ],
  },
  {
    id: 26, title: "Dog walking & pet sitting", price: 20, priceSuffix: "/walk", category: "services",
    area: "Plaza Midwood", posted: "5h ago", postedLong: "5 hours ago", miles: 3,
    coords: [35.2200, -80.8060],
    address: ["Serving Plaza Midwood & NoDa", "Charlotte, NC 28205"], keywords: "golden retriever dog walking pet sitting",
    description: [
      "Experienced dog walker, and big dogs are my favorite (I grew up with two golden retrievers). 30-minute walks are $20, and overnight pet sitting is available too.",
      "Insured, with references. Meet-and-greets are free.",
    ],
  },
  {
    id: 27, title: "Math & coding tutoring", price: 30, priceSuffix: "/hr", category: "services",
    area: "University City", posted: "1d ago", postedLong: "1 day ago", miles: 9,
    coords: [35.3071, -80.7352],
    address: ["Near UNC Charlotte campus", "Charlotte, NC 28262"], keywords: "tutoring math coding programming",
    description: [
      "Computer science senior tutoring calculus, statistics and intro programming (Python, Java, JavaScript). $30 an hour.",
      "Sessions can be in person on campus or over Zoom. Your first 15 minutes are free.",
    ],
  },
  {
    id: 28, title: "Scooter delivery rider", price: 18, priceSuffix: "/hr", category: "jobs",
    area: "Uptown", posted: "3h ago", postedLong: "3 hours ago", miles: 4,
    coords: [35.2260, -80.8420],
    address: ["Near S Tryon St & E Trade St", "Charlotte, NC 28202"], keywords: "scooter delivery rider courier job",
    description: [
      "Local courier hiring riders to deliver small packages around Uptown on our electric scooters. $18 an hour, and the scooter and helmet are provided.",
      "Shifts run 4 to 6 hours, weekdays and weekends. Must be 18+ and comfortable riding in traffic.",
    ],
  },
  {
    id: 29, title: "Dog daycare attendant", price: 15, priceSuffix: "/hr", category: "jobs",
    area: "South End", posted: "1d ago", postedLong: "1 day ago", miles: 3,
    coords: [35.2090, -80.8600],
    address: ["Near South Blvd & W Tremont Ave", "Charlotte, NC 28203"], keywords: "golden retriever dog daycare pet job",
    description: [
      "Busy dog daycare looking for part-time attendants. You'll spend the day with a pack that includes lots of labs and golden retrievers. $15 an hour.",
      "Must be comfortable with large dogs and on your feet all shift. We'll train you on safety and play groups.",
    ],
  },
  {
    id: 30, title: "Campus library assistant", price: 13, priceSuffix: "/hr", category: "jobs",
    area: "University City", posted: "4d ago", postedLong: "4 days ago", miles: 9,
    coords: [35.3058, -80.7320],
    address: ["UNC Charlotte area", "Charlotte, NC 28223"], keywords: "library assistant student job campus",
    description: [
      "Part-time library assistant: shelving, helping at the front desk and checking out laptops. 10 to 15 hours a week, $13 an hour.",
      "Flexible around class schedules, and great for students.",
    ],
  },
  {
    id: 31, title: "Weekend scooter group ride", price: null, category: "community",
    area: "South End", posted: "6h ago", postedLong: "6 hours ago", miles: 3,
    coords: [35.2125, -80.8575],
    address: ["Rail Trail at Camden Rd", "Charlotte, NC 28203"], keywords: "scooter ride group community",
    description: [
      "Casual group ride every Sunday at 10am along the Rail Trail. Kick scooters, e-scooters and bikes are all welcome, at a slow, friendly pace.",
      "We usually end at a coffee shop. Helmets strongly encouraged!",
    ],
  },
  {
    id: 32, title: "Free moving boxes", price: null, category: "community",
    area: "Dilworth", posted: "9h ago", postedLong: "9 hours ago", miles: 3,
    coords: [35.2055, -80.8480],
    address: ["Near Park Rd & Ideal Way", "Charlotte, NC 28203"], keywords: "free boxes moving",
    description: [
      "Just finished moving and have about 30 boxes in mixed sizes, plus packing paper. Free to anyone who can use them.",
      "They're on the porch. Please take as many as you need.",
    ],
  },
  {
    id: 33, title: "Lost cat in Dilworth", price: null, category: "community",
    area: "Dilworth", posted: "2d ago", postedLong: "2 days ago", miles: 3,
    coords: [35.2075, -80.8545],
    address: ["Near East Blvd & Kenilworth Ave", "Charlotte, NC 28203"], keywords: "lost cat pet",
    description: [
      "Our gray tabby, Pepper, slipped out on Sunday night. She's shy, microchipped and wearing a blue collar.",
      "Please check your garages and sheds. Reply here if you see her, and thank you!",
    ],
  },
  {
    id: 34, title: "Are scooters allowed on the greenway?", price: null, category: "discussion",
    area: "NoDa", posted: "4h ago", postedLong: "4 hours ago", miles: 1,
    coords: [35.2440, -80.8030],
    address: ["Little Sugar Creek Greenway", "Charlotte, NC 28205"], keywords: "scooter greenway rules e-scooter",
    description: [
      "Does anyone know the rules for e-scooters on the Charlotte greenways? I've seen people riding them, but I've also heard you can get ticketed.",
      "Looking for a safe route from NoDa to Uptown that isn't on a busy road.",
    ],
  },
  {
    id: 35, title: "Brunch spots in South End?", price: null, category: "discussion",
    area: "South End", posted: "1d ago", postedLong: "1 day ago", miles: 3,
    coords: [35.2110, -80.8590],
    address: ["South End", "Charlotte, NC 28203"], keywords: "food brunch restaurant",
    description: [
      "Parents are visiting this weekend. Where's the best brunch in South End that takes reservations?",
      "Bonus points for outdoor seating.",
    ],
  },
  {
    id: 36, title: "Quiet study spots near campus", price: null, category: "discussion",
    area: "University City", posted: "2d ago", postedLong: "2 days ago", miles: 9,
    coords: [35.3065, -80.7340],
    address: ["University City", "Charlotte, NC 28262"], keywords: "study campus coffee student",
    description: [
      "The library gets packed during exam weeks. What are your favorite quiet places to study near UNC Charlotte?",
      "Coffee shops, parks, anything with Wi-Fi and outlets.",
    ],
  },
  {
    id: 37, title: "Scooter & bike swap meet", price: 0, category: "events",
    area: "Plaza Midwood", posted: "5h ago", postedLong: "5 hours ago", miles: 3,
    coords: [35.2205, -80.8090],
    address: ["Near Central Ave & Hamorton Pl", "Charlotte, NC 28205"], keywords: "scooter bike swap meet event",
    description: [
      "Buy, sell or trade used scooters, bikes, helmets and parts. Saturday from 9am to 1pm in the parking lot.",
      "Free to browse, and seller tables are free too. Bring cash!",
    ],
  },
  {
    id: 38, title: "Golden retriever meetup", price: 0, category: "events",
    area: "NoDa", posted: "1d ago", postedLong: "1 day ago", miles: 1,
    coords: [35.2485, -80.8060],
    address: ["Near E 36th St & N Davidson St", "Charlotte, NC 28205"], keywords: "golden retriever dog meetup event",
    description: [
      "Monthly golden retriever playdate at the dog park, Saturday at 10am. Goldens and golden mixes of all ages are welcome!",
      "Bring water for your pup. Last month we had over 20 goldens show up.",
    ],
  },
  {
    id: 39, title: "Outdoor movie night", price: 5, category: "events",
    area: "Uptown", posted: "3d ago", postedLong: "3 days ago", miles: 4,
    coords: [35.2280, -80.8460],
    address: ["Romare Bearden Park area", "Charlotte, NC 28202"], keywords: "movie outdoor event night",
    description: [
      "Outdoor screening on Friday at dusk on the big lawn. $5 suggested donation, and food trucks will be on site.",
      "Bring a blanket or a low chair. It moves inside if it rains.",
    ],
  },
];

// shown as tips in the "no matches" state
const SUGGESTIONS = ["scooter", "golden retriever", "bike", "free"];

const params = new URLSearchParams(location.search);

/* ---------- SEARCH MATCHING (shared by suggestions + results) ---------- */
function queryWords(query) {
  return query.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

function listingText(item) {
  return [item.title, item.heading, item.keywords, CATEGORIES[item.category].label, item.area, item.price === 0 ? "free" : ""]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function matchesQuery(item, query) {
  const words = queryWords(query);
  if (!words.length) return true;
  const haystack = listingText(item);
  return words.every((word) => haystack.includes(word));
}

// best matches first: title starts with the query > title contains it > other fields
function rankListings(items, query) {
  const q = query.toLowerCase().trim();
  const score = (item) => {
    const title = item.title.toLowerCase();
    if (title.startsWith(q)) return 0;
    if (title.includes(q)) return 1;
    return 2;
  };
  return [...items].sort((a, b) => score(a) - score(b));
}

// returns a fragment with the matched words wrapped in <mark>
function highlight(text, query) {
  const words = queryWords(query).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const frag = document.createDocumentFragment();
  if (!words.length) {
    frag.append(text);
    return frag;
  }
  const pattern = new RegExp(`(${words.join("|")})`, "gi");
  text.split(pattern).forEach((part, i) => {
    if (!part) return;
    frag.append(i % 2 ? el("mark", "", part) : document.createTextNode(part));
  });
  return frag;
}

/* ---------- SIMULATED NETWORK ----------
   The site has no backend, so async actions (loading results, a listing,
   sending a message) go through this helper. It waits like a real request
   and fails when the browser is offline, so loading + error states are real. */
function fakeRequest(ms, value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (navigator.onLine === false) reject(new Error("offline"));
      else resolve(value);
    }, ms);
  });
}

function spinner(label = "Loading") {
  const s = el("span", "spinner");
  s.setAttribute("role", "presentation");
  s.setAttribute("aria-hidden", "true");
  s.title = label;
  return s;
}

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

/* ---------- SEARCH FIELD + LIVE SUGGESTIONS ---------- */
// Suggestions update on every keystroke (no submit needed), disappear when the
// input is cleared, and show a "no matches" message when nothing is found.
// On the search page, typing also filters the results grid live (search:input event).
function setupSearch(form) {
  const input = form.querySelector(".search__input");
  const clear = form.querySelector(".search__clear");
  const onSearchPage = document.body.dataset.page === "search";

  const list = el("ul", "suggestions");
  list.hidden = true;
  list.id = "suggestions-" + Math.random().toString(36).slice(2, 7);
  list.setAttribute("role", "listbox");
  list.setAttribute("aria-label", "Search suggestions");
  form.append(list);

  // screen-reader announcement of how many suggestions there are
  const status = el("span", "visually-hidden");
  status.setAttribute("aria-live", "polite");
  form.append(status);

  input.setAttribute("role", "combobox");
  input.setAttribute("aria-controls", list.id);
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-expanded", "false");

  const current = params.get("q");
  if (current && onSearchPage) input.value = current;

  let activeIndex = -1;

  function options() {
    return [...list.querySelectorAll("[role='option']")];
  }

  function setActive(index) {
    const opts = options();
    opts.forEach((o) => o.classList.remove("is-active"));
    activeIndex = opts.length ? (index + opts.length) % opts.length : -1;
    if (activeIndex >= 0) {
      const active = opts[activeIndex];
      active.classList.add("is-active");
      input.setAttribute("aria-activedescendant", active.id);
      active.scrollIntoView({ block: "nearest" });
    } else {
      input.removeAttribute("aria-activedescendant");
    }
  }

  function option(href, className) {
    const li = el("li");
    li.setAttribute("role", "presentation");
    const link = el("a", className);
    link.href = href;
    link.id = list.id + "-opt-" + list.querySelectorAll("[role='option']").length;
    link.setAttribute("role", "option");
    link.tabIndex = -1;
    li.append(link);
    list.append(li);
    return link;
  }

  function label(text) {
    const li = el("li", "suggestions__label", text);
    li.setAttribute("role", "presentation");
    list.append(li);
  }

  function hide() {
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
    setActive(-1);
  }

  function show() {
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  function renderSuggestions() {
    const query = input.value.trim();
    list.replaceChildren();
    activeIndex = -1;
    input.removeAttribute("aria-activedescendant");

    // cleared input → suggestions disappear
    if (!query) {
      hide();
      status.textContent = "";
      return;
    }

    const matches = rankListings(LISTINGS.filter((item) => matchesQuery(item, query)), query);

    if (matches.length === 0) {
      const empty = el("li", "suggestions__empty");
      empty.setAttribute("role", "presentation");
      empty.append(el("strong", "", `No matches for “${query}”`));
      const tip = el("span", "", "Check the spelling or try ");
      const tips = SUGGESTIONS.filter((t) => !queryWords(query).includes(t)).slice(0, 2);
      tips.forEach((term, i) => {
        const a = el("a", "suggestions__tip", term);
        a.href = "search.html?q=" + encodeURIComponent(term);
        tip.append(i ? " or " : "", a);
      });
      empty.append(tip);
      list.append(empty);
      status.textContent = "No suggestions";
      show();
      return;
    }

    label("Listings");
    matches.slice(0, 5).forEach((item) => {
      const link = option("listing.html?id=" + item.id, "suggestion");
      const thumb = el("span", "suggestion__thumb");
      thumb.append(img(item.image || CATEGORIES[item.category].icon, item.image ? "" : "icon"));
      const text = el("span", "suggestion__text");
      const title = el("span", "suggestion__title");
      title.append(highlight(item.title, query));
      const metaParts = item.price === null ? [CATEGORIES[item.category].label, item.area] : [formatPrice(item), CATEGORIES[item.category].label, item.area];
      text.append(title, el("span", "suggestion__meta", metaParts.join(" · ")));
      link.append(thumb, text);
    });

    // categories that contain matches
    const byCategory = {};
    matches.forEach((item) => (byCategory[item.category] = (byCategory[item.category] || 0) + 1));
    const cats = Object.entries(byCategory).sort((a, b) => b[1] - a[1]).slice(0, 3);
    if (cats.length > 1) {
      label("In categories");
      cats.forEach(([cat, n]) => {
        const link = option(`search.html?q=${encodeURIComponent(query)}&category=${cat}`, "suggestion suggestion--category");
        link.append(`“${query}” in `, el("strong", "", CATEGORIES[cat].label), el("span", "suggestion__count", String(n)));
      });
    }

    const all = option("search.html?q=" + encodeURIComponent(query), "suggestion suggestion--all");
    all.textContent = `See all ${matches.length} result${matches.length === 1 ? "" : "s"} for “${query}”`;

    status.textContent = `${matches.length} matching listing${matches.length === 1 ? "" : "s"}`;
    show();
  }

  function sync() {
    form.classList.toggle("has-text", input.value.length > 0);
  }
  sync();

  input.addEventListener("input", () => {
    sync();
    renderSuggestions();
    if (onSearchPage) document.dispatchEvent(new CustomEvent("search:input", { detail: input.value }));
  });
  input.addEventListener("focus", () => {
    if (input.value.trim()) renderSuggestions();
  });
  clear.addEventListener("click", () => {
    input.value = "";
    sync();
    renderSuggestions();
    if (onSearchPage) document.dispatchEvent(new CustomEvent("search:input", { detail: "" }));
    input.focus();
  });
  // close when focus or clicks leave the form
  form.addEventListener("focusout", (event) => {
    if (!form.contains(event.relatedTarget)) hide();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      if (list.hidden) renderSuggestions();
      if (list.hidden) return;
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive(activeIndex === -1 && step === -1 ? -1 + options().length : activeIndex + step);
    } else if (event.key === "Escape") {
      hide();
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      location.href = options()[activeIndex].href;
    }
  });
  form.addEventListener("submit", (event) => {
    if (!input.value.trim()) {
      event.preventDefault();
      input.focus();
      return;
    }
    // results already update live on the search page — just close the list
    if (onSearchPage) {
      event.preventDefault();
      hide();
      input.blur();
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
function listingCard(item, index = 0) {
  const li = el("li");
  const link = el("a", "listing-card");
  link.href = "listing.html?id=" + item.id;
  link.style.setProperty("--i", Math.min(index, 12)); // staggers the fade-in

  const thumb = el("div", "listing-card__thumb");
  if (item.image) {
    const photo = img(item.image, "listing-card__photo");
    photo.alt = item.title;
    photo.loading = "lazy";
    thumb.classList.add("listing-card__thumb--photo", "is-loading"); // shimmer until the photo arrives
    const done = () => thumb.classList.remove("is-loading");
    photo.addEventListener("load", done, { once: true });
    photo.addEventListener("error", done, { once: true });
    if (photo.complete) done();
    thumb.append(photo);
  } else {
    thumb.append(img(CATEGORIES[item.category].icon, "icon"));
  }

  const body = el("div", "listing-card__body");
  const meta = el("p", "listing-card__meta");
  meta.append(img("assets/icon-location.svg", "icon-muted"), document.createTextNode(`${item.area} · ${item.posted}`));
  body.append(el("p", "listing-card__price", formatPrice(item)), el("h2", "listing-card__title", item.title), meta);

  link.append(thumb, body);
  li.append(link);
  return li;
}

function skeletonCards(n) {
  return Array.from({ length: n }, () => {
    const li = el("li", "skeleton-card");
    li.setAttribute("aria-hidden", "true");
    li.append(el("div", "skeleton skeleton--thumb"), el("div", "skeleton skeleton--line skeleton--short"), el("div", "skeleton skeleton--line"), el("div", "skeleton skeleton--line skeleton--mid"));
    return li;
  });
}

/* ---------- PAGE: SEARCH RESULTS ---------- */
function initSearchPage() {
  const startCategory = params.get("category");
  const heading = document.getElementById("results-heading");
  const grid = document.getElementById("results-grid");
  const count = document.getElementById("results-count");
  const loading = document.getElementById("loading");
  const loadingGrid = document.getElementById("loading-grid");
  const loadingQuery = document.getElementById("loading-query");
  const results = document.getElementById("results-page");
  const sortButtons = document.querySelectorAll("[data-sort]");

  const state = {
    query: (params.get("q") || "").trim(),
    category: CATEGORIES[startCategory] ? startCategory : null,
    distance: null,
    price: null,
    sort: null,
  };
  let data = null; // listings, once "fetched"

  const PRICE_RANGES = {
    under50: (p) => p !== null && p < 50,
    "50to200": (p) => p !== null && p >= 50 && p <= 200,
    over200: (p) => p !== null && p > 200,
  };

  function updateHeading() {
    const catLabel = state.category ? CATEGORIES[state.category].label : null;
    if (state.query) {
      heading.textContent = `Search Results for: ${state.query}`;
      document.title = `${state.query} — craigslist`;
    } else if (catLabel) {
      heading.textContent = catLabel;
      document.title = `${catLabel} — craigslist`;
    } else {
      heading.textContent = "All listings";
      document.title = "Search results — craigslist";
    }
  }

  function matches(item) {
    if (!matchesQuery(item, state.query)) return false;
    if (state.category && item.category !== state.category) return false;
    if (state.distance && item.miles > Number(state.distance)) return false;
    if (state.price && !PRICE_RANGES[state.price](item.price)) return false;
    return true;
  }

  function render() {
    if (!data) return;
    let items = data.filter(matches);
    if (state.query && !state.sort) items = rankListings(items, state.query);
    // posts without a price always go last
    if (state.sort === "asc") items = [...items].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (state.sort === "desc") items = [...items].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));

    grid.replaceChildren(...items.map(listingCard));
    count.textContent = `${items.length} result${items.length === 1 ? "" : "s"}`;

    if (items.length === 0) {
      const empty = el("li", "empty-state");
      empty.style.gridColumn = "1 / -1";
      const what = state.query ? `No listings match “${state.query}”` : "No listings found";
      empty.append(el("strong", "", what), document.createTextNode("Try a different search or clear a filter."));
      // searched + filtered to a category: offer that whole category without the search
      if (state.query && state.category) {
        const label = CATEGORIES[state.category].label;
        const link = el("a", "btn btn--outline empty-state__action", `See all ${label}`);
        link.href = "search.html?category=" + state.category;
        empty.append(link);
      }
      grid.append(empty);
    }
  }

  // live search from the subnav field — results update on every keystroke,
  // and clearing the field resets back to the full view
  document.addEventListener("search:input", (event) => {
    state.query = event.detail.trim();
    const url = new URL(location.href);
    if (state.query) url.searchParams.set("q", state.query);
    else url.searchParams.delete("q");
    history.replaceState(null, "", url);
    updateHeading();
    render();
  });

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
      updateHeading();
      render();
    });
  });
  syncChips();

  // filter group headers expand / collapse (animated via CSS grid rows)
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

  // loading state: progress bar + skeleton cards while listings "fetch"
  function load() {
    loadingQuery.textContent = state.query || (state.category ? CATEGORIES[state.category].label : "everything");
    loading.classList.remove("has-error");
    loading.querySelector(".loading__error")?.remove();
    loadingGrid.replaceChildren(...skeletonCards(8));
    loading.hidden = false;
    results.hidden = true;
    document.getElementById("main").setAttribute("aria-busy", "true");

    fakeRequest(700, LISTINGS)
      .then((listings) => {
        data = listings;
        loading.hidden = true;
        results.hidden = false;
        render();
      })
      .catch(() => {
        // failed fetch: stop the progress bar, say what happened, offer a retry
        loading.classList.add("has-error");
        loadingGrid.replaceChildren();
        const box = el("div", "loading__error");
        box.setAttribute("role", "alert");
        box.append(el("strong", "", "Couldn’t load listings"), el("p", "", "Check your internet connection and try again."));
        const retry = el("button", "btn btn--primary", "Try again");
        retry.type = "button";
        retry.addEventListener("click", load);
        box.append(retry);
        loading.append(box);
      })
      .finally(() => document.getElementById("main").setAttribute("aria-busy", "false"));
  }

  updateHeading();
  load();
}

/* ---------- PAGE: LISTING DETAILS ---------- */
function initListingPage() {
  const item = findListing(params.get("id"));
  if (!item) {
    location.replace("404.html");
    return;
  }
  const layout = document.querySelector(".listing__layout");
  const contactLinks = document.querySelectorAll("[data-contact-link]");

  // skeleton shimmer while the listing "loads"; contact buttons wait too
  layout.classList.add("is-loading");
  layout.setAttribute("aria-busy", "true");
  contactLinks.forEach((link) => link.setAttribute("aria-disabled", "true"));

  fakeRequest(450, item)
    .then(fillListing)
    .catch(() => {
      layout.classList.remove("is-loading");
      layout.setAttribute("aria-busy", "false");
      document.getElementById("listing-title").textContent = "Couldn’t load this listing";
      const desc = document.getElementById("listing-desc");
      const retry = el("button", "btn btn--primary", "Try again");
      retry.type = "button";
      retry.addEventListener("click", () => location.reload());
      desc.replaceChildren(el("p", "", "Check your internet connection and try again."), retry);
      desc.setAttribute("role", "alert");
    });

  function fillListing() {
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
    const listingImage = document.getElementById("listing-icon");
    const thumb = listingImage.parentElement;
    if (item.image) {
      thumb.classList.add("listing__thumb--photo", "is-loading");
      const done = () => thumb.classList.remove("is-loading");
      listingImage.addEventListener("load", done, { once: true });
      listingImage.addEventListener("error", done, { once: true });
      listingImage.src = item.image;
      listingImage.alt = heading;
      listingImage.classList.remove("icon");
      listingImage.classList.add("listing__photo");
      if (item.imageInset) listingImage.classList.add("listing__photo--inset");
      if (listingImage.complete) done();
    } else {
      listingImage.src = category.icon.replace("icon-for-sale.svg", "icon-for-sale-lg.svg");
    }
    document.getElementById("listing-desc").replaceChildren(...item.description.map((text) => el("p", "", text)));

    const address = document.getElementById("listing-address");
    address.replaceChildren();
    item.address.forEach((line, i) => {
      if (i > 0) address.append(el("br"));
      address.append(line);
    });

    contactLinks.forEach((link) => {
      link.href = "contact.html?id=" + item.id;
      link.removeAttribute("aria-disabled");
    });

    layout.classList.remove("is-loading");
    layout.classList.add("is-loaded"); // fades the content in
    layout.setAttribute("aria-busy", "false");
    renderMap(item);
  }
}

/* ---------- LISTING MAP (Leaflet + OpenStreetMap) ---------- */
function renderMap(item) {
  const [lat, lng] = item.coords;
  document.getElementById("listing-directions").href =
    `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  const slot = document.getElementById("listing-map");

  // map library couldn't load (offline, blocked): say so instead of a blank box
  if (!window.L) {
    slot.append(el("p", "map-status", "Map unavailable — use “Open in Google Maps”."));
    return;
  }

  const box = el("div", "location-card__leaflet");
  const overlay = el("div", "map-loading");
  overlay.setAttribute("role", "status");
  overlay.append(spinner(), el("span", "", "Loading map…"));
  slot.replaceChildren(box, overlay);
  slot.classList.add("has-map");

  const map = L.map(box, { scrollWheelZoom: false }).setView([lat, lng], 15);
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // hide the spinner once tiles arrive; if they never do, explain instead of spinning forever
  const timeout = setTimeout(() => {
    overlay.replaceChildren(el("span", "", "Map couldn’t load — use “Open in Google Maps”."));
    overlay.classList.add("is-error");
  }, 8000);
  tiles.once("load", () => {
    clearTimeout(timeout);
    overlay.classList.add("is-done");
    overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
    setTimeout(() => overlay.remove(), 400);
  });

  // circle = approximate area, like real Craigslist posts
  L.circle([lat, lng], { radius: 250, color: "#5b2a86", weight: 2, fillOpacity: 0.15 }).addTo(map);
  L.marker([lat, lng], {
    icon: L.icon({ iconUrl: "assets/location-on.svg", iconSize: [40, 40], iconAnchor: [20, 36] }),
    alt: "Approximate location",
    keyboard: false,
  }).addTo(map);
}

/* ---------- PAGE: CONTACT SELLER ---------- */
function initContactPage() {
  const item = findListing(params.get("id"));
  const form = document.getElementById("message-form");
  const field = document.getElementById("message");
  const counter = document.getElementById("message-count");
  const error = document.getElementById("message-error");
  const sendError = document.getElementById("send-error");
  const submit = form.querySelector("button[type='submit']");
  const submitLabel = submit.textContent;
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

  function setSending(sending) {
    submit.disabled = sending;
    field.readOnly = sending;
    form.setAttribute("aria-busy", String(sending));
    submit.classList.toggle("is-busy", sending);
    submit.replaceChildren(...(sending ? [spinner(), "Sending…"] : [submitLabel]));
  }

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
    if (submit.disabled) return; // no double sends
    sendError.hidden = true;
    if (!field.value.trim()) {
      form.classList.add("has-error");
      field.setAttribute("aria-invalid", "true");
      error.hidden = false;
      field.focus();
      return;
    }

    setSending(true);
    fakeRequest(1200)
      .then(() => {
        setSending(false);
        field.value = "";
        updateCount();
        dialog.showModal();
      })
      .catch(() => {
        // keep their message so they can retry
        setSending(false);
        sendError.hidden = false;
        submit.textContent = "Try again";
      });
  });

  dialog.querySelector("[data-done]").addEventListener("click", () => {
    const referrer = document.referrer ? new URL(document.referrer) : null;
    const cameFromListing =
      referrer?.origin === location.origin && referrer.pathname.endsWith("/listing.html");

    if (item && cameFromListing && history.length > 1) {
      history.back();
      return;
    }

    location.replace(item ? "listing.html?id=" + item.id : "index.html");
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
