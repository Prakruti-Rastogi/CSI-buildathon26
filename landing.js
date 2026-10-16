 });

    artistsMenu.appendChild(button);
  });
}

artistsButton.addEventListener("click", () => {
  const isOpening = artistsMenu.hidden;
  artistsMenu.hidden = !isOpening;
  artistsButton.setAttribute("aria-expanded", String(isOpening));
});

document.addEventListener("click", (event) => {
  if (
    !artistsMenu.contains(event.target) &&
    !artistsButton.contains(event.target)
  ) {
    artistsMenu.hidden = true;
    artistsButton.setAttribute("aria-expanded", "false");
  }
});
