import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();
//week 3 - moved from main.js to product-list.js

const category = getParam('category');

function renderCategory() {  //show the category name on the page
    const categoryTitle = document.querySelector('.product-title');
    categoryTitle.textContent = category;
}
renderCategory();

// first create an instance of the ProductData class
const dataSource = new ProductData();
// then get the element you want the product list to render in
const element = document.querySelector(".product-list");
// then create an instance of the ProductList class and send it the correct information.
const productList = new ProductList(category, dataSource, element);

// Render the product list
productList.init();