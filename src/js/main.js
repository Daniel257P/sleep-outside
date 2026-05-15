
//shows the number of items in the cart 
function updateCartBadge() {

const cart = JSON.parse(localStorage.getItem('so-cart')) || [];
const totalItems = cart.length; 
const badge = document.querySelector('.cart-number');

  if (totalItems > 0) {
    badge.textContent = totalItems;
    badge.style.display = 'block';
  } else {
    badge.style.display = 'none';
  }
}
// Run the function when the page loads
document.addEventListener('DOMContentLoaded', updateCartBadge);
