import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");

document.addEventListener("DOMContentLoaded", () => { checkout.init(); });

const zipInput = document.querySelector("#zip");
zipInput.addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});
