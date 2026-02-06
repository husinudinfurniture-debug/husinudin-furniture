/* =========================================================
   MAIN.JS - Semua halaman Husinudin Furniture
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  // ================== HEADER ACTIVE LINK ==================
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach(link => {
    if (link.getAttribute("href") === path.split("/").pop()) {
      link.classList.add("active");
    }
  });

  // ================== THEME: respect user/system preference + manual override ==================
  (function initTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) {
      document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();

  // ================== HAMBURGER MENU TOGGLE ==================
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isOpen);
      nav.classList.toggle("active");
      if (!isOpen) {
        navToggle.classList.add('is-open');
      } else {
        navToggle.classList.remove('is-open');
      }
    });

    // close nav when focus moves away (accessibility)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // ================== PRODUK PAGE ==================
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

  let kategoriAktif = "All";

  // Render Produk
  function renderProduk(data) {
    if (!container) return; // aman untuk halaman lain
    container.innerHTML = "";
    data.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.img}" alt="${p.nama}" loading="lazy">
        <div class="content">
          <h3>${p.nama}</h3>
          <p class="harga">Rp ${p.harga_min.toLocaleString("id-ID")} – Rp ${p.harga_max.toLocaleString("id-ID")}</p>
          <p class="kategori">${p.kategori}</p>
        </div>
      `;
        card.addEventListener('click', () => bukaModal(p));
      container.appendChild(card);
    });
  }

  // Filter Produk
  function filterProduk() {
    if (!container) return;
    const keyword = searchInput.value.toLowerCase();
    const hasil = produkData.filter(p => {
      const cocokNama = p.nama.toLowerCase().includes(keyword);
      const cocokKategori = kategoriAktif === "All" || p.kategori === kategoriAktif;
      return cocokNama && cocokKategori;
    });
    renderProduk(hasil);
  }

  // Kategori (use addEventListener for consistency)
  kategoriBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      kategoriBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      kategoriAktif = btn.dataset.kategori;
      filterProduk();
    });
  });

  if (searchInput) searchInput.addEventListener('input', filterProduk);

  // Modal
  function bukaModal(p) {
    if (!modal) return;
    modalImg.src = p.img;
    modalNama.textContent = p.nama;
    modalKategori.textContent = p.kategori;
    modalHarga.textContent = `Estimasi harga: Rp ${p.harga_min.toLocaleString("id-ID")} – Rp ${p.harga_max.toLocaleString("id-ID")}`;
    modalDesc.textContent = p.deskripsi;
    modalWa.href = "https://wa.me/6281234567890?text=" + encodeURIComponent(`Halo, saya tertarik dengan ${p.nama}`);
    modal.classList.add('is-open');
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add('modal-open');
  }

  function tutupModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove('modal-open');
  }

  if (closeBtn) closeBtn.addEventListener('click', tutupModal);

  // Close modal on outside click using event delegation
  document.addEventListener('click', (e) => {
    if (modal && modal.classList.contains('is-open')) {
      if (e.target === modal) {
        tutupModal();
      }
    }
  });

  // Inisialisasi Produk jika ada
  if (container) renderProduk(produkData);

  // ================== CUSTOM.HTML INTERAKSI ==================
  // CTA Button ke WA sudah di HTML, hanya hover/focus efek bisa ditambah via CSS

  // ================== TENTANG.HTML INTERAKSI ==================
  // Tidak ada interaksi kompleks, hanya animasi scroll CSS jika ada (opsional)
  // Bisa ditambahkan animasi scroll ke setiap section jika perlu
  const aboutSections = document.querySelectorAll("section");
  if (aboutSections.length) {
    // Use CSS classes for reveal animations; initial state handled in CSS
    aboutSections.forEach(section => section.classList.add('reveal'));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.2 });

    aboutSections.forEach(section => observer.observe(section));
  }

  // ================== GLOBAL: SMOOTH SCROLL UNTUK ANCHOR ==================
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ================== HEADER TRANSPARENCY & SCROLL STATE ==================
  (function headerScrollHandler() {
    const header = document.querySelector('.header');
    if (!header) return;

    // If on home page, prefer transparent state on top
    const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
    if (isHome) header.classList.add('transparent');

    let lastKnownY = 0;
    let ticking = false;

    function update() {
      const y = window.scrollY || window.pageYOffset;
      if (y > 60) {
        header.classList.add('scrolled');
        header.classList.remove('transparent');
      } else {
        header.classList.remove('scrolled');
        if (isHome) header.classList.add('transparent');
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      lastKnownY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  })();

  // ================== ESC TO CLOSE MODAL ==================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal.is-open');
      if (modal) {
        // use existing tutupModal function if present
        const closeBtn = document.querySelector('.close');
        if (closeBtn) closeBtn.click();
      }
    }
  });

});