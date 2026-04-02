const produkData = [
  // ================== SOFA ==================
  {
    id: 1,
    nama: "Sofa Manohara Gold – Luxury Chesterfield",
    kategori: "Sofa",
    img: "assets/images/sofa01.png",
    harga_min: 7500000,
    harga_max: 10500000,
    deskripsi: "Sofa set luxury dengan desain chesterfield tufted dan aksen stainless gold yang memberikan kesan elegan pada ruang tamu. Dibuat menggunakan rangka kayu solid dan busa high density untuk kenyamanan maksimal. Tersedia layanan custom warna, bahan, dan ukuran sesuai kebutuhan."
  },
  {
    id: 2,
    nama: "Sofa Verona Classic – Royal Tufted",
    kategori: "sofa",
    img: "assets/images/sofa02.png",
    harga_min: 7500000,
    harga_max: 9500000,
    deskripsi: "Sofa set bergaya klasik Eropa dengan desain tufted elegan dan detail ukiran dekoratif pada armrest. Dibuat menggunakan rangka kayu solid dan busa high density sehingga nyaman dan tahan lama. Tersedia layanan custom warna, bahan, dan ukuran sesuai kebutuhan."
  },
  {
    id: 3,
    nama: "Sofa Aurelia – Modern Glam",
    kategori: "sofa",
    img: "assets/images/sofa03.png",
    harga_min: 8000000,
    harga_max: 10500000,
    deskripsi: "Sofa set modern glam dengan desain sandaran melengkung elegan dan material velvet premium. Dipadukan dengan kaki metal finishing gold yang memberikan kesan mewah pada ruang tamu. Dibuat menggunakan rangka kayu solid dan busa high density untuk kenyamanan maksimal."
  },
  {
    id: 4,
    nama: "Sofa Savanna – Minimalis Sudut",
    kategori: "sofa",
    img: "assets/images/sofa04.png",
    harga_min: 5000000,
    harga_max: 7500000,
    deskripsi: "Sofa sudut minimalis dengan desain modern yang nyaman untuk ruang keluarga. Dilengkapi ottoman multifungsi serta rangka kayu solid dan busa high density. Tersedia layanan custom warna, bahan, dan ukuran sesuai kebutuhan."
  },
  {
    id: 5,
    nama: "Sofa Osaka – Modern Lounge",
    kategori: "sofa",
    img: "assets/images/sofa05.png",
    harga_min: 6000000,
    harga_max: 8500000,
    deskripsi: "Sofa set modern minimalis dengan sandaran kepala adjustable yang memberikan kenyamanan maksimal. Dibuat menggunakan rangka kayu solid dan busa high density sehingga nyaman dan tahan lama. Cocok untuk ruang keluarga dengan konsep modern."
  },
  {
    id: 6,
    nama: "Sofa Cloud Luna – Modern Curved",
    kategori: "sofa",
    img: "assets/images/sofa06.png",
    harga_min: 8000000,
    harga_max: 11500000,
    deskripsi: "Sofa modern dengan desain melengkung yang elegan dan nyaman. Menggunakan rangka kayu solid serta busa high density dengan upholstery fabric premium. Cocok untuk ruang tamu modern dan interior aesthetic."
  },
  {
    id: 7,
    nama: "Sofa Lounge Orion – Genuine Leather",
    kategori: "sofa",
    img: "assets/images/sofa07.png",
    harga_min: 12000000,
    harga_max: 16000000,
    deskripsi: "Sofa single seater premium dengan desain tebal dan sandaran tinggi yang memberikan kenyamanan maksimal saat bersantai. Dibuat menggunakan rangka kayu solid, busa high density berkualitas, serta dilapisi kulit asli (genuine leather) yang kuat, elegan, dan tahan lama. Cocok untuk ruang tamu, ruang keluarga, maupun ruang santai dengan konsep interior modern dan mewah. Tersedia pilihan custom warna dan ukuran sesuai kebutuhan."
  },
  {
    id: 8,
    nama: "Sofa Dakota – Minimalis L",
    kategori: "sofa",
    img: "assets/images/sofa08.png",
    harga_min: 3500000,
    harga_max: 6500000,
    deskripsi: "Gaya klasik elegan dengan detail kancing khas."
  },
  {
    id: 9,
    nama: "Sofa Aurora – Soft Classic",
    kategori: "sofa",
    img: "assets/images/sofa09.png",
    harga_min: 3500000,
    harga_max: 6500000,
    deskripsi: "Gaya klasik elegan dengan detail kancing khas."
  },
  {
    id: 10,
    nama: "Sofa L Kyoto – Japandi Minimalis",
    kategori: "sofa",
    img: "assets/images/sofa10.png",
    harga_min: 3500000,
    harga_max: 6500000,
    deskripsi: "Gaya klasik elegan dengan detail kancing khas."
  },
  {
    id: 11,
    nama: "Sofa Neo – Modern Family",
    kategori: "sofa",
    img: "assets/images/sofa11.png",
    harga_min: 3500000,
    harga_max: 6500000,
    deskripsi: "Gaya klasik elegan dengan detail kancing khas."
  },
  {
    id: 12,
    nama: "Sofa Bed Kyoto – Minimalis Lipat",
    kategori: "sofa",
    img: "assets/images/sofa12.png",
    harga_min: 3500000,
    harga_max: 6500000,
    deskripsi: "Gaya klasik elegan dengan detail kancing khas."
  },
  {
    id: 13,
    nama: "Sofa L Chesterfield Orion – Luxury Corner",
    kategori: "sofa",
    img: "assets/images/sofa13.png",
    harga_min: 3500000,
    harga_max: 6500000,
    deskripsi: "Gaya klasik elegan dengan detail kancing khas."
  },
  {
    id: 14,
    nama: "Sofa Bubble Soft – Contemporary Aesthetic",
    kategori: "sofa",
    img: "assets/images/sofa14.png",
    harga_min: 7000000,
    harga_max: 13000000,
    deskripsi: "Sofa dengan desain rounded dan empuk ala 'bubble sofa' yang sedang trend. Memberikan kesan aesthetic dan cozy. Menggunakan busa premium dan fabric lembut, cocok untuk interior modern dan konten visual Instagramable."
  },
  {
    id: 15,
    nama: "Custom Sofa Design – By Request",
    kategori: "sofa",
    img: "assets/images/sofa15.png",
    harga_min: 4000000,
    harga_max: 20000000,
    deskripsi: "Layanan custom sofa sesuai desain pelanggan. Customer dapat membawa referensi gambar sendiri dan kami akan memproduksi sesuai kebutuhan, mulai dari ukuran, bahan, warna, hingga tingkat kenyamanan."
  },

  //================== TEMPAT TIDUR ==================//
  {
   id: 20,
   nama: "Bed Set Minimalis Modern",
   kategori: "tidur",
   img: "assets/images/bed01.png",
   harga_min: 4500000,
   harga_max: 7500000,
   deskripsi: "Paket rangka + kasur siap pakai."
  },
  {
   id: 21,
   nama: "Bed Milano – Luxury Panel",
   kategori: "tidur",
   img: "assets/images/bed02.png",
   harga_min: 8000000,
   harga_max: 14000000,
   deskripsi: "Tempat tidur premium dengan panel headboard tinggi dan aksen elegan untuk kamar mewah."
  },
    {
   id: 22,
   nama: "Bed Cloud Dream – Upholstered Soft",
   kategori: "tidur",
   img: "assets/images/bed03.png",
   harga_min: 6000000,
   harga_max: 11000000,
   deskripsi: "Tempat tidur dengan headboard empuk dan desain rounded ala cloud bed yang sedang trend."
  },
  {
   id: 23,
   nama: "Custom Bed Design – By Request",
   kategori: "tidur",
   img: "assets/images/bed04.png",
   harga_min: 5000000,
   harga_max: 20000000,
   deskripsi: "Layanan custom tempat tidur sesuai desain pelanggan."
},
];
