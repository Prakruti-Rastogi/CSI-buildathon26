// ===============================================================
//  RangManch gallery
//  The page address decides which craft you see, e.g.
//    gallery.html?category=pottery
//  Allowed words: pottery, textile, painting, jewellery
//  (anything else shows every craft)
// ===============================================================

// ---------- The crafts ----------

const CATEGORIES = {
  all: {
    title: "Discover Indian Art",
    description: "Explore beautiful creations made by talented artisans.",
  },
  pottery: {
    title: "Pottery",
    description:
      "Shaped by skilled hands, every curve carries the warmth of the earth.",
  },
  textile: {
    title: "Textiles",
    description:
      "Woven threads and printed patterns fall into a living work of art.",
  },
  painting: {
    title: "Paintings",
    description:
      "Vibrant colours and intricate folk-art patterns preserve generations of Indian storytelling.",
  },
  jewellery: {
    title: "Jewellery",
    description:
      "Intricate details and traditional craftsmanship turn every piece into a keepsake.",
  },
};

// The picture shown on each card. Give an artwork its own picture by
// adding  image: "images/your-file.png"  to it in the list below.
const CATEGORY_IMAGES = {
  pottery: "images/pottery.png",
  textile: "images/blockprint.png",
  painting: "images/painting.png",
  jewellery: "images/jewellery.png",
};

// ---------- The artworks (SAMPLE DATA: replace with your real ones) ----------

const ARTWORKS = [
  // Pottery
  {
    name: "Terracotta Water Pot",
    artist: "Meera Prajapati",
    category: "pottery",
    price: 1800,
    story: "Hand-thrown and fired in a village kiln, it keeps water naturally cool.",
  },
  {
    name: "Jaipur Blue Pottery Vase",
    artist: "Salim Qureshi",
    category: "pottery",
    price: 2600,
    story: "Painted with cobalt flowers in a style that has travelled to Jaipur over centuries.",
  },
  {
    name: "Khurja Ceramic Bowl Set",
    artist: "Anita Verma",
    category: "pottery",
    price: 1450,
    story: "Bright glazes and hand-painted borders make everyday meals feel special.",
  },
  {
    name: "Black Longpi Dinner Plate",
    artist: "Thangjam Devi",
    category: "pottery",
    price: 2100,
    story: "Shaped by hand in Manipur and polished with a smooth river stone.",
  },
  {
    name: "Diya Set of Twelve",
    artist: "Ramesh Kumbhar",
    category: "pottery",
    price: 650,
    story: "Little clay lamps, each pressed and dried in the sun before firing.",
  },

  // Textiles
  {
    name: "Bagru Block-Print Dupatta",
    artist: "Kiran Chhipa",
    category: "textile",
    price: 1200,
    story: "Carved wooden blocks and natural dyes, pressed by hand one print at a time.",
  },
  {
    name: "Ajrakh Cotton Stole",
    artist: "Imran Khatri",
    category: "textile",
    price: 1950,
    story: "Washed, dyed and printed many times over, in deep indigo and madder red.",
  },
  {
    name: "Kantha Stitch Throw",
    artist: "Rupa Mondal",
    category: "textile",
    price: 3400,
    story: "Layers of old saris joined with running stitch, a Bengal tradition of care.",
  },
  {
    name: "Ikat Silk Scarf",
    artist: "Lakshmi Devi",
    category: "textile",
    price: 2750,
    story: "The threads are dyed before weaving, so the pattern appears as the cloth grows.",
  },
  {
    name: "Chanderi Table Runner",
    artist: "Pooja Sahu",
    category: "textile",
    price: 1600,
    story: "Light as air, woven from silk and cotton with tiny golden motifs.",
  },

  // Paintings
  {
    name: "Radha and Krishna in Madhubani",
    artist: "Sunita Jha",
    category: "painting",
    price: 4500,
    story: "Painted with natural pigments and a bamboo nib in the Mithila style.",
  },
  {
    name: "Warli Village Life",
    artist: "Bhagyashree Wagh",
    category: "painting",
    price: 2200,
    story: "Simple white shapes on mud-brown paper tell of harvest, dance and community.",
  },
  {
    name: "Pattachitra Dashavatara Scroll",
    artist: "Raghunath Maharana",
    category: "painting",
    price: 6800,
    story: "The ten forms of Vishnu, painted on cloth in the old Odisha tradition.",
  },
  {
    name: "Gond Tree of Life",
    artist: "Sarita Uikey",
    category: "painting",
    price: 3100,
    story: "Dots and lines give every leaf and bird its own rhythm.",
  },
  {
    name: "Kalamkari Peacock Panel",
    artist: "Venkat Rao",
    category: "painting",
    price: 3900,
    story: "Drawn with a bamboo pen and coloured with dyes made from plants.",
  },

  // Jewellery
  {
    name: "Temple Haar Necklace",
    artist: "Vasantha Achari",
    category: "jewellery",
    price: 14500,
    story: "Goddess figures set in gold-plated silver, a South Indian temple tradition.",
  },
  {
    name: "Meenakari Jhumka Earrings",
    artist: "Harjeet Soni",
    category: "jewellery",
    price: 3800,
    story: "Bright enamel poured into tiny engraved cells and fired until it shines.",
  },
  {
    name: "Kundan Choker",
    artist: "Dilip Sonar",
    category: "jewellery",
    price: 8900,
    story: "Stones are set one by one in thin gold foil, a craft passed down in families.",
  },
  {
    name: "Dhokra Brass Pendant",
    artist: "Mamta Mahato",
    category: "jewellery",
    price: 1350,
    story: "Cast by the lost-wax method, so every pendant is one of a kind.",
  },
  {
    name: "Silver Filigree Bracelet",
    artist: "Prasanna Rout",
    category: "jewellery",
    price: 5200,
    story: "Fine silver wire from Cuttack, twisted and coiled into lace-like patterns.",
  },
];

