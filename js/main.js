/* =========================================================
   MAIN.JS - FINAL UPGRADED VERSION
   Stable • Conversion Oriented • Harga Mulai Dari
   
   Execution Flow:
   1. Header & Navigation (active state, theme, menu toggle, scroll)
   2. Product Page Features (filtering, search, rendering)
   3. Modal Interactions (open, close, keyboard, click-outside)
   4. Initialization (on page load)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ================= HEADER & NAVIGATION INITIALIZATION ================= */
  // Sets 'active' class on current page navigation link
  const path = window.location.pathname;

  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");
    const currentPage = path.split("/").pop();

    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  /* ================= THEME INITIALIZATION ================= */
  // Applies saved theme preference or system preference to document
  (() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else if (
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  })();

  /* ================= MOBILE NAVIGATION TOGGLE ================= */
  // Controls open/close of mobile menu with aria-expanded attribute
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen =
        navToggle.getAttribute("aria-expanded") === "true";

      navToggle.setAttribute("aria-expanded", !isOpen);
      nav.classList.toggle("active");
    });
  }

  /* ================= HEADER SCROLL STATE ================= */
  // Adds 'scrolled' class to header when page scrolls beyond 10px
  const header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    });
  }

  /* ================= DOM ELEMENTS - PRODUCT FEATURES ================= */
  const container = document.getElementById("produk-list");
  const searchInput = document.getElementById("searchInput");
  const kategoriBtns = document.querySelectorAll(".kategori button");

  /* ================= DOM ELEMENTS - MODAL ================= */
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalNama = document.getElementById("modalNama");
  const modalKategori = document.getElementById("modalKategori");
  const modalHarga = document.getElementById("modalHarga");
  const modalDesc = document.getElementById("modalDesc");
  const modalWa = document.getElementById("modalWa");
  const closeBtn = document.querySelector(".close");

  /* ================= STATE ================= */
  let kategoriAktif = "semua";

  /* ================= HELPER FUNCTIONS ================= */
  
  /**
   * Formats number as Indonesian Rupiah currency
   * @param {number} number - Amount to format
   * @returns {string} Formatted currency string
   */
  function formatRupiah(number) {
    return `Rp ${Number(number).toLocaleString("id-ID")}`;
  }

  /**
   * Creates WhatsApp message with product consultation request
   * @param {Object} product - Product data object
   * @returns {string} URL-encoded message
   */
function createWaMessage(product) {
  /* ID 15 = custom sofa */
  if (product.id === 15) {
    return encodeURIComponent(
      `Halo, saya memiliki referensi desain sofa sendiri dan ingin konsultasi custom sofa sesuai kebutuhan. Saya akan mengirimkan gambar referensinya.`
    );
  }

  /* ID 23 = custom tempat tidur */
  if (product.id === 23) {
    return encodeURIComponent(
      `Halo, saya memiliki referensi desain tempat tidur sendiri dan ingin konsultasi custom sesuai kebutuhan. Saya akan mengirimkan gambar referensinya.`
    );
  }

  /* default produk lainnya */
  return encodeURIComponent(
    `Halo, saya tertarik dengan model ${product.nama}.
Saya ingin konsultasi ukuran, warna, bahan, dan estimasi pengerjaan.`
  );
  }

  /* ================= PRODUCT CARD CREATION ================= */
  
  /**
   * Creates product card DOM element with event listener
   * @param {Object} product - Product data from produkData array
   * @returns {HTMLElement} Card element with click handler
   */
  function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "produk-card";

    card.innerHTML = `
      <img src="${product.img}" alt="${product.nama}" loading="lazy">

      <h4>${product.nama}</h4>

      <div class="harga">
        Harga mulai dari ${formatRupiah(product.harga_mulai)}
      </div>

      <p>
        ✔ Custom ukuran <br>
        ✔ Custom warna <br>
        ✔ Workshop sendiri
      </p>
    `;

    card.addEventListener("click", () => bukaModal(product));

    return card;
  }

  /* ================= PRODUCT FILTERING ================= */
  
  /**
   * Filters products by search keyword and category
   * @returns {Array} Filtered products matching current criteria
   */
  function getFilteredProducts() {
    const keyword = searchInput?.value.toLowerCase().trim() || "";

    return produkData.filter((product) => {
      const cocokNama = product.nama
        .toLowerCase()
        .includes(keyword);

      const cocokKategori =
        kategoriAktif === "semua" ||
        product.kategori.toLowerCase() === kategoriAktif;

      return cocokNama && cocokKategori;
    });
  }

  /**
   * Renders empty state message when no products match filter
   */
  function renderEmptyState() {
    container.innerHTML = `
      <div class="empty-state">
        Produk tidak ditemukan.
      </div>
    `;
  }

  /**
   * Renders filtered products to container using DocumentFragment
   */
  function renderProduk() {
    if (!container) return;

    container.innerHTML = "";

    const hasil = getFilteredProducts();

    if (!hasil.length) {
      renderEmptyState();
      return;
    }

    const fragment = document.createDocumentFragment();

    hasil.forEach((product) => {
      fragment.appendChild(createProductCard(product));
    });

    container.appendChild(fragment);
  }



  /* ================= MODAL OPENING ================= */
  
  /**
   * Opens product detail modal with product information
   * @param {Object} product - Product data to display
   */
  function bukaModal(product) {
    if (!modal) return;

    modalImg.src = product.img;
    modalImg.alt = product.nama;

    modalNama.textContent = product.nama;
    modalKategori.textContent = product.kategori;

    modalHarga.textContent =
      `Harga mulai dari ${formatRupiah(product.harga_mulai)}`;

    modalDesc.textContent = product.deskripsi;

    modalWa.href =
      `https://wa.me/6282113687057?text=${createWaMessage(
        product
      )}`;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  }

  /* ================= MODAL CLOSING ================= */
  
  /**
   * Closes product detail modal
   */
  function tutupModal() {
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
  }

  /* ================= EVENT LISTENERS ================= */
  
  /* ----- PRODUCT FILTER CONTROLS ----- */
  // Category button filter handler
  kategoriBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      kategoriBtns.forEach((b) =>
        b.classList.remove("active")
      );

      btn.classList.add("active");
      kategoriAktif = btn.dataset.kategori.toLowerCase();

      renderProduk();

      container?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // Search input filter handler
  if (searchInput) {
    searchInput.addEventListener("input", renderProduk);
  }

  /* ----- MODAL INTERACTIONS ----- */
  // Close button click handler
  if (closeBtn) {
    closeBtn.addEventListener("click", tutupModal);
  }

  // Click outside modal to close
  document.addEventListener("click", (e) => {
    if (
      modal &&
      modal.classList.contains("is-open") &&
      e.target === modal
    ) {
      tutupModal();
    }
  });

  // Escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      modal &&
      modal.classList.contains("is-open")
    ) {
      tutupModal();
    }
  });

  /* ================= INITIALIZATION ================= */
  // Render initial product list on page load
  if (container && typeof produkData !== "undefined") {
    renderProduk();
  }
});
