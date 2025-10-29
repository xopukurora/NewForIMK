# 🚀 Panduan Cepat - EDLINK KRS

## 📖 Dokumentasi Lengkap
Baca dokumentasi lengkap di: **`edlink-krs/README.md`**

---

## 🎨 Mengubah Warna Aplikasi

**File:** `edlink-krs/src/index.css` (baris 1-11)

```css
:root {
  --malachite: #15bb21;        /* Hijau utama → Ganti dengan warna favoritmu */
  --japanese-laurel: #058204;   /* Hijau gelap */
  --astronaut: #222c6d;         /* Biru navy */
  --my-sin: #ffb81f;            /* Kuning/orange */
  --gin: #e6efe9;               /* Background */
  --de-york: #7fc37e;           /* Hijau soft */
  --regent-gray: #8798a4;       /* Abu-abu */
  --shark: #1f272b;             /* Hitam */
  --colonial-white: #ffebbe;    /* Kuning muda */
}
```

💡 **Tips:** Ubah nilai hex color di samping kanan, simpan, dan aplikasi akan otomatis reload!

---

## 💻 Clone & Jalankan di Lokal

```bash
# 1. Clone repository
git clone <repository-url>
cd edlink-krs

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev

# Buka browser: http://localhost:5173/
```

---

## 📁 Struktur File Penting

```
edlink-krs/
├── src/
│   ├── index.css           ← WARNA UTAMA DI SINI
│   ├── pages/              ← Semua halaman aplikasi
│   │   ├── Dashboard.jsx   ← Halaman utama
│   │   ├── Login.jsx
│   │   └── ...
│   ├── styles/             ← CSS per halaman
│   │   ├── Dashboard.css
│   │   └── ...
│   └── components/         ← Komponen reusable
```

---

## ➕ Menambah Halaman Baru (3 Langkah)

### 1️⃣ Buat file halaman: `src/pages/HalamanBaru.jsx`
```jsx
import BottomNavigation from '../components/BottomNavigation';
import '../styles/HalamanBaru.css';

function HalamanBaru() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>Judul Halaman</h1>
      </header>
      <div className="content">
        {/* Konten di sini */}
      </div>
      <BottomNavigation />
    </div>
  );
}

export default HalamanBaru;
```

### 2️⃣ Buat CSS: `src/styles/HalamanBaru.css`
```css
.container {
  min-height: 100vh;
  background: var(--gin);
  padding-bottom: 80px;
}

.page-header {
  background: var(--malachite);
  color: white;
  padding: 1rem;
}
```

### 3️⃣ Tambah route di `src/App.jsx`
```jsx
import HalamanBaru from './pages/HalamanBaru';

// Di dalam <Routes>
<Route path="/halaman-baru" element={<HalamanBaru />} />
```

---

## 🔍 Referensi Cepat

| Kebutuhan | Lokasi File |
|-----------|-------------|
| Ubah warna | `src/index.css` |
| Ubah halaman Dashboard | `src/pages/Dashboard.jsx` |
| Ubah style Dashboard | `src/styles/Dashboard.css` |
| Ubah font | `src/index.css` (body) |
| Tambah ikon | Import dari `lucide-react` |

---

## 🆘 Masalah Umum

**Server tidak jalan?**
```bash
npm install
npm run dev
```

**Port sudah digunakan?**
```bash
npm run dev -- --port 3000
```

**Perubahan tidak terlihat?**
- Pastikan dev server berjalan
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)

---

## 📚 Resources

- **Dokumentasi Lengkap:** `edlink-krs/README.md`
- **Icon Library:** [lucide.dev](https://lucide.dev)
- **React Docs:** [react.dev](https://react.dev)
- **Vite Docs:** [vitejs.dev](https://vitejs.dev)

---

**Selamat Coding! 🎉**
