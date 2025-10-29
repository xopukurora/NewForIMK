
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Award } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/KHS.css';

function KHS() {
  const navigate = useNavigate();

  const semesters = [
    {
      semester: 1,
      tahun: '2021/2022 Ganjil',
      ip: 3.75,
      sks: 21,
      courses: [
        { kode: 'IF101', nama: 'Pengantar Teknologi Informasi', sks: 3, nilai: 'A' },
        { kode: 'IF102', nama: 'Algoritma Pemrograman', sks: 3, nilai: 'A' },
        { kode: 'MAT101', nama: 'Kalkulus I', sks: 3, nilai: 'B+' },
        { kode: 'IF103', nama: 'Dasar-Dasar Pemrograman', sks: 4, nilai: 'A' },
      ]
    },
    {
      semester: 2,
      tahun: '2021/2022 Genap',
      ip: 3.68,
      sks: 20,
      courses: [
        { kode: 'IF104', nama: 'Struktur Data', sks: 3, nilai: 'A' },
        { kode: 'IF105', nama: 'Basis Data', sks: 3, nilai: 'B+' },
        { kode: 'MAT102', nama: 'Statistika', sks: 3, nilai: 'A-' },
        { kode: 'IF106', nama: 'Pemrograman Berorientasi Objek', sks: 3, nilai: 'A' },
      ]
    },
    {
      semester: 3,
      tahun: '2022/2023 Ganjil',
      ip: 3.82,
      sks: 21,
      courses: [
        { kode: 'IF201', nama: 'Desain dan Analisis Algoritma', sks: 3, nilai: 'A' },
        { kode: 'IF202', nama: 'Sistem Operasi', sks: 3, nilai: 'A' },
        { kode: 'IF203', nama: 'Jaringan Komputer', sks: 3, nilai: 'A-' },
        { kode: 'IF204', nama: 'Rekayasa Perangkat Lunak', sks: 3, nilai: 'A' },
      ]
    },
    {
      semester: 4,
      tahun: '2022/2023 Genap',
      ip: 3.71,
      sks: 20,
      courses: [
        { kode: 'IF205', nama: 'Pemrograman Web', sks: 3, nilai: 'A' },
        { kode: 'IF206', nama: 'Kecerdasan Buatan', sks: 3, nilai: 'B+' },
        { kode: 'IF207', nama: 'Keamanan Informasi', sks: 3, nilai: 'A-' },
        { kode: 'IF208', nama: 'Interaksi Manusia dan Komputer', sks: 3, nilai: 'A' },
      ]
    }
  ];

  const totalSKS = semesters.reduce((sum, sem) => sum + sem.sks, 0);
  const ipk = (semesters.reduce((sum, sem) => sum + (sem.ip * sem.sks), 0) / totalSKS).toFixed(2);

  const getNilaiColor = (nilai) => {
    if (nilai === 'A') return '#15bb21';
    if (nilai === 'A-' || nilai === 'B+') return '#7fc37e';
    if (nilai === 'B') return '#ffb81f';
    return '#ff6b6b';
  };

  return (
    <div className="khs-container">
      <div className="khs-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Kartu Hasil Studi</h1>
      </div>

      <div className="khs-summary">
        <div className="summary-card">
          <TrendingUp size={24} />
          <div>
            <span className="summary-label">IPK</span>
            <span className="summary-value">{ipk}</span>
          </div>
        </div>
        <div className="summary-card">
          <Award size={24} />
          <div>
            <span className="summary-label">Total SKS</span>
            <span className="summary-value">{totalSKS}</span>
          </div>
        </div>
      </div>

      <div className="khs-content">
        {semesters.map((semester) => (
          <div key={semester.semester} className="semester-card">
            <div className="semester-header">
              <div>
                <h3>Semester {semester.semester}</h3>
                <p>{semester.tahun}</p>
              </div>
              <div className="semester-stats">
                <span className="ip-badge">IP: {semester.ip}</span>
                <span className="sks-badge">{semester.sks} SKS</span>
              </div>
            </div>
            <div className="courses-list">
              {semester.courses.map((course, idx) => (
                <div key={idx} className="course-row">
                  <div className="course-info">
                    <span className="course-code">{course.kode}</span>
                    <span className="course-name">{course.nama}</span>
                    <span className="course-sks">{course.sks} SKS</span>
                  </div>
                  <span 
                    className="course-grade"
                    style={{ backgroundColor: getNilaiColor(course.nilai) }}
                  >
                    {course.nilai}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
}

export default KHS;
