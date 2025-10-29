
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Award, TrendingUp } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/Transkrip.css';

function Transkrip() {
  const navigate = useNavigate();

  const transkrip = {
    mahasiswa: {
      nim: '2021010123',
      nama: 'MAHASISWA AKTIF',
      prodi: 'Pendidikan Teknologi Informasi',
      angkatan: '2021'
    },
    ipk: 3.74,
    totalSKS: 82,
    courses: [
      { kode: 'IF101', nama: 'Pengantar Teknologi Informasi', sks: 3, nilai: 'A', bobot: 4.0 },
      { kode: 'IF102', nama: 'Algoritma Pemrograman', sks: 3, nilai: 'A', bobot: 4.0 },
      { kode: 'MAT101', nama: 'Kalkulus I', sks: 3, nilai: 'B+', bobot: 3.5 },
      { kode: 'IF103', nama: 'Dasar-Dasar Pemrograman', sks: 4, nilai: 'A', bobot: 4.0 },
      { kode: 'IF104', nama: 'Struktur Data', sks: 3, nilai: 'A', bobot: 4.0 },
      { kode: 'IF105', nama: 'Basis Data', sks: 3, nilai: 'B+', bobot: 3.5 },
      { kode: 'MAT102', nama: 'Statistika', sks: 3, nilai: 'A-', bobot: 3.7 },
      { kode: 'IF106', nama: 'Pemrograman Berorientasi Objek', sks: 3, nilai: 'A', bobot: 4.0 },
      { kode: 'IF201', nama: 'Desain dan Analisis Algoritma', sks: 3, nilai: 'A', bobot: 4.0 },
      { kode: 'IF202', nama: 'Sistem Operasi', sks: 3, nilai: 'A', bobot: 4.0 },
      { kode: 'IF203', nama: 'Jaringan Komputer', sks: 3, nilai: 'A-', bobot: 3.7 },
      { kode: 'IF204', nama: 'Rekayasa Perangkat Lunak', sks: 3, nilai: 'A', bobot: 4.0 },
      { kode: 'IF205', nama: 'Pemrograman Web', sks: 3, nilai: 'A', bobot: 4.0 },
      { kode: 'IF206', nama: 'Kecerdasan Buatan', sks: 3, nilai: 'B+', bobot: 3.5 },
      { kode: 'IF207', nama: 'Keamanan Informasi', sks: 3, nilai: 'A-', bobot: 3.7 },
      { kode: 'IF208', nama: 'Interaksi Manusia dan Komputer', sks: 3, nilai: 'A', bobot: 4.0 },
    ]
  };

  return (
    <div className="transkrip-container">
      <div className="transkrip-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Transkrip Nilai</h1>
      </div>

      <div className="transkrip-summary">
        <div className="summary-card">
          <TrendingUp size={28} />
          <div>
            <span className="summary-label">IPK</span>
            <span className="summary-value">{transkrip.ipk}</span>
          </div>
        </div>
        <div className="summary-card">
          <Award size={28} />
          <div>
            <span className="summary-label">Total SKS</span>
            <span className="summary-value">{transkrip.totalSKS}</span>
          </div>
        </div>
      </div>

      <div className="student-info-card">
        <h3>Informasi Mahasiswa</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">NIM</span>
            <span className="info-value">{transkrip.mahasiswa.nim}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Nama</span>
            <span className="info-value">{transkrip.mahasiswa.nama}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Program Studi</span>
            <span className="info-value">{transkrip.mahasiswa.prodi}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Angkatan</span>
            <span className="info-value">{transkrip.mahasiswa.angkatan}</span>
          </div>
        </div>
      </div>

      <div className="transkrip-content">
        <div className="content-header">
          <h3>Daftar Mata Kuliah</h3>
          <button className="download-btn">
            <Download size={18} />
            <span>Unduh PDF</span>
          </button>
        </div>
        
        <div className="transkrip-table">
          <div className="table-header">
            <span className="col-kode">Kode</span>
            <span className="col-nama">Mata Kuliah</span>
            <span className="col-sks">SKS</span>
            <span className="col-nilai">Nilai</span>
          </div>
          {transkrip.courses.map((course, idx) => (
            <div key={idx} className="table-row">
              <span className="col-kode">{course.kode}</span>
              <span className="col-nama">{course.nama}</span>
              <span className="col-sks">{course.sks}</span>
              <span className="col-nilai">{course.nilai}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default Transkrip;
