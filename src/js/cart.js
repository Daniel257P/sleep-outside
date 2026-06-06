import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");

cart.init();
if (getLocalStorage("so-cart") && getLocalStorage("so-cart").length > 0) {
   // show our checkout button and total if there are items in the cart.
   document.querySelector(".cart-footer").classList.remove("hide");
   document.querySelector(".cart-total").style.display = "block";
}