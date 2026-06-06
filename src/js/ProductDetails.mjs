import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

    async init() {
        try {
            this.product = await this.dataSource.findProductById(this.productId);
            this.renderProductDetails();

            const button = document.getElementById("addToCart");
            if (button) {
                button.addEventListener("click", this.addProductToCart.bind(this));
            } else {
                alertMessage("Add to Cart button not found");
            }
        } catch (error) {
            alertMessage("Error loading product details");
        }
    }   

    addProductToCart() {
        try {
            const cartItems = getLocalStorage("so-cart") || [];
            cartItems.push(this.product);
            setLocalStorage("so-cart", cartItems);
            alertMessage("Product added to cart!");
        } catch (error) {
            alertMessage("Error adding product to cart!");
        }
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    try {
        const brandElement = document.querySelector("h3");
        if (brandElement) brandElement.textContent = product.Brand.Name;
        
        const nameElement = document.querySelector("h2");
        if (nameElement) nameElement.textContent = product.NameWithoutBrand;

        const productImage = document.querySelector(".product-detail img");
        if (productImage) {
            productImage.src = product.Images?.PrimaryLarge || product.Images?.PrimaryExtraLarge || product.Image || "";
            productImage.alt = product.NameWithoutBrand;
        }

        const productPrice = document.querySelector(".product-card__price");
        if (productPrice) {
            productPrice.textContent = `$${product.FinalPrice}`;
        }

        const productColor = document.querySelector(".product__color");
        if (productColor && product.Colors && product.Colors.length > 0) {
            productColor.textContent = product.Colors[0].ColorName;
        }

        const productDescription = document.querySelector(".product__description");
        if (productDescription) {
            productDescription.innerHTML = product.DescriptionHtmlSimple;
        }

        const addToCartButton = document.getElementById("addToCart");
        if (addToCartButton) {
            addToCartButton.dataset.id = product.Id || product.id;
        }
    } catch (error) {
        // Silently handle template rendering errors
    }
}
