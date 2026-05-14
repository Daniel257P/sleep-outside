//import { setLocalStorage, getLocalStorage } from "./utils.mjs"; week 2
import { getParam } from "./utils.mjs"; 
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ProductData("tents");
const productId = getParam("product"); //week 2

const product = new ProductDetails(productID, dataSource);
product.init();

// function addProductToCart(product) {
//week 2 - move to productdetails.mjs ^^^^^^^^^

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);




