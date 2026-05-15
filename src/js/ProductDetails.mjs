import { getLocalStorage, setLocalStorage } from './utils.mjs';



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
    if (["1308", "985RF", "880RR", "989CG"].includes(this.productId)) {
  productDetailsTemplateDiscount(this.product);
} else {
  productDetailsTemplate(this.product);
}
   /* if (
      this.productId == "1308" ||
      this.productId == "985RF"  ||
      this.productId == "880RR" ||
      
      this.productId == "989CG"
    ) {
      productDetailsTemplateDiscount(this.product)
    }
    else {
    productDetailsTemplate(this.product);
  }*/
  }
}
  function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = product.FinalPrice;
  document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}
function productDetailsTemplateDiscount(product) {
  document.querySelector('h2').textContent = product.Brand.Name;
  document.querySelector('h3').textContent = product.NameWithoutBrand;

  const productImage = document.getElementById('productImage');
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = "20% OFF";
  document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}



  