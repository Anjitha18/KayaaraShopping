// ================= WISHLIST =================
let currentSlide = 0;
let startX = 0;
let endX = 0;
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
  <div style="background:white;padding:20px;border-radius:10px;max-width:420px;width:90%;text-align:center;position:relative">

    <span id="closeModal" style="position:absolute;top:10px;right:15px;font-size:22px;cursor:pointer">×</span>

    <!-- IMAGE CAROUSEL -->
    <div style="position:relative;overflow:hidden;border-radius:10px">
      <div id="carouselTrack" style="display:flex;transition:transform 0.3s ease;"></div>
    </div>

    <!-- DOTS -->
    <div id="dotsContainer" style="margin-top:10px;display:flex;justify-content:center;gap:6px"></div>

    <h3 id="modalTitle"></h3>
    <p id="modalPrice"></p>

    <div style="display:flex;gap:10px;margin-top:10px">
      <button id="modalWish" style="flex:1;border:1px solid #ff4d6d;background:white;color:#ff4d6d;padding:10px">♡ Wishlist</button>
      <button id="modalOrder" style="flex:1;background:#ff4d6d;color:white;border:none;padding:10px">Order Now</button>
    </div>
  </div>
`;
   

document.body.appendChild(modal);

function normalizeImages(product) {
  return Array.isArray(product.images)
    ? product.images
    : [product.image];
}

function openModal(product) {
  const images = Array.isArray(product.images)
    ? product.images
    : [product.image];

  const track = document.getElementById("carouselTrack");
  const dotsContainer = document.getElementById("dotsContainer");

  track.innerHTML = "";
  dotsContainer.innerHTML = "";
  currentSlide = 0;

  // Create images
  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.style = `
      width:100%;
      flex:0 0 100%;
      object-fit:cover;
      border-radius:10px;
    `;
    track.appendChild(img);
  });

  // Create dots
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.style = `
      width:8px;height:8px;border-radius:50%;
      background:${i === 0 ? "#ff4d6d" : "#ccc"};
      display:inline-block;
      cursor:pointer;
    `;

    dot.onclick = () => goToSlide(i, images);
    dotsContainer.appendChild(dot);
  });

  function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    [...dotsContainer.children].forEach((dot, i) => {
      dot.style.background = i === currentSlide ? "#ff4d6d" : "#ccc";
    });
  }

  function goToSlide(i) {
    currentSlide = i;
    updateCarousel();
  }

  // Swipe support
  track.onmousedown = (e) => startX = e.clientX;
  track.onmouseup = (e) => handleSwipe(e.clientX);

  track.ontouchstart = (e) => startX = e.touches[0].clientX;
  track.ontouchend = (e) => handleSwipe(e.changedTouches[0].clientX);

  function handleSwipe(end) {
    let diff = startX - end;

    if (diff > 50 && currentSlide < images.length - 1) {
      currentSlide++;
    } 
    else if (diff < -50 && currentSlide > 0) {
      currentSlide--;
    }

    updateCarousel();
  }

  // product info
  document.getElementById("modalTitle").innerText = product.name;
  document.getElementById("modalPrice").innerText = "₹" + product.price;

  modal.style.display = "flex";

  document.getElementById("modalOrder").onclick = () => {
    orderNow(product.name);
  };

  document.getElementById("modalWish").onclick = function () {
    addWishlist(product.name, product.price, images[0], this);
  };

  updateCarousel();
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
  { name: "Jade Aura", price: 349, images: ["images/1000197530.png","images/1000197530.png","images/1000197530.png"] },
  { name: "Royal Mayura", price: 450, image: "images/1000197532.png" },
  { name: "Linear Bloom", price: 260, image: "images/1000197528.png" },
  { name: "Noor Chakra", price: 370, image: "images/1000197536.png" }
  // बाकी unchanged...
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

    const imgSrc = Array.isArray(product.images)
      ? product.images[0]
      : product.image;

    div.innerHTML = `
      <img src="${imgSrc}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>

      <div class="product-actions">
        <button class="heart-btn"
          onclick="event.stopPropagation(); addWishlist('${product.name}', ${product.price}, '${imgSrc}', this)">
          🛒
        </button>
        <button onclick="event.stopPropagation(); orderNow('${product.name}')">
          Order Now
        </button>
      </div>
    `;

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
