import { loadHeaderFooter, alertMessage} from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");

document.addEventListener("DOMContentLoaded", () => {
  checkout.init();
});

const zipInput = document.querySelector("#zip");
zipInput.addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

// Add event listener to the checkout button to trigger the checkout process
const submitButton = document.querySelector("#checkoutSubmit");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  checkout.checkout(); // Call the checkout method to process the order
});
