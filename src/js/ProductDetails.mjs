import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

    async init() {
        this.product = await this.dataSource.getProductById(this.productId);
        this.renderProductDetails();

        document.getElementById("addToCart").addEventListener("click", this.addProductToCart.bind(this));
    }   

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
        alert("Product added to cart!");
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.querySelector(".productImage");
    if (productImage) {
        productImage.src = product.Image;
        productImage.alt = product.NameWithoutBrand;
    }

    const productPrice = document.querySelector(".productPrice");
    if (productPrice) {
        productPrice.textContent = product.FinalPrice;
    }

    const productColor = document.querySelector(".productColor");
    if (productColor) {
        productColor.textContent = product.Colors[0].ColorName;
    }

    const productDescription = document.querySelector(".productDes");
    if (productDescription) {
        productDescription.innerHTML = product.DescriptionHtmlSimple;
    }

    const addToCartButton = document.getElementById("addToCart");
    if (addToCartButton) {
        addToCartButton.dataset.id = product.Id || product.id;
    }
}
