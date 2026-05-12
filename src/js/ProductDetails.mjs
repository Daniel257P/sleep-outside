import { getLocalStorage, setLocalStorage } from './utils.mjs';
const baseURL = import.meta.env.VITE_SERVER_URL
//${baseURL}product/${id}

export default class ProductDetails {
  
  constructor(productId, dataSource){
  this.productId = productId;
  this.product = {};
  this.dataSource = dataSource;
}
  async init(){
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
  
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this)); // If we don't put bind, this=addToCart button. This way we link ProductDetails object to this. 
           }
   addProductToCart() {
    const cartItems = getLocalStorage('so-cart') || []; // I am creating the variable (so-cart) of the cart array in localStorage 
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}
  function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = product.FinalPrice;
  document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}



/*function productDetailsTemplate(product){
  return `<section class='product-details'><h3>${product.Brand.name}</h3>
  <h2 class="divider">${product.NameWithoutBrand}</h2>
     <img
       class="divider"
       src="${product.Images.PrimaryExtraLarge}"
       alt="${product.NameWithoutBrand}"
     />
     <p class="product-card__price">$${product.FinalPrice}</p>
     <p class="product__color">${product.Colors[0].ColorName}</p>
     <p class="product__description">
     ${product.DescriptionHtmlSimple}
     </p>
     <div class="product-detail__add">
       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
     </div></section>`;
}*/


  