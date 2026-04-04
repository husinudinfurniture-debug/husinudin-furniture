/* =========================================================
   MAIN.JS - FINAL UPGRADED VERSION
   Stable • Conversion Oriented • Harga Mulai Dari
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ================= HEADER ACTIVE ================= */
  const path = window.location.pathname;

  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");
    const currentPage = path.split("/").pop();

    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  /* ================= THEME ================= */
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

  /* ================= NAV TOGGLE ================= */
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

  /* ================= HEADER SCROLL ================= */
  const header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    });
  }

  /* ================= ELEMENTS ================= */
  const container = document.getElementById("produk-list");
  const searchInput = document.getElementById("searchInput");
  const kategoriBtns = document.querySelectorAll(".kategori button");

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalNama = document.getElementById("modalNama");
  const modalKategori = document.getElementById("modalKategori");
  const modalHarga = document.getElementById("modalHarga");
  const modalDesc = document.getElementById("modalDesc");
  const modalWa = document.getElementById("modalWa");
  const closeBtn = document.querySelector(".close");

  let kategoriAktif = "semua";

  /* ================= HELPERS ================= */
  function formatRupiah(number) {
    return `Rp ${Number(number).toLocaleString("id-ID")}`;
  }

  function createWaMessage(product) {
    return encodeURIComponent(
      `Halo, saya tertarik dengan model ${product.nama}.
Saya ingin konsultasi ukuran, warna, bahan, dan estimasi pengerjaan.`
    );
  }

  /* ================= CREATE CARD ================= */
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

  /* ================= FILTER PRODUCTS ================= */
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

  /* ================= EMPTY STATE ================= */
  function renderEmptyState() {
    container.innerHTML = `
      <div class="empty-state">
        Produk tidak ditemukan.
      </div>
    `;
  }

  /* ================= RENDER PRODUCTS ================= */
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

  /* ================= FILTER BUTTONS ================= */
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

  /* ================= SEARCH ================= */
  if (searchInput) {
    searchInput.addEventListener("input", renderProduk);
  }

  /* ================= OPEN MODAL ================= */
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

  /* ================= CLOSE MODAL ================= */
  function tutupModal() {
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", tutupModal);
  }

  document.addEventListener("click", (e) => {
    if (
      modal &&
      modal.classList.contains("is-open") &&
      e.target === modal
    ) {
      tutupModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      modal &&
      modal.classList.contains("is-open")
    ) {
      tutupModal();
    }
  });

  /* ================= INIT ================= */
  if (container && typeof produkData !== "undefined") {
    renderProduk();
  }
});
