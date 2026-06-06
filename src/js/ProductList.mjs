import { renderListWithTemplate } from "./utils.mjs";

//template function that will simply return a template literal string for each of the templates needed
function productCardTemplate(product) {
  const imageSrc = product.Images?.PrimaryMedium || product.Image || product.Images?.PrimarySmall || "";

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${imageSrc}" alt="${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

//The ProductList class should have a constructor that takes three parameters: category, dataSource, and listElement.
// The category is a string that represents the product category (e.g., "tents"). 
// The dataSource is an instance of the ProductData class that will be used to fetch the product data.
// The listElement is a DOM element where the product cards will be rendered.
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  //Finally, use the dataSource to get the list of products to work with.
  //  You could do that in the constructor or in an init() method.
  //  One advantage of the init method is that it will allow us to use async/await when calling the promise in getData().
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".category-title").textContent = this.category;
    this.setupSortControl();
  }

  setupSortControl() {
    const sortControl = document.getElementById("sort-control");
    if (sortControl) {
      sortControl.addEventListener("change", (e) => {
        this.currentSort = e.target.value;
        const sortedProducts = this.getSortedProducts();
        this.renderList(sortedProducts);
      });
    }
  }

  getSortedProducts() {
    let sorted = [...this.products];

    if (this.currentSort === "name-asc") {
      sorted.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (this.currentSort === "name-desc") {
      sorted.sort((a, b) => b.Name.localeCompare(a.Name));
    } else if (this.currentSort === "price-asc") {
      sorted.sort((a, b) => Number(a.FinalPrice) - Number(b.FinalPrice));
    } else if (this.currentSort === "price-desc") {
      sorted.sort((a, b) => Number(b.FinalPrice) - Number(a.FinalPrice));
    }

    return sorted;
  }

renderList(product) {
  renderListWithTemplate(productCardTemplate, this.listElement, product);
}

}


