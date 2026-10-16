const crafts = [
  {
    category: "POTTERY",
    title: "Earthy forms.",
    secondLine: "Endless stories.",
    description:
      "Shaped by skilled hands, every curve carries the warmth of the earth.",
    image: "images/pottery.png",
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
    image: "images/blockprint.png",
    shape: "textile",
    painted: true, // paint this craft on with brush strokes
    button: "Explore Textiles",
    alt: "Traditional Indian textile making",
  },
  {
    category: "PAINTINGS",
    title: "Stories in",
    secondLine: "every stroke.",
    description:
      "Vibrant colours and intricate folk-art patterns preserve generations of Indian storytelling.",
    image: "images/painting.png",
    shape: "painting",
    button: "Explore Paintings",
    alt: "Indian folk-art painting",
  },
  {
    category: "JEWELLERY",
    title: "Treasures that",
    secondLine: "shine.",
    description:
      "Intricate details and traditional craftsmanship turn every piece into a keepsake.",
    image: "images/jewellery.png",
    shape: "jewellery",
    button: "Explore Jewellery",
    alt: "Traditional Indian jewellery",
  },
];

let activeIndex = 1;

// If an image file is missing, show a simple placeholder instead of a broken icon.
const placeholder =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">' +
    '<rect width="400" height="400" rx="24" fill="#58212a"/>' +
    '<text x="200" y="210" font-size="26" text-anchor="middle" ' +
    'fill="#f7e6d4" font-family="Georgia">Image coming soon</text></svg>'
  );

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    if (img.src !== placeholder) img.src = placeholder;
  });
});

const eyebrow = document.getElementById("eyebrow");
const heading = document.getElementById("heading");
const description = document.getElementById("description");
const artwork = document.getElementById("artwork");
const exploreButton = document.getElementById("explore");
const slideCount = document.getElementById("slide-count");

let heroImage = document.getElementById("hero-image");

const tabs = document.querySelectorAll(".craft-tab");
const galleryCards = document.querySelectorAll(".gallery-card");

// ---------------------------------------------------------------
// Showing the hero picture
// ---------------------------------------------------------------

let paintFrame = 0; // id of the running paint animation
let paintRun = 0;   // goes up each time, so an old animation can stop itself

// Put a normal <img> in the hero.
function showPlainImage(craft) {
  const newImage = document.createElement("img");

  newImage.id = "hero-image";
  newImage.src = craft.image;
  newImage.alt = craft.alt;
  newImage.addEventListener("error", () => {
    newImage.src = placeholder;
  });

  heroImage.replaceWith(newImage);
  heroImage = newImage;
}

function restartAnimation(craft) {
  // Stop any paint animation that is still running.
  paintRun++;
  cancelAnimationFrame(paintFrame);

  // Reset the animation class.
  artwork.classList.remove("pottery", "textile", "painting", "jewellery");
  void artwork.offsetWidth;
  artwork.classList.add(craft.shape);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (craft.painted && !reduceMotion) {
    paintOnto(craft, paintRun);
  } else {
    showPlainImage(craft);
  }
}

// ---------------------------------------------------------------
// Painting the picture on with diagonal brush strokes
// ---------------------------------------------------------------

function paintOnto(craft, run) {
  // A blank canvas takes the picture's place while the image loads.
  const canvas = document.createElement("canvas");
  const ratio = window.devicePixelRatio || 1;

  canvas.id = "hero-image";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", craft.alt);
  canvas.width = Math.max(1, Math.round(artwork.clientWidth * ratio));
  canvas.height = Math.max(1, Math.round(artwork.clientHeight * ratio));

  heroImage.replaceWith(canvas);
  heroImage = canvas;

  const source = new Image();

  source.onload = () => {
    if (run === paintRun) brushStrokes(canvas, source, craft, run, ratio);
  };

  source.onerror = () => {
    if (run === paintRun) showPlainImage(craft);
  };

  source.src = craft.image;
}

