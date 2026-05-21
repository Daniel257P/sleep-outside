// imports loading header and footer, as well as local storage functions and cart badge update function
import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
  updateCartBadge,
} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".cart-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="cart-remove" data-id="${item.Id}">✕</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
document.querySelector(".cart-list").addEventListener("click", (event) => {
  const removeBtn = event.target.closest(".cart-remove");
  if (!removeBtn) return;

  const idToRemove = removeBtn.dataset.id;
  removeFromCart(idToRemove);
});

function removeFromCart(id) {
  const cart = getLocalStorage("so-cart") || [];
  const index = cart.findIndex((item) => item.Id == id);
  if (index !== -1) cart.splice(index, 1);
  setLocalStorage("so-cart", cart);
  updateCartBadge();
  renderCartContents();
}
