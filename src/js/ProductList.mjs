//template function that will simply return a template literal string for each of the templates needed
function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

function renderListWithTemplate(renderFn, listElement, items) {
  if (!listElement || !items) return;
  listElement.innerHTML = items.map(renderFn).join("");
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
    try {
      const list = await this.dataSource.getData(this.category);
      this.render(list);
    } catch (error) {
      this.handleError(error);
    }
}

renderList(product) {
  return productCardTemplate(product);
}

render(products) {
  renderListWithTemplate(this.renderList.bind(this), this.listElement, products);
}

handleError(error) {
  if (this.listElement) {
    this.listElement.innerHTML = "<p>Sorry, we couldn't load the products at this time. Please try again later.</p>";
  }
}

}


