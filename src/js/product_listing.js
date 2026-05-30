import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter, getParameters } from "./utils.mjs";

loadHeaderFooter();

const category = getParameters("category");
//first create an instance of the ProductData class
const dataSource = new ProductData();
//then get the element you want the product list to be rendered in
const listElement = document.querySelector(".product-list");
//then create an instance of the ProductList class and send it the correct information
const productList = new ProductList(category, dataSource, listElement);

//finally, call the init() method to get the products and render them on the page
productList.init();