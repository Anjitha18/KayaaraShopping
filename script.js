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
    alert(`${name} added to your wishlist 🛒 `);
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
  const number = "918262997357";
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
  { name: "Jade Aura", price: 349, image: "images/1000197530.png" },
  { name: "Royal Mayura", price: 450, image: "images/1000197532.png" },
  { name: "Linear bloom", price: 260, image: "images/1000197528.png" },
  { name: "Noor Chakra", price: 370, image: "images/1000197536.png" },
  { name: "Royal Mayura", price: 450, image: "images/1000197538.png" },
  { name: "Half moon drops", price: 299, image: "images/1000197540.png" },
  { name: "Sitara glow", price: 550, image: "images/1000197542.png" },
  { name: "Noor Chakra", price: 370, image: "images/1000197548.jpg" },
  { name: "Half moon drops", price: 299, image: "images/1000197551.jpg" },
  { name: "Ruby crescent Chandbali", price: 450, image: "images/1000197514.png" },
  { name: "Regal loop charm", price: 340, image: "images/1000197518.png" },
  { name: "Regal loop charm", price: 340, image: "images/1000197520.png" },
  { name: "Noor Mandala drops", price: 450, image: "images/1000197522.png" },
  { name: "Regal loop charm", price: 340, image: "images/1000197524.png" },
  { name: "Devi crescent drops", price: 399, image: "images/1000197526.png" },
  { name: "Petal Crescent", price: 354, image: "images/1000197554.jpg" },
  { name: "Regal loop charm", price: 340, image: "images/1000197560.jpg" },
  { name: "Aura petals", price: 295, image: "images/1000197563.jpg" },
  { name: "Sitara glow", price: 550, image: "images/1000197566.jpg" },
  { name: "Royal Mayura", price: 450, image: "images/1000197569.jpg" },
  { name: "Jade Aura", price: 349, image:"images/1000197572.jpg" },
  { name: "Royal Mayura", price: 450, image: "images/1000197575.jpg" },
  { name: "Royal Mayura", price: 450, image: "images/1000197578.jpg" }
];

const productContainer = document.getElementById("productContainer");
const viewMoreBtn = document.getElementById("viewMoreBtn");

let productsPerBatch = 4;
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

  <div class="product-actions">
    <button class="heart-btn" onclick="addWishlist('${product.name}', ${product.price}, '${product.image}', this)">🛒</button>
    <button onclick="orderNow('${product.name}')">Order Now</button>
  </div>
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
  let number = "918262997357";
  let message = `I want to order ${product}`;
  let url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
// ================= POLICY NAVIGATION =================
function openPage(type) {
  window.location.href = "policy-detail.html?type=" + type;
}

// ================= POLICY CONTENT RENDER =================
window.addEventListener("load", function () {

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  const title = document.getElementById("title");
  const content = document.getElementById("content");

  if (!type || !title || !content) return;

  let data = {};

  if (type === "shipping") {
    data = {
      title: "Shipping Policy",
      content: `
        <p>We offer secure and reliable shipping across India.</p>
        <ul>
          <li>Orders are processed within 3-7 business days.</li>
          <li>Delivery timelines vary based on your location.</li>
          <li>Tracking details will be shared once shipped.</li>
        </ul>
        <p>We work with trusted delivery partners to ensure safe delivery.</p>
      `
    };
  }

  else if (type === "refund") {
    data = {
      title: "Refund Policy",
      content: `
        <p>We accept returns for defective or damaged products within 24 hours.</p>
        <p>Opening video is mandatory for damage claims.</p>
        <p>Items must be unused and in original packaging.</p>
      `
    };
  }

  else if (type === "faq") {
    data = {
      title: "FAQs",
      content: `<p>Find answers related to orders, shipping, payments, and more.</p>`
    };
  }

  else if (type === "about") {
    data = {
      title: "About Us",
      content: `<p>Kayaara is a celebration of elegance, individuality, and modern jewellery design.</p>`
    };
  }

  else if (type === "contact") {
    data = {
      title: "Contact Us",
      content: `<p>Reach us via WhatsApp, email, or contact form for any assistance.</p>`
    };
  }

  else if (type === "privacy") {
    data = {
      title: "Privacy Policy",
      content: `<p>Your data is safe. We do not share personal information with third parties.</p>`
    };
  }

  else if (type === "terms") {
    data = {
      title: "Terms of Service",
      content: `<p>By using this website, you agree to our terms and conditions.</p>`
    };
  }

  title.innerText = data.title;
  content.innerHTML = data.content;
});
