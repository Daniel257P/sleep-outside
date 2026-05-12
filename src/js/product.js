import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

import ProductDetails from './ProductDetails.mjs';
import { getParam } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';



const productID = getParam('product')   //Objeto para ubicar el productID desde el key value del URL
const product = new ProductDetails(productID, dataSource); //Objeto que contiene el id y la fuente para mostrarlo
product.init();


loadHeaderFooter('/partials/header.html', '/partials/footer.html');



