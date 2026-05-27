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
}