// Give every artwork a number and its picture.
ARTWORKS.forEach((art, index) => {
  art.id = index + 1;
  art.image = art.image || CATEGORY_IMAGES[art.category];
});

// ---------- Which craft are we showing? ----------

const params = new URLSearchParams(window.location.search);
const requested = params.get("category");
const categoryKey = CATEGORIES[requested] ? requested : "all";
const category = CATEGORIES[categoryKey];

const artworksHere =
  categoryKey === "all"
    ? ARTWORKS
    : ARTWORKS.filter((art) => art.category === categoryKey);

// ---------- Parts of the page ----------

const titleEl = document.getElementById("category-title");
const descriptionEl = document.getElementById("category-description");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");
const grid = document.getElementById("artwork-grid");
const emptyState = document.getElementById("empty-state");
const resultsCount = document.getElementById("results-count");

const artistsButton = document.getElementById("artists-button");
const artistsLabel = document.getElementById("artists-label");
const artistsMenu = document.getElementById("artists-menu");

const buyDialog = document.getElementById("buy-dialog");
const buyMessage = document.getElementById("buy-message");
const confirmBuy = document.getElementById("confirm-buy");
const closeDialog = document.getElementById("close-dialog");

// What the visitor has chosen so far.
let searchText = "";
let selectedArtist = "all";
let sortBy = "featured";
let chosenArtwork = null;

// ---------- Small helpers ----------

const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

// A simple picture shown if an image file can't be found.
const placeholder =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
      '<rect width="400" height="400" rx="24" fill="#58212a"/>' +
      '<text x="200" y="210" font-size="26" text-anchor="middle" ' +
      'fill="#f7e6d4" font-family="Georgia">Image coming soon</text></svg>'
  );

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

// ---------- Heading ----------

titleEl.textContent = category.title;
descriptionEl.textContent = category.description;
document.title = `${category.title} | RangManch`;

// ---------- Building one artwork card ----------

function buildCard(art) {
  const card = makeElement("article", "artwork-card");

  const imageBox = makeElement("div", "artwork-image");
  const image = document.createElement("img");
  image.src = art.image;
  image.alt = art.name;
  image.loading = "lazy";
  image.addEventListener("error", () => {
    if (image.src !== placeholder) image.src = placeholder;
  });
  imageBox.append(image);

  const info = makeElement("div", "artwork-info");

  const tag = makeElement(
    "p",
    "artwork-tag",
    CATEGORIES[art.category].title
  );
  const name = makeElement("h3", "", art.name);
  const artist = makeElement("p", "artwork-artist", `by ${art.artist}`);
  const story = makeElement("p", "artwork-story", art.story);

  const footer = makeElement("div", "artwork-footer");
  const price = makeElement("span", "artwork-price", rupees.format(art.price));
  const button = makeElement("button", "buy-button", "I'm Interested");
  button.type = "button";
  button.addEventListener("click", () => openDialog(art));
  footer.append(price, button);

  info.append(tag, name, artist, story, footer);
  card.append(imageBox, info);

  return card;
}

