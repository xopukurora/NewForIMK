# Aplikasi Pengisian KRS - EDLINK

## Overview
Aplikasi ini adalah sistem pengisian Kartu Rencana Studi (KRS) berbasis web untuk mahasiswa. Aplikasi ini dibuat menggunakan React + Vite dengan fitur-fitur modern dan user-friendly.

## Tanggal Pembuatan
29 Oktober 2025

## Struktur Aplikasi

### Alur Aplikasi
1. **Loading** (`/`) - Halaman splash screen dengan animasi loading
2. **Login** (`/login`) - Halaman login dengan username dan password kampus
3. **Dashboard** (`/dashboard`) - Menu utama dengan berbagai pilihan menu
4. **Pengisian KRS** (`/pengisian-krs`) - Halaman utama untuk memilih mata kuliah
5. **Status Validasi** (`/status-validasi`) - Halaman untuk melihat status validasi KRS

### Fitur Utama

#### 1. Pengisian KRS
- Daftar mata kuliah wajib dan pilihan terpisah
- Deteksi bentrok jadwal otomatis dengan warning yang jelas
- Deteksi kelas penuh dengan ikon peringatan mencolok
- Checkbox berubah menjadi ikon centang setelah dipilih
- Notifikasi real-time saat menambah/menghapus kelas
- Tombol simpan dan ajukan yang strategis dan mencolok
- Summary total SKS dan mata kuliah terpilih

#### 2. Status Validasi
- Dashboard status validasi (draft/pending/approved/rejected)
- Informasi lengkap dosen wali
- Ringkasan KRS terpilih
- Tabel detail mata kuliah yang dipilih
- Real-time status dengan ikon dan warna yang jelas

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
│   ├── components/       (untuk komponen reusable)
│   ├── data/
│   │   └── courses.js    (data mata kuliah wajib dan pilihan)
│   ├── pages/
│   │   ├── Loading.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── PengisianKRS.jsx
│   │   └── StatusValidasi.jsx
│   ├── styles/
│   │   ├── Loading.css
│   │   ├── Login.css
│   │   ├── Dashboard.css
│   │   ├── PengisianKRS.css
│   │   └── StatusValidasi.css
│   ├── utils/
│   │   └── scheduleHelper.js  (helper untuk deteksi bentrok)
│   ├── App.jsx          (routing utama)
│   ├── main.jsx
│   └── index.css        (global styles)
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

## Recent Changes
- 29 Oktober 2025: Initial setup aplikasi dengan semua fitur dasar
- Implementasi deteksi bentrok jadwal otomatis
- Perbaikan UI/UX sesuai requirement (status mencolok, tombol strategis, checkbox berubah, feedback)
