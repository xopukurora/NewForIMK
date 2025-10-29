# EDLINK-KRS - Dokumentasi Aplikasi

Aplikasi sistem informasi akademik mahasiswa berbasis web yang dibangun dengan React + Vite.

## 📋 Daftar Isi

- [Instalasi Lokal](#instalasi-lokal)
- [Kustomisasi Warna](#kustomisasi-warna)
- [Struktur Proyek](#struktur-proyek)
- [Menambah Halaman Baru](#menambah-halaman-baru)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Instalasi Lokal

### Persyaratan Sistem
- Node.js versi 18 atau lebih tinggi
- npm atau yarn

### Langkah-langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd edlink-krs
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Menjalankan Development Server**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173/`

4. **Build untuk Production**
   ```bash
   npm run build
   ```
   File production akan ada di folder `dist/`

5. **Preview Production Build**
   ```bash
   npm run preview
   ```

---

## 🎨 Kustomisasi Warna

### Mengubah Color Palette

Semua warna aplikasi didefinisikan dalam **satu file** untuk memudahkan kustomisasi:

**File:** `src/index.css`

```css
:root {
  --malachite: #15bb21;        /* Hijau utama (header, tombol) */
  --japanese-laurel: #058204;   /* Hijau gelap (hover) */
  --astronaut: #222c6d;         /* Biru navy (teks penting) */
  --my-sin: #ffb81f;            /* Kuning/orange (badge) */
  --gin: #e6efe9;               /* Hijau muda (background) */
  --de-york: #7fc37e;           /* Hijau soft (ikon) */
  --regent-gray: #8798a4;       /* Abu-abu (teks sekunder) */
  --shark: #1f272b;             /* Hitam (teks utama) */
  --colonial-white: #ffebbe;    /* Kuning muda (highlight) */
}
```

### Cara Mengubah Warna

1. Buka file `src/index.css`
2. Ubah nilai hex color sesuai keinginan
3. Simpan file
4. Aplikasi akan otomatis reload (hot reload)

### Contoh Kustomisasi Warna

**Tema Biru:**
```css
:root {
  --malachite: #1976D2;        /* Biru utama */
  --japanese-laurel: #0D47A1;  /* Biru gelap */
  --astronaut: #0288D1;        /* Biru terang */
  --my-sin: #FFA726;           /* Orange */
  --gin: #E3F2FD;              /* Biru muda */
  --de-york: #64B5F6;          /* Biru soft */
  --regent-gray: #78909C;      /* Abu-abu */
  --shark: #263238;            /* Hitam */
  --colonial-white: #FFF3E0;   /* Orange muda */
}
```

**Tema Merah:**
```css
:root {
  --malachite: #D32F2F;        /* Merah utama */
  --japanese-laurel: #B71C1C;  /* Merah gelap */
  --astronaut: #C62828;        /* Merah tua */
  --my-sin: #FFA000;           /* Amber */
  --gin: #FFEBEE;              /* Merah muda */
  --de-york: #E57373;          /* Merah soft */
  --regent-gray: #78909C;      /* Abu-abu */
  --shark: #212121;            /* Hitam */
  --colonial-white: #FFF8E1;   /* Kuning muda */
}
```

### Pemetaan Warna di Aplikasi

| Variable | Digunakan di |
|----------|--------------|
| `--malachite` | Header, tombol utama, bottom navigation aktif |
| `--japanese-laurel` | Hover state tombol, accent gelap |
| `--astronaut` | Teks penting, tombol sekunder |
| `--my-sin` | Badge, highlight, ikon Kartu Mahasiswa |
| `--gin` | Background utama aplikasi |
| `--de-york` | Ikon KHS, accent hijau |
| `--regent-gray` | Teks sekunder, placeholder |
| `--shark` | Teks utama, judul |
| `--colonial-white` | Background highlight |

---

## 📁 Struktur Proyek

```
edlink-krs/
├── public/              # File statis
│   └── vite.svg
├── src/
│   ├── assets/         # Gambar, ikon, dll
│   │   └── react.svg
│   ├── components/     # Komponen reusable
│   │   └── BottomNavigation.jsx
│   ├── data/           # Data statis/mock
│   │   └── courses.js
│   ├── pages/          # Halaman aplikasi
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Akun.jsx
│   │   ├── Kalender.jsx
│   │   ├── KartuMahasiswa.jsx
│   │   ├── KHS.jsx
│   │   ├── Nilai.jsx
│   │   ├── PengisianKRS.jsx
│   │   ├── Pengumuman.jsx
│   │   ├── StatusValidasi.jsx
│   │   ├── Transkrip.jsx
│   │   ├── Loading.jsx
│   │   └── ComingSoon.jsx
│   ├── styles/         # CSS per halaman
│   │   ├── Dashboard.css
│   │   ├── Login.css
│   │   ├── Akun.css
│   │   └── ... (dll)
│   ├── utils/          # Helper functions
│   │   └── scheduleHelper.js
│   ├── App.jsx         # Root component & routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles & color palette
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
└── eslint.config.js    # ESLint configuration
```

---

## ➕ Menambah Halaman Baru

### 1. Buat File Halaman

**File:** `src/pages/NamaHalaman.jsx`

```jsx
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/NamaHalaman.css';

function NamaHalaman() {
  const navigate = useNavigate();

  return (
    <div className="nama-halaman-container">
      <header className="page-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Kembali
        </button>
        <h1>Judul Halaman</h1>
      </header>

      <div className="page-content">
        {/* Konten halaman di sini */}
      </div>

      <BottomNavigation />
    </div>
  );
}

export default NamaHalaman;
```

### 2. Buat File CSS

**File:** `src/styles/NamaHalaman.css`

```css
.nama-halaman-container {
  min-height: 100vh;
  background: var(--gin);
  padding-bottom: 80px;
}

.page-header {
  background: var(--malachite);
  color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-content {
  padding: 1rem;
}
```

### 3. Tambahkan Route

**File:** `src/App.jsx`

```jsx
// Import halaman baru
import NamaHalaman from './pages/NamaHalaman';

// Tambahkan di dalam <Routes>
<Route path="/nama-halaman" element={<NamaHalaman />} />
```

### 4. Tambahkan Menu (Opsional)

Jika ingin menambah menu di Dashboard, edit `src/pages/Dashboard.jsx`:

```jsx
const menuItems = [
  // ... menu existing
  { 
    title: 'Nama Menu', 
    icon: IconName, 
    path: '/nama-halaman', 
    color: '#15bb21' 
  },
];
```

---

## 🌐 Deployment

### Deploy ke Replit

Proyek sudah dikonfigurasi untuk Replit:
1. Push code ke repository
2. Import ke Replit
3. Replit akan otomatis mendeteksi dan menjalankan `npm run dev`
4. Klik tombol "Publish" untuk deploy ke production

### Deploy ke Vercel

1. **Install Vercel CLI** (opsional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   npm run build
   vercel
   ```

3. **Atau via GitHub:**
   - Push code ke GitHub
   - Connect repository di vercel.com
   - Vercel akan auto-deploy setiap push

### Deploy ke Netlify

1. **Build project**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

   Build directory: `dist`

3. **Atau via Web Interface:**
   - Drag & drop folder `dist` ke netlify.com/drop

---

## 🔧 Kustomisasi Lainnya

### Mengubah Font

**File:** `src/index.css`

```css
body {
  font-family: 'Poppins', 'Inter', sans-serif;
  /* atau font lain */
}
```

### Mengubah Ukuran Maksimal Aplikasi

**File:** `src/index.css`

```css
@media (min-width: 769px) {
  #root {
    max-width: 480px;  /* Ubah sesuai keinginan */
    margin: 0 auto;
  }
}
```

### Menambah Ikon

Proyek menggunakan **Lucide React** untuk ikon.

1. Import ikon yang diinginkan:
   ```jsx
   import { IconName } from 'lucide-react';
   ```

2. Gunakan dalam komponen:
   ```jsx
   <IconName size={24} color="white" />
   ```

Lihat semua ikon di: [lucide.dev](https://lucide.dev)

---

## 🐛 Troubleshooting

### Port sudah digunakan

Jika port 5173 sudah digunakan:
```bash
# Hentikan proses di port 5173
lsof -ti:5173 | xargs kill -9

# Atau gunakan port lain
npm run dev -- --port 3000
```

### Error saat npm install

```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

### Build error

```bash
# Pastikan semua dependencies terinstall
npm install

# Clean install
npm ci
```

### Aplikasi tidak reload otomatis

1. Cek apakah dev server berjalan
2. Pastikan tidak ada error di console
3. Restart dev server:
   ```bash
   # Ctrl+C untuk stop
   npm run dev
   ```

---

## 📚 Dependencies

### Production
- **React**: Library UI
- **React DOM**: Rendering React
- **React Router DOM**: Routing
- **Lucide React**: Icon library

### Development
- **Vite**: Build tool & dev server
- **ESLint**: Code linting
- **@vitejs/plugin-react**: React plugin untuk Vite

---

## 📝 Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Jalankan development server |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check kode dengan ESLint |

---

## 🤝 Kontribusi

Jika ingin berkontribusi:
1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik.

---

## 💡 Tips

1. **Konsistensi Warna**: Selalu gunakan CSS variables daripada hardcode warna
2. **Responsive**: Test di berbagai ukuran layar
3. **Performance**: Gunakan React.memo untuk komponen yang tidak sering berubah
4. **Code Style**: Ikuti ESLint rules yang sudah ada
5. **Git**: Commit secara berkala dengan pesan yang jelas

---

**Dibuat dengan ❤️ menggunakan React + Vite**
