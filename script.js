// ================= WISHLIST =================
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
document.getElementById("count").innerText = wishlist.length;

function addWishlist(name, price, image, btn) {
  const product = { name, price, image };

  if (btn) {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 500);
  }

  if (!wishlist.some(item => item.name === name)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    document.getElementById("count").innerText = wishlist.length;
    alert(`${name} added to your wishlist 🛒`);
  } else {
    alert(`${name} is already in your wishlist`);
  }
}

// ================= PRODUCT MODAL =================
const modal = document.createElement("div");
modal.id = "productModal";
modal.style = `
  display:none;
  position:fixed;
  top:0; left:0;
  width:100%; height:100%;
  background:rgba(0,0,0,0.6);
  justify-content:center;
  align-items:center;
  z-index:2000;
`;

modal.innerHTML = `
  <div style="background:white;padding:20px;border-radius:10px;max-width:400px;width:90%;text-align:center;position:relative">
    <span id="closeModal" style="position:absolute;top:10px;right:15px;font-size:22px;cursor:pointer">×</span>
    <img id="modalImg" style="width:100%;border-radius:10px"/>
    <h3 id="modalTitle"></h3>
    <p id="modalPrice"></p>

    <div style="display:flex;gap:10px;margin-top:10px">
      <button id="modalWish" style="flex:1;border:1px solid #ff4d6d;background:white;color:#ff4d6d;padding:10px">♡ Wishlist</button>
      <button id="modalOrder" style="flex:1;background:#ff4d6d;color:white;border:none;padding:10px">Order Now</button>
    </div>
  </div>
`;

document.body.appendChild(modal);

function openModal(product) {
  modal.style.display = "flex";

  document.getElementById("modalImg").src = product.image;
  document.getElementById("modalTitle").innerText = product.name;
  document.getElementById("modalPrice").innerText = "₹" + product.price;

  document.getElementById("modalOrder").onclick = () => {
    orderNow(product.name);
  };

  document.getElementById("modalWish").onclick = function () {
    addWishlist(product.name, product.price, product.image, this);
  };
}

// Close modal
document.addEventListener("click", function (e) {
  if (e.target.id === "productModal" || e.target.id === "closeModal") {
    modal.style.display = "none";
  }
});

// ================= MENU =================
function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("active");
}

// ================= CONTACT =================
function goContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

// ================= WHATSAPP ORDER =================
function orderNow(product) {
  const number = "918262997357";
  const message = `I want to order ${product}`;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ================= SLIDER =================
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

// ================= WISHLIST PAGE =================
function goWishlistPage() {
  window.location.href = "wishlist.html";
}

window.addEventListener("pageshow", () => {
  wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  document.getElementById("count").innerText = wishlist.length;
});

// ================= PRODUCTS =================
const products = [
  { name: "Jade Aura", price: 349, image: "images/1000197530.png" },
  { name: "Royal Mayura", price: 450, image: "images/1000197532.png" },
  { name: "Linear Bloom", price: 260, image: "images/1000197528.png" },
  { name: "Noor Chakra", price: 370, image: "images/1000197536.png" }
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
        <button class="heart-btn" onclick="event.stopPropagation(); addWishlist('${product.name}', ${product.price}, '${product.image}', this)">🛒</button>
        <button onclick="event.stopPropagation(); orderNow('${product.name}')">Order Now</button>
      </div>
    `;

    // CLICK PRODUCT → OPEN MODAL
    div.onclick = () => openModal(product);

    productContainer.appendChild(div);
  });

  currentIndex += productsPerBatch;
  if (currentIndex >= products.length) viewMoreBtn.style.display = "none";
}

renderProductsBatch();

viewMoreBtn.addEventListener("click", () => {
  renderProductsBatch();
});
