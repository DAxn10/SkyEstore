/* ================= MOBILE MENU ================= */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (!nav) return;
  nav.classList.toggle("show");
}

/* ================= DROPDOWN (MOBILE) ================= */
document.querySelectorAll('.dropbtn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const content = this.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});

/* ================= SORT PRODUCTS ================= */
function sortProducts() {
  const grid = document.querySelector(".shop-grid");
  const cards = Array.from(grid.children);
  const value = document.getElementById("sortSelect").value;

  let sorted = cards;

  if (value === "priceLow") {
    sorted.sort((a, b) =>
      parseFloat(a.dataset.price) - parseFloat(b.dataset.price)
    );
  } 
  else if (value === "priceHigh") {
    sorted.sort((a, b) =>
      parseFloat(b.dataset.price) - parseFloat(a.dataset.price)
    );
  } 
  else if (value === "name") {
    sorted.sort((a, b) =>
      a.dataset.name.localeCompare(b.dataset.name)
    );
  }

  grid.innerHTML = "";
  sorted.forEach(card => grid.appendChild(card));
}

/* ================= PRODUCT MODAL ================= */
function viewProduct(button) {
  const card = button.closest(".shop-card");

  const images = card.dataset.images.split(",");
  const title = card.dataset.name;
  const price = card.dataset.price;
  const desc = card.dataset.desc || "No description available";

  document.getElementById("modalMainImg").src = images[0];
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalPrice").innerText = "Price: $" + price;
  document.getElementById("modalDesc").innerText = desc;

  const thumbs = document.getElementById("modalThumbs");
  thumbs.innerHTML = "";

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => {
      document.getElementById("modalMainImg").src = src;
    };
    thumbs.appendChild(img);
  });

  document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

/* ================= CHECKOUT ================= */
function goToCheckout(button) {
  const card = button.closest(".shop-card");

  document.getElementById("checkoutProduct").innerText = card.dataset.name;
  document.getElementById("checkoutPrice").innerText = card.dataset.price;

  document.getElementById("checkoutSection").style.display = "block";
  document.getElementById("checkoutSection")
    .scrollIntoView({ behavior: "smooth" });
}

/* ================= BUY NOW (REDIRECT TO CHECKOUT PAGE) ================= */
function buyNow(button) {
  const card = button.closest(".shop-card");

  const product = {
    name: card.dataset.name,
    price: card.dataset.price,
    desc: card.dataset.desc || "",
    images: card.dataset.images || ""
  };

  // Save product for checkout page
  localStorage.setItem("checkoutProduct", JSON.stringify(product));

  // Redirect to checkout page
  window.location.href = "checkout.html";
}


/* ================= PAYMENT METHOD ================= */
function showPayment(method) {
  const qrImage = document.getElementById("qrImage");
  const qrBox = document.getElementById("paymentQRCode");
  const uploadBox = document.getElementById("uploadProof");

  if (method === "esewa") {
    qrImage.src = "images/esewa-qr.png";
  } 
  else if (method === "bank") {
    qrImage.src = "images/bank-qr.png";
  }

  qrBox.style.display = "block";
  uploadBox.style.display = "block";
}

/* ================= ORDER SUBMIT ================= */
function submitOrder() {
  const file = document.getElementById("paymentScreenshot").files[0];

  if (!file) {
    alert("Please upload payment screenshot.");
    return;
  }

  alert("✅ Order submitted!\nStatus: Payment verification pending.");

  document.getElementById("checkoutSection").style.display = "none";
  document.getElementById("paymentQRCode").style.display = "none";
  document.getElementById("uploadProof").style.display = "none";
}

/* ================= OPTIONAL: CLOSE MODAL ON OUTSIDE CLICK ================= */
window.onclick = function (e) {
  const modal = document.getElementById("productModal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