function brushStrokes(canvas, source, craft, run, ratio) {
  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext("2d");

  // 1. The finished picture, fitted into the box (like object-fit: contain).
  const picture = document.createElement("canvas");
  picture.width = W;
  picture.height = H;

  const fit = Math.min(W / source.naturalWidth, H / source.naturalHeight);
  const pw = source.naturalWidth * fit;
  const ph = source.naturalHeight * fit;

  picture
    .getContext("2d")
    .drawImage(source, (W - pw) / 2, (H - ph) / 2, pw, ph);

  // 2. A see-through layer where the "paint" is laid down.
  //    Wherever paint exists, the picture shows through.
  const paint = document.createElement("canvas");
  paint.width = W;
  paint.height = H;

  const pctx = paint.getContext("2d");
  pctx.strokeStyle = "#000";
  pctx.lineCap = "round";
  pctx.lineJoin = "round";

  // Direction of the strokes: 35 degrees, going down and to the right.
  const angle = (35 * Math.PI) / 180;
  const ux = Math.cos(angle); // along the stroke
  const uy = Math.sin(angle);
  const vx = -uy;             // across the stroke
  const vy = ux;

  // How far the strokes need to reach to cover the whole box.
  const corners = [[0, 0], [W, 0], [0, H], [W, H]];
  const alongs = corners.map(([x, y]) => x * ux + y * uy);
  const acrosses = corners.map(([x, y]) => x * vx + y * vy);

  const uMin = Math.min(...alongs) - 40 * ratio;
  const uMax = Math.max(...alongs) + 40 * ratio;
  const vMin = Math.min(...acrosses);
  const vMax = Math.max(...acrosses);

  const strokeCount = 9;
  const spacing = (vMax - vMin) / strokeCount;
  const brushWidth = spacing * 1.8;
  const bristleCount = 14;
  const wobble = spacing * 0.16;

  // Make the strokes. Each stroke is a bundle of bristles.
  const strokes = [];

  for (let i = 0; i < strokeCount; i++) {
    const bristles = [];

    for (let k = 0; k < bristleCount; k++) {
      bristles.push({
        offset:
          (k / (bristleCount - 1) - 0.5) * brushWidth +
          (Math.random() - 0.5) * (brushWidth / bristleCount),
        speed: 0.8 + Math.random() * 0.4, // uneven speeds = ragged paint edge
        last: uMin,
      });
    }

    strokes.push({
      centre: vMin + spacing * (i + 0.5),
      delay: i * 0.17 + Math.random() * 0.06,
      duration: 1.1 + Math.random() * 0.25,
      phase: Math.random() * 6.28,
      bristles,
    });
  }

  const lastStrokeEnds = Math.max(...strokes.map((s) => s.delay + s.duration));
  const washStart = lastStrokeEnds - 0.2; // gaps fill in softly at the end
  const total = lastStrokeEnds + 0.4;

  const bristleWidth = (brushWidth / bristleCount) * 1.5;
  const step = 14 * ratio;

  function pointOn(stroke, bristle, u) {
    const v =
      stroke.centre +
      bristle.offset +
      Math.sin(u / (90 * ratio) + stroke.phase) * wobble;

    return [u * ux + v * vx, u * uy + v * vy];
  }

  let startTime = null; // set on the first frame

  function frame(now) {
    if (run !== paintRun) return; // a newer animation took over

    if (startTime === null) startTime = now;
    const t = Math.max(0, (now - startTime) / 1000);

    // Lay down more paint.
    pctx.lineWidth = bristleWidth;

    for (const stroke of strokes) {
      const progress = (t - stroke.delay) / stroke.duration;
      if (progress <= 0) continue;

      for (const bristle of stroke.bristles) {
        const p = Math.min(1, progress * bristle.speed);
        const eased = p * p * (3 - 2 * p); // gentle start, gentle finish
        const target = uMin + (uMax - uMin) * eased;

        if (target <= bristle.last) continue;

        pctx.beginPath();
        pctx.moveTo(...pointOn(stroke, bristle, bristle.last));

        for (let u = bristle.last + step; u < target; u += step) {
          pctx.lineTo(...pointOn(stroke, bristle, u));
        }

        pctx.lineTo(...pointOn(stroke, bristle, target));
        pctx.stroke();

        bristle.last = target;
      }
    }

    // Draw: first the paint, then keep the picture only where paint is.
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(paint, 0, 0);

    const wash = Math.min(1, Math.max(0, (t - washStart) / 0.6));

    if (wash > 0) {
      ctx.globalAlpha = wash;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }

    ctx.globalCompositeOperation = "source-in";
    ctx.drawImage(picture, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    if (t < total) {
      paintFrame = requestAnimationFrame(frame);
    } else {
      showPlainImage(craft); // done: swap in the real picture
    }
  }

  paintFrame = requestAnimationFrame(frame);
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
