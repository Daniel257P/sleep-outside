// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// Moved this function from main to utils so it can be used in both main and cart team 3
export function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  const badge = document.querySelector(".cart-number");
  if (!badge) return;
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.style.display = "block";
  } else {
    badge.style.display = "none";
  }
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  updateCartBadge();
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");

  alert.innerHTML = `
    <p>${message}</p>
    <span class="close">X</span>
  `;
  document.body.appendChild(alert);

  alert.querySelector(".close").addEventListener("click", () => {
    alert.remove();
  });

  if (scroll) window.scrollTo(0, 0);
}
