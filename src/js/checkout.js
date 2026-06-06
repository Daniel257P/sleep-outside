import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".order-summary");

myCheckout.init();  

const zipInput = document.querySelector("#zip");
if (zipInput) {
  zipInput.addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));
}
    
const submitButton = document.querySelector(".checkout-btn");
if (submitButton) {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    myCheckout.checkout();
  });
}