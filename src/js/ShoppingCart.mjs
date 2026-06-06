import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const imageSrc = item.Images?.PrimaryMedium || item.Image || "";
  const colorName = item.Colors && item.Colors.length > 0 ? item.Colors[0].ColorName : "No color specified";
  
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${imageSrc}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${colorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.total = 0;
  }
  async init() {
    const list = getLocalStorage(this.key) || [];
    this.calculateListTotal(list);
    this.renderCartContents(list);
  }
  calculateListTotal(list) {
    if (!list || list.length === 0) {
      this.total = 0;
      return;
    }
    const amounts = list.map((item) => item.FinalPrice);
    this.total = amounts.reduce((sum, item) => sum + Number(item), 0);
  }
  renderCartContents(list) {
    if (!list || list.length === 0) {
      document.querySelector(this.parentSelector).innerHTML = "<p>Your cart is empty</p>";
      return;
    }
    const htmlItems = list.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    const totalElement = document.querySelector(".cart-total");
    if (totalElement) {
      totalElement.innerText = `Cart Total: $${this.total}`;
    }
  }
}