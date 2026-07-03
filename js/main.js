/* =========================  MAIN.JS  ========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= THEME TOGGLE ================= */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    try { localStorage.setItem("hf-theme", theme); } catch (e) {}
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      applyTheme(isDark ? "light" : "dark");
    });
  }

  /* ================= HEADER SCROLL ================= */
  /* FIXED v3: no more inline style injection. CSS classes (.transparent / .scrolled)
     now carry ALL the color rules themselves (see layout.css), so toggling the
     class is the only thing JS needs to do — no flash, no inconsistency. */
  const header = document.getElementById("header");

  if (header) {
    const isTransparentVariant = header.classList.contains("transparent") || header.dataset.transparent === "true";

    const handleScroll = () => {
      if (isTransparentVariant) {
        const scrolled = window.scrollY > 60;
        header.classList.toggle("scrolled", scrolled);
        header.classList.toggle("transparent", !scrolled);
      } else {
        header.classList.toggle("scrolled", window.scrollY > 10);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  /* ================= ACTIVE NAV LINK ================= */
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a, .nav-drawer a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("active");
    }
  });

  /* ================= MOBILE NAV TOGGLE ================= */
  const navToggle = document.querySelector(".nav-toggle");
  const navDrawer = document.getElementById("nav-drawer");

  if (navToggle && navDrawer) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isOpen);
      navDrawer.classList.toggle("active");
      navToggle.textContent = isOpen ? "☰" : "✕";
    });

    // Close drawer when a link inside is clicked
    navDrawer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navDrawer.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "☰";
      });
    });

    // Close on outside click
    document.addEventListener("click", e => {
      if (!navDrawer.contains(e.target) && !navToggle.contains(e.target)) {
        navDrawer.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "☰";
      }
    });
  }

  /* ================= SCROLL REVEAL ================= */
  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length > 0 && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    reveals.forEach(el => el.classList.add("in-view"));
  }

  /* ================= PRODUCT PAGE ================= */
  const produkList   = document.getElementById("produk-list");
  const searchInput  = document.getElementById("searchInput");
  const filterBtns   = document.querySelectorAll(".filter-btn");
  const productCount = document.getElementById("productCount");

  if (!produkList || typeof produkData === "undefined") return;

  let activeKategori = "semua";

  /* --- Format Rupiah --- */
  function formatRupiah(n) {
    return "Rp " + Number(n).toLocaleString("id-ID");
  }

  /* --- WhatsApp Message --- */
  function waMsg(product) {
    if (product.id === 15) {
      return encodeURIComponent(
        "Halo, saya ingin konsultasi custom sofa sesuai referensi desain sendiri. Saya akan kirimkan gambar referensinya."
      );
    }
    if (product.id === 23) {
      return encodeURIComponent(
        "Halo, saya ingin konsultasi custom tempat tidur sesuai referensi desain sendiri. Saya akan kirimkan gambar referensinya."
      );
    }
    return encodeURIComponent(
      `Halo, saya tertarik dengan model ${product.nama}.\nSaya ingin konsultasi ukuran, warna, bahan, dan estimasi pengerjaan.`
    );
  }

  /* --- Create Card --- */
  function createCard(product) {
    const card = document.createElement("div");
    card.className = "produk-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Lihat detail ${product.nama}`);

    const isCustom = product.id === 15 || product.id === 23;

    card.innerHTML = `
      <div class="produk-card__img-wrap">
        <img src="${product.img}" alt="${product.nama}" loading="lazy">
        <span class="produk-card__badge">${product.kategori === "tidur" ? "Tempat Tidur" : "Sofa"}</span>
      </div>
      <div class="produk-card__body">
        <h4>${product.nama}</h4>
        <div class="harga">Mulai ${formatRupiah(product.harga_mulai)}</div>
        <div class="konsultasi-tag">${isCustom ? "✓ Kirim referensi desain Anda" : "✓ Custom ukuran, warna & bahan"}</div>
      </div>
    `;

    const open = () => openModal(product);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });

    return card;
  }

  /* --- Filter --- */
  function getFiltered() {
    const keyword = searchInput?.value.toLowerCase().trim() || "";
    return produkData.filter(p => {
      const matchName = p.nama.toLowerCase().includes(keyword);
      const matchKat  = activeKategori === "semua" || p.kategori.toLowerCase() === activeKategori;
      return matchName && matchKat;
    });
  }

  /* --- Render Products --- */
  function renderProducts() {
    produkList.innerHTML = "";
    const hasil = getFiltered();

    // Urutkan hasil berdasarkan harga_mulai: termurah -> termahal
    hasil.sort((a, b) => (a.harga_mulai || 0) - (b.harga_mulai || 0));

    if (productCount) {
      productCount.textContent = `Menampilkan ${hasil.length} produk`;
    }

    if (!hasil.length) {
      produkList.innerHTML = `
        <div class="empty-state">
          <p>Produk tidak ditemukan.</p>
          <p>Coba kata kunci lain atau pilih kategori berbeda.</p>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();
    hasil.forEach(p => fragment.appendChild(createCard(p)));
    produkList.appendChild(fragment);
  }

  /* --- Filter Buttons --- */
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeKategori = btn.dataset.kategori.toLowerCase();
      renderProducts();
    });
  });

  /* --- Search --- */
  if (searchInput) {
    searchInput.addEventListener("input", renderProducts);
  }

  /* ================= MODAL ================= */
  const modal     = document.getElementById("modal");
  const modalImg  = document.getElementById("modalImg");
  const modalNama = document.getElementById("modalNama");
  const modalKat  = document.getElementById("modalKategori");
  const modalHarga= document.getElementById("modalHarga");
  const modalDesc = document.getElementById("modalDesc");
  const modalWa   = document.getElementById("modalWa");
  const closeBtn  = document.querySelector(".modal-close");

  function openModal(product) {
    if (!modal) return;
    modalImg.src  = product.img;
    modalImg.alt  = product.nama;
    modalNama.textContent = product.nama;
    modalKat.textContent  = product.kategori === "tidur" ? "Tempat Tidur" : "Sofa";
    modalHarga.textContent= `Mulai ${formatRupiah(product.harga_mulai)}`;
    modalDesc.textContent = product.deskripsi;
    modalWa.href = `https://wa.me/6282113687057?text=${waMsg(product)}`;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeBtn?.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal?.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
  });

  /* --- Initial Render --- */
  renderProducts();

});
