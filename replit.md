# Aplikasi Pengisian KRS - EDLINK

## Overview
Aplikasi ini adalah sistem pengisian Kartu Rencana Studi (KRS) berbasis web untuk mahasiswa dengan **desain mobile-first**. Aplikasi ini dibuat menggunakan React + Vite dengan fitur-fitur modern, user-friendly, dan dioptimalkan untuk perangkat mobile.

## Tanggal Pembuatan
29 Oktober 2025

## Design System

### Color Palette
Aplikasi menggunakan color palette hijau yang modern dan konsisten:
- **Primary Green** (#15bb21 - malachite): Header, tombol utama, dan aksen
- **Dark Green** (#058204 - japanese-laurel): Hover states dan aksen gelap
- **Navy Blue** (#222c6d - astronaut): Teks penting dan tombol sekunder
- **Yellow/Orange** (#ffb81f - my-sin): Badge, highlight, dan peringatan
- **Light Green** (#e6efe9 - gin): Background utama
- **Soft Green** (#7fc37e - de-york): Aksen dan icon tertentu
- **Gray** (#8798a4 - regent-gray): Teks secondary
- **Dark Gray** (#1f272b - shark): Teks utama
- **Light Yellow** (#ffebbe - colonial-white): Background highlight

### Mobile-First Approach
- Optimized untuk layar mobile (< 480px)
- Responsive hingga desktop dengan max-width 480px
- Bottom navigation bar yang sticky
- Touch-friendly button sizes
- Grid layout yang adaptif

## Struktur Aplikasi

### Alur Aplikasi
1. **Loading** (`/`) - Auto-redirect ke Login/Dashboard berdasarkan status login
2. **Login** (`/login`) - Halaman login dengan color scheme hijau
3. **Dashboard** (`/dashboard`) - Grid menu "MyAcademic" dengan 14 menu icon
4. **Pengisian KRS** (`/pengisian-krs`) - Halaman utama untuk memilih mata kuliah
5. **Status Validasi** (`/status-validasi`) - Halaman untuk melihat status validasi KRS

### Bottom Navigation
Setiap halaman (kecuali Login) memiliki bottom navigation dengan 5 menu:
1. **Beranda** - Dashboard utama
2. **Jelajah** - Fitur eksplorasi (coming soon)
3. **Ruang Kelas** - Akses ruang kelas (coming soon)
4. **Obrolan** - Messaging (coming soon)
5. **Akun** - Profil dan settings (coming soon)

### Fitur Utama

#### 1. Dashboard MyAcademic
- Header hijau dengan foto profil mahasiswa
- Grid 4x4 menu icon dengan 14 menu akademik:
  - Presensi QR, Kartu Mahasiswa, Keuangan
  - **KRS**, KHS, Nilai
  - Pengajuan Sesi, Kampanye Belajar
  - Transkrip, Konsultasi Dosen
  - Tugas Aktif, Data Akademik
  - Akreditasi, Akreditasi Prodi
- Tombol notifikasi dan logout
- Mobile-optimized layout

#### 2. Pengisian KRS
- Daftar mata kuliah wajib dan pilihan terpisah
- Deteksi bentrok jadwal otomatis dengan warning yang jelas
- Deteksi kelas penuh dengan ikon peringatan mencolok (red badge)
- Checkbox berubah menjadi ikon centang hijau setelah dipilih
- Notifikasi real-time saat menambah/menghapus kelas
- Summary card: Total SKS, Mata Kuliah, Batas SKS
- Tombol sticky di bawah: "Simpan Draft" (navy) dan "Ajukan Validasi" (green)
- Mobile-first card design dengan rounded corners

#### 3. Status Validasi
- Status banner dengan 4 state: Draft, Pending (orange), Approved (green), Rejected (red)
- Ringkasan KRS dengan total mata kuliah dan SKS
- List mata kuliah terpilih dengan nomor urut
- Informasi lengkap dosen wali
- Timestamp pengajuan KRS
- Demo button untuk simulasi approval

### Teknologi
- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Styling**: CSS Modules
- **Storage**: LocalStorage untuk data sementara

### Akun Demo
- Username: `mahasiswa`
- Password: `kampus123`

## Perbaikan UI/UX yang Diimplementasikan

### 1. Status Peringatan yang Mencolok
- Status "Kelas Penuh" dengan background merah muda, border merah, dan ikon XCircle
- Status "Jadwal Bentrok" dengan background orange, border orange terang, dan ikon AlertTriangle
- Font size yang lebih besar dan bold untuk mudah dibaca

### 2. Tombol Simpan yang Strategis
- Tombol diperbesar dan dipindahkan ke bagian bawah sticky
- Warna hijau mencolok untuk tombol "Simpan Draft"
- Warna gradient purple untuk tombol "Ajukan KRS untuk Validasi"
- Ukuran font lebih besar (1.1rem) dan padding yang cukup
- Shadow effect untuk membuatnya lebih menonjol

### 3. Checkbox yang Berubah
- Checkbox biasa saat belum dipilih
- Berubah menjadi ikon CheckCircle2 berwarna hijau saat dipilih
- Background kelas berubah menjadi hijau muda saat terpilih
- Border berubah menjadi hijau dengan shadow

### 4. Feedback Sistem
- Notifikasi sliding dari kanan atas saat menambah kelas: "Kelas berhasil ditambahkan ke KRS tersimpan!"
- Notifikasi error saat kelas penuh atau jadwal bentrok
- Modal konfirmasi saat menyimpan draft
- Animasi yang smooth dan eye-catching

## File Structure
```
edlink-krs/
├── src/
│   ├── components/
│   │   └── BottomNavigation.jsx  (navigasi bawah 5 menu)
│   ├── data/
│   │   └── courses.js    (data mata kuliah wajib dan pilihan)
│   ├── pages/
│   │   ├── Loading.jsx   (auto-redirect)
│   │   ├── Login.jsx     (mobile-optimized login)
│   │   ├── Dashboard.jsx (grid menu MyAcademic)
│   │   ├── PengisianKRS.jsx
│   │   └── StatusValidasi.jsx
│   ├── styles/
│   │   ├── BottomNavigation.css
│   │   ├── Dashboard.css     (mobile-first grid)
│   │   ├── Login.css         (new color palette)
│   │   ├── PengisianKRS.css  (mobile-first)
│   │   └── StatusValidasi.css
│   ├── utils/
│   │   └── scheduleHelper.js  (helper untuk deteksi bentrok)
│   ├── App.jsx          (routing utama)
│   ├── main.jsx
│   └── index.css        (global styles + color palette)
├── vite.config.js       (konfigurasi Vite untuk Replit)
└── package.json
```

## Development
```bash
cd edlink-krs
npm install
npm run dev
```

Server akan berjalan di port 5000.

## Konfigurasi Penting

### Vite Configuration untuk Replit
File `vite.config.js` sudah dikonfigurasi dengan benar untuk environment Replit:
- `host: '0.0.0.0'` - Membuat server dapat diakses dari luar
- `port: 5000` - Port standar Replit
- `allowedHosts: true` - **PENTING**: Mengizinkan semua host untuk dynamic URL Replit
- `hmr.clientPort: 5000` - Hot Module Replacement untuk development

## Recent Changes
- **29 Oktober 2025 - Initial Setup:**
  - Setup aplikasi dengan semua fitur dasar
  - Implementasi deteksi bentrok jadwal otomatis
  - Perbaikan UI/UX (status mencolok, tombol strategis, checkbox berubah, feedback)
  - Fix Vite configuration: `allowedHosts: true`

- **29 Oktober 2025 - Mobile-First Redesign:**
  - ✅ Implementasi color palette hijau (malachite, astronaut, my-sin, dll)
  - ✅ Buat BottomNavigation component dengan 5 menu
  - ✅ Redesign Dashboard menjadi grid menu MyAcademic (4x4 layout)
  - ✅ Update Login page dengan color palette baru
  - ✅ Update Pengisian KRS dengan mobile-first design
  - ✅ Update Status Validasi dengan mobile-first design
  - ✅ Loading page menjadi auto-redirect
  - ✅ Responsive design: mobile-first dengan max-width 480px di desktop
  - ✅ Header hijau dengan profile info di semua halaman
  - ✅ Sticky bottom navigation dan sticky action buttons
