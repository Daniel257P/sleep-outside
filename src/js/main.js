import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// week 2 assignment
const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, element);

// Render the product list
productList.init();
