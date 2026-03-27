

const container = document.getElementById("wishlistContainer");

// get data from localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// display products
function renderWishlist() {
  container.innerHTML = ''; // clear container

  if (wishlist.length === 0) {
    container.innerHTML = '<p style="color:white; text-align:center; grid-column: span 2;">Your wishlist is empty ❤️</p>';
    return;
  }

  wishlist.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${product.image}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button class="heart-btn" onclick="removeWishlist('${product.name}', this)">Remove</button>
      <button onclick="orderNow('${product.name}')">Order Now</button>
    `;
    container.appendChild(div);
  });
}

// remove from wishlist
function removeWishlist(name, btn) {
  wishlist = wishlist.filter(item => item.name !== name);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
  alert(`${name} removed from wishlist`);
}

// WhatsApp order
function orderNow(product) {
  const number = "918262997357";
  const message = `I want to order ${product}`;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// render initially
renderWishlist();
