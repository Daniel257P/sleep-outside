import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// week 2 assignment
const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

// Render the product list
productList.init();



// julia's task week 2
//shows the number of items in the cart 
function updateCartBadge() {

const cart = JSON.parse(localStorage.getItem('so-cart')) || []; //get items in cart 
const totalItems = cart.length;  // get the length - the same items are counted separatey, no need to sum 
const badge = document.querySelector('.cart-number'); // select the class

  if (totalItems > 0) { 
    badge.textContent = totalItems; 
    badge.style.display = 'block'; // display css if there are items
  } else {
    badge.style.display = 'none'; // display nothing if there are no items 
  }
}
// Run the function when the page loads
document.addEventListener('DOMContentLoaded', updateCartBadge);