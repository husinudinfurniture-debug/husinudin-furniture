/* =========================================================
   MAIN.JS - FINAL CLEAN VERSION (STABLE & MAINTAINABLE)
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ================= HEADER ACTIVE ================= */
  const path = window.location.pathname;
  document.querySelectorAll(".nav a").forEach(link => {
    if (link.getAttribute("href") === path.split("/").pop()) {
      link.classList.add("active");
    }
  });

  /* ================= THEME ================= */
  (function () {
    const stored = localStorage.getItem("theme");
    if (stored) {
      document.documentElement.setAttribute("data-theme", stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  })();

  /* ================= NAV TOGGLE ================= */
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !open);
      nav.classList.toggle("active");
    });
  }

  /* ================= PRODUK ================= */
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

  /* ================= RENDER ================= */
  function renderProduk() {
    if (!container) return;

    container.innerHTML = "";

    const keyword = searchInput?.value.toLowerCase() || "";

    const hasil = produkData.filter(p => {
      const cocokNama = p.nama.toLowerCase().includes(keyword);
      const cocokKategori =
        kategoriAktif === "semua" || p.kategori === kategoriAktif;

      return cocokNama && cocokKategori;
    });

    hasil.forEach(p => {
      const card = document.createElement("div");
      card.className = "produk-card";

      card.innerHTML = `
        <img src="${p.img}" alt="${p.nama}" loading="lazy">
        <h4>${p.nama}</h4>
        <div class="harga">
          Rp ${p.harga_min.toLocaleString("id-ID")} – Rp ${p.harga_max.toLocaleString("id-ID")}
        </div>
        <p>${p.deskripsi}</p>
      `;

      /* 🔥 FIX: EVENT CLICK HARUS DI SINI */
      card.addEventListener("click", () => bukaModal(p));

      container.appendChild(card);
    });
  }

  /* ================= FILTER ================= */
  kategoriBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      kategoriBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      kategoriAktif = btn.dataset.kategori;
      renderProduk();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", renderProduk);
  }

  /* ================= MODAL ================= */
  function bukaModal(p) {
    if (!modal) return;

    modalImg.src = p.img;
    modalNama.textContent = p.nama;
    modalKategori.textContent = p.kategori;

    modalHarga.textContent =
      `Rp ${p.harga_min.toLocaleString("id-ID")} – Rp ${p.harga_max.toLocaleString("id-ID")}`;

    modalDesc.textContent = p.deskripsi;

    modalWa.href =
      "https://wa.me/6282113687057?text=" +
      encodeURIComponent(`Halo, saya tertarik dengan ${p.nama}`);

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function tutupModal() {
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  if (closeBtn) closeBtn.addEventListener("click", tutupModal);

  document.addEventListener("click", (e) => {
    if (modal && modal.classList.contains("is-open")) {
      if (e.target === modal) {
        tutupModal();
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal && modal.classList.contains("is-open")) {
        tutupModal();
      }
    }
  });

  /* ================= HEADER SCROLL ================= */
const header = document.querySelector(".header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

  /* ================= INIT ================= */
  if (container) renderProduk();

});
