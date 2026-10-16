const crafts = [
  {
    category: "POTTERY",
    title: "Earthy forms.",
    secondLine: "Endless stories.",
    description:
      "Shaped by skilled hands, every curve carries the warmth of the earth.",
    image: "images/pottery.jpg",
    shape: "pottery",
    button: "Explore Pottery",
    alt: "Handcrafted Indian pottery",
  },
  {
    category: "TEXTILES",
    title: "Let tradition",
    secondLine: "flow.",
    description:
      "Woven threads and printed patterns fall into a living work of art.",
    image: "images/textiles.jpg",
    shape: "textile",
    button: "Explore Textiles",
    alt: "Traditional Indian textile drape",
  },
  {
    category: "PAINTINGS",
    title: "Stories in",
    secondLine: "every stroke.",
    description:
      "Vibrant colours and intricate folk-art patterns preserve generations of Indian storytelling.",
    image: "images/krishna-radha-folk-art.jpg",
    shape: "painting",
    button: "Explore Paintings",
    alt: "Krishna and Radha Indian folk-art painting",
  },
  {
    category: "JEWELLERY",
    title: "Treasures that",
    secondLine: "shine.",
    description:
      "Intricate details and traditional craftsmanship turn every piece into a keepsake.",
    image: "images/jewellery.jpg",
    shape: "jewellery",
    button: "Explore Jewellery",
    alt: "Traditional Indian jewellery",
  },
];

let activeIndex = 1;

const eyebrow = document.getElementById("eyebrow");
const heading = document.getElementById("heading");
const description = document.getElementById("description");
const artwork = document.getElementById("artwork");
const exploreButton = document.getElementById("explore");
const slideCount = document.getElementById("slide-count");

let heroImage = document.getElementById("hero-image");

const tabs = document.querySelectorAll(".craft-tab");
const galleryCards = document.querySelectorAll(".gallery-card");

function restartAnimation(craft) {
  // Remove the old image and create a fresh one to restart animation.
  const newImage = document.createElement("img");

  newImage.id = "hero-image";
  newImage.src = craft.image;
  newImage.alt = craft.alt;

  heroImage.replaceWith(newImage);
  heroImage = newImage;

  // Reset the animation class.
  artwork.classList.remove(
    "pottery",
    "textile",
    "painting",
    "jewellery"
  );

  void artwork.offsetWidth;

  artwork.classList.add(craft.shape);
}

function showCraft(index) {
  activeIndex = (index + crafts.length) % crafts.length;

  const craft = crafts[activeIndex];

  eyebrow.textContent =
    `${String(activeIndex + 1).padStart(2, "0")} / 04 — ${craft.category}`;

  // Create the heading safely without inserting HTML strings.
  heading.replaceChildren();

  heading.append(
    document.createTextNode(craft.title),
    document.createElement("br"),
    document.createTextNode(craft.secondLine)
  );

  description.textContent = craft.description;

  exploreButton.replaceChildren(
    document.createTextNode(craft.button + " "),
    Object.assign(document.createElement("span"), {
      textContent: "→",
      "aria-hidden": "true",
    })
  );

  slideCount.textContent =
    `${String(activeIndex + 1).padStart(2, "0")} / 04`;

  restartAnimation(craft);

  // Update the category buttons.
  tabs.forEach((tab, index) => {
    const selected = index === activeIndex;

    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-pressed", String(selected));
  });

  // Update the gallery cards.
  galleryCards.forEach((card, index) => {
    const selected = index === activeIndex;

    card.classList.toggle("active", selected);
    card.setAttribute("aria-pressed", String(selected));
  });
}

// Category buttons.
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    showCraft(Number(tab.dataset.index));
  });
});

// Gallery cards.
galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    showCraft(Number(card.dataset.index));

    document.querySelector(".hero").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Previous and next arrows.
document.getElementById("previous").addEventListener("click", () => {
  showCraft(activeIndex - 1);
});

document.getElementById("next").addEventListener("click", () => {
  showCraft(activeIndex + 1);
});

// Replay the current artwork animation.
document.getElementById("replay").addEventListener("click", () => {
  restartAnimation(crafts[activeIndex]);
});

// Explore button.
exploreButton.addEventListener("click", () => {
  document.getElementById("crafts").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// Start on textiles so the falling-drape animation plays first.
showCraft(1);
