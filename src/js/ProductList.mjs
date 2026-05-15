//week 2

function productCardTemplate(product) {
    return `
      <li class="product-card">
      <a href="product_pages/?product=${product.id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2>${product.Brand.Name}</h2>
      <h3>${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>    </a>
  </li>` 
}

export default class ProductList{
    
  constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        // the dataSource will return a Promise...so you can use await to resolve it.
        const list = await this.dataSource.getData();
        // next, render the list
        this.renderList(list);
    }
    
    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

        // apply use new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list);

    }
}