// ---------- Showing the right artworks ----------

function render() {
  const words = searchText.trim().toLowerCase();

  // 1. Filter by artist and by search words.
  let shown = artworksHere.filter((art) => {
    const artistMatches =
      selectedArtist === "all" || art.artist === selectedArtist;

    const searchMatches =
      words === "" ||
      art.name.toLowerCase().includes(words) ||
      art.artist.toLowerCase().includes(words);

    return artistMatches && searchMatches;
  });

  // 2. Sort.
  shown = [...shown];

  if (sortBy === "low") shown.sort((a, b) => a.price - b.price);
  if (sortBy === "high") shown.sort((a, b) => b.price - a.price);
  if (sortBy === "name") shown.sort((a, b) => a.name.localeCompare(b.name));

  // 3. Draw.
  grid.replaceChildren(...shown.map(buildCard));
  emptyState.hidden = shown.length > 0;

  resultsCount.textContent =
    shown.length === 0
      ? "No artworks to show"
      : `Showing ${shown.length} ${shown.length === 1 ? "artwork" : "artworks"}`;
}

// ---------- Search and sort ----------

searchInput.addEventListener("input", () => {
  searchText = searchInput.value;
  render();
});

sortSelect.addEventListener("change", () => {
  sortBy = sortSelect.value;
  render();
});

// ---------- Artists dropdown ----------

function closeArtistsMenu() {
  artistsMenu.hidden = true;
  artistsButton.setAttribute("aria-expanded", "false");
}

function buildArtistsMenu() {
  const names = [...new Set(artworksHere.map((art) => art.artist))].sort();
  const choices = [{ value: "all", label: "All artists" }].concat(
    names.map((name) => ({ value: name, label: name }))
  );

  const buttons = choices.map((choice) => {
    const button = makeElement("button", "", choice.label);
    button.type = "button";
    button.setAttribute(
      "aria-current",
      String(choice.value === selectedArtist)
    );

    button.addEventListener("click", () => {
      selectedArtist = choice.value;
      artistsLabel.textContent = choice.label;

      artistsMenu
        .querySelectorAll("button")
        .forEach((other) =>
          other.setAttribute("aria-current", String(other === button))
        );

      closeArtistsMenu();
      render();
    });

    return button;
  });

  artistsMenu.replaceChildren(...buttons);
}

artistsButton.addEventListener("click", () => {
  const isOpening = artistsMenu.hidden;
  artistsMenu.hidden = !isOpening;
  artistsButton.setAttribute("aria-expanded", String(isOpening));
});

// Close the menu when clicking somewhere else, or pressing Escape.
document.addEventListener("click", (event) => {
  if (
    !artistsMenu.contains(event.target) &&
    !artistsButton.contains(event.target)
  ) {
    closeArtistsMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeArtistsMenu();
});

// ---------- "Interested?" pop-up ----------

function openDialog(art) {
  chosenArtwork = art;

  buyMessage.textContent =
    `“${art.name}” by ${art.artist} · ${rupees.format(art.price)}. ` +
    "Confirm and we'll let the artist know you'd love to bring it home.";

  confirmBuy.hidden = false;
  buyDialog.showModal();
}

confirmBuy.addEventListener("click", () => {
  buyMessage.textContent =
    `Thank you! ${chosenArtwork.artist} will be told about your interest ` +
    `in “${chosenArtwork.name}”.`;

  confirmBuy.hidden = true;
});

closeDialog.addEventListener("click", () => buyDialog.close());

// Clicking the dark area outside the pop-up also closes it.
buyDialog.addEventListener("click", (event) => {
  if (event.target === buyDialog) buyDialog.close();
});

// ---------- Start ----------

buildArtistsMenu();
render();
