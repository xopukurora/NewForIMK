
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Download } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/Nilai.css';

function Nilai() {
  const navigate = useNavigate();

  const currentSemester = {
    semester: 5,
    tahun: '2023/2024 Ganjil',
    courses: [
      {
        kode: 'IF301',
        nama: 'Pemrograman Web',
        dosen: 'Dr. Ahmad Fauzi, M.Kom',
        nilai: {
          tugas: 85,
          uts: 88,
          uas: 90,
          akhir: 88,
          huruf: 'A'
        }
      },
      {
        kode: 'IF302',
        nama: 'Basis Data',
        dosen: 'Prof. Siti Nurhaliza, M.T',
        nilai: {
          tugas: 80,
          uts: 85,
          uas: 87,
          akhir: 84,
          huruf: 'A'
        }
      },
      {
        kode: 'IF303',
        nama: 'Sistem Operasi',
        dosen: 'Budi Santoso, S.Kom, M.Sc',
        nilai: {
          tugas: 90,
          uts: 92,
          uas: 91,
          akhir: 91,
          huruf: 'A'
        }
      },
      {
        kode: 'IF304',
        nama: 'Jaringan Komputer',
        dosen: 'Rina Wati, M.Kom',
        nilai: {
          tugas: 78,
          uts: 82,
          uas: 80,
          akhir: 80,
          huruf: 'A-'
        }
      }
    ]
  };

  const getNilaiColor = (nilai) => {
    if (nilai >= 85) return '#15bb21';
    if (nilai >= 70) return '#7fc37e';
    if (nilai >= 60) return '#ffb81f';
    return '#ff6b6b';
  };

  return (
    <div className="nilai-container">
      <div className="nilai-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Nilai Mahasiswa</h1>
      </div>

      <div className="nilai-info-bar">
        <div className="semester-info">
          <BookOpen size={20} />
          <div>
            <span className="info-label">Semester {currentSemester.semester}</span>
            <span className="info-value">{currentSemester.tahun}</span>
          </div>
        </div>
        <button className="download-btn">
          <Download size={18} />
          <span>Unduh</span>
        </button>
      </div>

      <div className="nilai-content">
        {currentSemester.courses.map((course, idx) => (
          <div key={idx} className="nilai-card">
            <div className="nilai-card-header">
              <div>
                <h3>{course.nama}</h3>
                <p className="course-code">{course.kode}</p>
                <p className="course-lecturer">{course.dosen}</p>
              </div>
              <div className="nilai-akhir">
                <span className="nilai-huruf" style={{ backgroundColor: getNilaiColor(course.nilai.akhir) }}>
                  {course.nilai.huruf}
                </span>
                <span className="nilai-angka">{course.nilai.akhir}</span>
              </div>
            </div>
            <div className="nilai-breakdown">
              <div className="breakdown-item">
                <span className="breakdown-label">Tugas</span>
                <span className="breakdown-value">{course.nilai.tugas}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">UTS</span>
                <span className="breakdown-value">{course.nilai.uts}</span>
              </div>
              <div className="breakdown-item">
                <span className="breakdown-label">UAS</span>
                <span className="breakdown-value">{course.nilai.uas}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
}

export default Nilai;
