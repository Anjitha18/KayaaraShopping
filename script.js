// ================= WISHLIST =================
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
document.getElementById("count").innerText = wishlist.length;

function addWishlist(name, price, image, btn) {
  const product = { name, price, image };

  // Toggle heart yellow
  btn.classList.add("active");
  setTimeout(() => btn.classList.remove("active"), 500);

  if (!wishlist.some(item => item.name === name)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    document.getElementById("count").innerText = wishlist.length;
    alert(`${name} added to your wishlist ❤️`);
  } else {
    alert(`${name} is already in your wishlist`);
  }
}

// TOGGLE WISHLIST POPUP
function showWishlist() {
  const wishlistBox = document.getElementById("wishlistBox");
  wishlistBox.classList.toggle("active");
}

// CLOSE WISHLIST
function closeWishlist() {
  const wishlistBox = document.getElementById("wishlistBox");
  wishlistBox.classList.remove("active");
}

// CLICK OUTSIDE (WISHLIST + MENU)
document.addEventListener("click", function (e) {
  const wishlistBox = document.getElementById("wishlistBox");
  const isInsideWishlist = wishlistBox.contains(e.target);
  const isHeartClick = e.target.closest(".wishlist-icon");
  if (!isInsideWishlist && !isHeartClick) closeWishlist();

  const menu = document.getElementById("sideMenu");
  const isInsideMenu = menu.contains(e.target);
  const isMenuIcon = e.target.closest(".menu-icon");
  if (!isInsideMenu && !isMenuIcon) menu.classList.remove("active");
});

// MENU
function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("active");
}

// CONTACT
function goContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// WHATSAPP ORDER
function orderNow(product) {
  const number = "919080272108";
  const message = `I want to order ${product}`;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// SLIDER
let index = 0;
let slides = document.querySelectorAll(".slider img");
function showSlides() {
  slides.forEach(img => (img.style.display = "none"));
  index++;
  if (index > slides.length) index = 1;
  slides[index - 1].style.display = "block";
  setTimeout(showSlides, 2000);
}
showSlides();

// WISHLIST PAGE REDIRECT
function goWishlistPage() {
  window.location.href = "wishlist.html";
}

// HANDLE BACK BUTTON / PERSIST COUNT
window.addEventListener("pageshow", () => {
  wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  document.getElementById("count").innerText = wishlist.length;
});

// ================= PRODUCTS + VIEW MORE (3 per batch) =================
const products = [
  { name: "Product 1", price: 500, image: "images/1000197530.png" },
  { name: "Product 2", price: 700, image: "images/1000197532.png" },
  { name: "Product 3", price: 700, image: "images/1000197528.png" },
  { name: "Product 4", price: 700, image: "images/1000197536.png" },
  { name: "Product 5", price: 700, image: "images/1000197538.png" },
  { name: "Product 6", price: 700, image: "images/1000197540.png" },
  { name: "Product 7", price: 700, image: "images/1000197542.png" },
  { name: "Product 8", price: 700, image: "images/1000197548.jpg" },
  { name: "Product 9", price: 700, image: "images/1000197551.jpg" },
  { name: "Product 10", price: 700, image: "images/1000197514.png" },
  { name: "Product 11", price: 700, image: "images/1000197518.png" },
  { name: "Product 12", price: 700, image: "images/1000197520.png" },
  { name: "Product 13", price: 700, image: "images/1000197522.png" },
  { name: "Product 14", price: 700, image: "images/1000197524.png" },
  { name: "Product 15", price: 700, image: "images/1000197526.png" },
  { name: "Product 16", price: 700, image: "images/1000197544.jpg" },
  { name: "Product 17", price: 700, image: "images/1000197554.jpg" },
  { name: "Product 19", price: 700, image: "images/1000197560.jpg" },
  { name: "Product 20", price: 700, image: "images/1000197563.jpg" },
  { name: "Product 21", price: 700, image: "images/1000197566.jpg" },
  { name: "Product 22", price: 700, image: "images/1000197569.jpg" },
  { name: "Product 23", price: 700, image:"images/1000197572.jpg" },
  { name: "Product 24", price: 700, image: "images/1000197575.jpg" },
  { name: "Product 25", price: 700, image: "images/1000197578.jpg" }
];

const productContainer = document.getElementById("productContainer");
const viewMoreBtn = document.getElementById("viewMoreBtn");

let productsPerBatch = 3;
let currentIndex = 0;

function renderProductsBatch() {
  const nextBatch = products.slice(currentIndex, currentIndex + productsPerBatch);
  nextBatch.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${product.image}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button class="heart-btn" onclick="addWishlist('${product.name}', ${product.price}, '${product.image}', this)">❤️</button>
      <button onclick="orderNow('${product.name}')">Order Now</button>
    `;
    productContainer.appendChild(div);
  });

  currentIndex += productsPerBatch;
  if (currentIndex >= products.length) viewMoreBtn.style.display = "none";
}

// Initial render
renderProductsBatch();

// View More click
viewMoreBtn.addEventListener("click", () => {
  renderProductsBatch();
});

const container = document.getElementById("wishlistContainer");

// get data from localStorage
let wishlist1 = JSON.parse(localStorage.getItem("wishlist")) || [];

// clear container
container.innerHTML = "";

// display products
wishlist1.forEach(product => {
  const div = document.createElement("div");
  div.classList.add("product");

  div.innerHTML = `
    <img src="${product.image}" />
    <h3>${product.name}</h3>
    <p>₹${product.price}</p>
    <button class="heart-btn" onclick="orderNow('${product.name}')">Order Now</button>
  `;

  container.appendChild(div);
});

// WhatsApp order
function orderNow(product) {
  let number = "919080272108";
  let message = `I want to order ${product}`;
  let url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}