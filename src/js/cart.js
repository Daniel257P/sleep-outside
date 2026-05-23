import shoppingCart from "./shoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cartList = document.querySelector(".cart-list");
const cart = new shoppingCart(cartList);
cart.init();
