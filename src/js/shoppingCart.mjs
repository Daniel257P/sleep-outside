// ShoppingCart.mjs stretc Activity 3: Shopping Cart Functionality
import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
  updateCartBadge
} from "./utils.mjs";

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <span class="cart-remove" data-id="${item.Id}">✕</span>
      <a href="#" class="cart-card__image">
        <img src="${item.Images.PrimaryMedium}" alt="${item.Name}">
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: ${item.quantity}</p> 
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}


// week 3 - total in shopping cart
function cartTotal() {
  const cart = JSON.parse(localStorage.getItem("so-cart")) || []; //item from local storage
  const total = document.querySelector(".cart-total"); //class to display amount
  const totalContainer = document.querySelector(".cart-footer"); // class to hide/show
  if (!total) return;

  const totalAmount = cart.reduce((sum, item) => {
    const price = item.FinalPrice || 0;
    const quantity = item.quantity || 1;
    return sum + (price * quantity); 
  }, 0);
  
  if (totalAmount > 0) {
    total.textContent = `Total: $${totalAmount.toFixed(2)}`;
    totalContainer.classList.remove("hide");
  } else {
    totalContainer.classList.add("hide");
  }
}

export default class shoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.key = "so-cart";
  }

  init() {
    const cartItems = getLocalStorage(this.key) || [];
    this.renderList(cartItems);
    this.addEventListeners();
  }

  renderList(list) {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }

  addEventListeners() {
    this.listElement.addEventListener("click", (event) => {
      const removeBtn = event.target.closest(".cart-remove");
      if (!removeBtn) return;

      const id = removeBtn.dataset.id;
      this.removeItem(id);
    });
  }

  removeItem(id) {
    let cart = getLocalStorage(this.key) || [];
    cart = cart.filter((item) => item.Id !== id);
    setLocalStorage(this.key, cart);
    updateCartBadge();
    cartTotal();
    this.renderList(cart);
  }
}

document.addEventListener("DOMContentLoaded", cartTotal);