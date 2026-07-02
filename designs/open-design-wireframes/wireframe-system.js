const pins = Array.from(document.querySelectorAll(".pin"));
const rows = Array.from(document.querySelectorAll(".spec-row"));

function activateSpec(id, shouldFocus = true) {
  rows.forEach((row) => {
    const isActive = row.id === id;
    row.classList.toggle("is-active", isActive);
    if (isActive) {
      row.setAttribute("tabindex", "-1");
      row.setAttribute("aria-current", "true");
    } else {
      row.removeAttribute("tabindex");
      row.removeAttribute("aria-current");
    }
  });

  pins.forEach((pin) => {
    pin.setAttribute("aria-pressed", String(pin.dataset.target === id));
  });

  const active = document.getElementById(id);
  if (active && shouldFocus) {
    active.focus({ preventScroll: true });
  }
}

function movePinFocus(currentPin, direction) {
  const currentIndex = pins.indexOf(currentPin);
  const nextIndex = (currentIndex + direction + pins.length) % pins.length;
  const nextPin = pins[nextIndex];
  nextPin.focus({ preventScroll: true });
  activateSpec(nextPin.dataset.target, false);
}

pins.forEach((pin) => {
  pin.addEventListener("click", () => activateSpec(pin.dataset.target));
  pin.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      movePinFocus(pin, 1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      movePinFocus(pin, -1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      pins[0].focus({ preventScroll: true });
      activateSpec(pins[0].dataset.target, false);
    }
    if (event.key === "End") {
      event.preventDefault();
      pins[pins.length - 1].focus({ preventScroll: true });
      activateSpec(pins[pins.length - 1].dataset.target, false);
    }
  });
});

if (pins.length > 0) {
  activateSpec(pins[0].dataset.target, false);
}
