import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';
import { getParam } from './utils.mjs';


const dataSource = new ProductData("tents");

const productID = getParam('product')   //Objeto para ubicar el productID desde el key value del URL
const product = new ProductDetails(productID, dataSource); //Objeto que contiene el id y la fuente para mostrarlo
product.init();







/*async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
*/





