import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getParameters } from "./utils.mjs";

loadHeaderFooter();

const category = getParameters("category");
//first create an instance of the ExternalServices class
const dataSource = new ExternalServices();
//then get the element you want the product list to be rendered in
const listElement = document.querySelector(".product-list");
//then create an instance of the ProductList class and send it the correct information
const productList = new ProductList(category, dataSource, listElement);

//finally, call the init() method to get the products and render them on the page
productList.init();