
import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}


// week 04 - tasks from 1 to 4 
export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = JSON.parse(localStorage.getItem(this.key)) || [];
    this.calculateItemSubTotal();
    //this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    this.itemTotal = this.list.reduce((sum, item) => {
    const price = item.FinalPrice || 0;
    const quantity = item.quantity || 1;
        
    return sum + (price * quantity); 
    }, 0);
      
    this.displaySubtotals();
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
      const items = this.list.reduce((total, item) =>
      { return total + (item.quantity || 1);}, 0);

      this.tax = (this.itemTotal * 0.06);
      
        if (items > 0) {
            this.shipping = 10 + ((items - 1) * 2);
        } else {
            this.shipping = 0;
        }

      this.orderTotal = this.itemTotal + this.tax + this.shipping;
      // display the totals.
      this.displayOrderTotals();     
    }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
        const subtotal = document.querySelector("#subtotal");
        const tax = document.querySelector("#tax");
        const shipping = document.querySelector("#shipping");
        const total = document.querySelector("#total");

        // display values
        subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        total.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

      displaySubtotals() {
        const subtotal = document.querySelector("#subtotal");
        // display values
          subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
  }
  
   async checkout() {
    const formElement = document.forms["checkout"];

    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    const order = formDataToJSON(formElement);
    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    //console.log(order);

    try {
      const response = await services.checkout(order);
      console.log("Order Success:", response);

      localStorage.setItem("order-id", response.orderId);

      localStorage.removeItem("so-cart");

      window.location.href = "success.html";

    } catch (err) {
      let serverMessage = err?.message?.message || err?.message || "An error occurred during checkout. Please try again.";
      console.log("Error occurred while checking out:", err);

      if (typeof serverMessage === "object") {
        serverMessage = Object.values(serverMessage).join(", ");
      }
     
      alertMessage(serverMessage);
    }
  }
}




