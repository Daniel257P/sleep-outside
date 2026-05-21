import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cartList = document.querySelector(".cart-list");
const cart = new ShoppingCart(cartList);
cart.init();