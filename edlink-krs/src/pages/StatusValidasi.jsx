import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  User,
  BookOpen
} from 'lucide-react';
import '../styles/StatusValidasi.css';

function StatusValidasi() {
  const navigate = useNavigate();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [status, setStatus] = useState('draft');
  const [submittedAt, setSubmittedAt] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }

    const saved = localStorage.getItem('selectedKRS');
    const krsStatus = localStorage.getItem('krsStatus');
    const krsSubmittedAt = localStorage.getItem('krsSubmittedAt');

    if (saved) {
      setSelectedCourses(JSON.parse(saved));
    }
    if (krsStatus) {
      setStatus(krsStatus);
    }
    if (krsSubmittedAt) {
      setSubmittedAt(new Date(krsSubmittedAt));
    }
  }, [navigate]);

  const getStatusInfo = () => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock size={48} />,
          title: 'Menunggu Validasi',
          description: 'KRS Anda sedang menunggu validasi dari Dosen Wali',
          color: 'warning',
          message: 'Harap tunggu, Dosen Wali akan segera memvalidasi KRS Anda.'
        };
      case 'approved':
        return {
          icon: <CheckCircle2 size={48} />,
          title: 'KRS Disetujui',
          description: 'KRS Anda telah disetujui oleh Dosen Wali',
          color: 'success',
          message: 'Selamat! KRS Anda telah disetujui. Anda dapat mengikuti perkuliahan sesuai jadwal.'
        };
      case 'rejected':
        return {
          icon: <XCircle size={48} />,
          title: 'KRS Ditolak',
          description: 'KRS Anda ditolak oleh Dosen Wali',
          color: 'error',
          message: 'Mohon hubungi Dosen Wali untuk informasi lebih lanjut dan perbaikan KRS.'
        };
      default:
        return {
          icon: <AlertCircle size={48} />,
          title: 'Belum Diajukan',
          description: 'KRS belum diajukan untuk validasi',
          color: 'info',
          message: 'Silakan lengkapi dan ajukan KRS Anda untuk mendapat validasi.'
        };
    }
  };

  const statusInfo = getStatusInfo();
  const totalSKS = selectedCourses.reduce((total, course) => total + course.sks, 0);

  const simulateApproval = () => {
    localStorage.setItem('krsStatus', 'approved');
    setStatus('approved');
  };

  return (
    <div className="status-validasi-container">
      <div className="status-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
          Kembali
        </button>
        <h1>Status Validasi KRS</h1>
      </div>

      <div className={`status-banner status-${statusInfo.color}`}>
        <div className="status-icon">{statusInfo.icon}</div>
        <div className="status-content">
          <h2>{statusInfo.title}</h2>
          <p>{statusInfo.description}</p>
          {submittedAt && (
            <div className="submitted-info">
              <Calendar size={16} />
              <span>
                Diajukan pada: {submittedAt.toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="status-message">
        <AlertCircle size={20} />
        <p>{statusInfo.message}</p>
      </div>

      <div className="krs-summary-section">
        <h2>Ringkasan KRS</h2>
        <div className="summary-grid">
          <div className="summary-item">
            <BookOpen size={24} />
            <div>
              <div className="summary-label">Total Mata Kuliah</div>
              <div className="summary-value">{selectedCourses.length}</div>
            </div>
          </div>
          <div className="summary-item">
            <BookOpen size={24} />
            <div>
              <div className="summary-label">Total SKS</div>
              <div className="summary-value">{totalSKS}</div>
            </div>
          </div>
        </div>
      </div>

      {selectedCourses.length > 0 && (
        <div className="selected-courses-section">
          <h2>Daftar Mata Kuliah Terpilih</h2>
          <div className="courses-table">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode</th>
                  <th>Mata Kuliah</th>
                  <th>Kelas</th>
                  <th>SKS</th>
                  <th>Jadwal</th>
                  <th>Ruang</th>
                  <th>Dosen</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourses.map((course, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{course.courseCode}</td>
                    <td>{course.courseName}</td>
                    <td>{course.kelasId}</td>
                    <td>{course.sks}</td>
                    <td>{course.hari}, {course.waktu}</td>
                    <td>{course.ruang}</td>
                    <td>{course.dosen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="dosen-wali-info">
        <h3>Informasi Dosen Wali</h3>
        <div className="dosen-card">
          <User size={32} />
          <div>
            <div className="dosen-name">Dr. Bambang Sutejo, M.Kom</div>
            <div className="dosen-contact">Email: bambang.sutejo@university.ac.id</div>
            <div className="dosen-contact">Ruang: Gedung A, Lantai 3, Ruang 301</div>
          </div>
        </div>
      </div>

      {status === 'pending' && (
        <div className="demo-section">
          <button className="demo-button" onClick={simulateApproval}>
            [DEMO] Simulasi Persetujuan Dosen
          </button>
        </div>
      )}

      {selectedCourses.length === 0 && (
        <div className="empty-state">
          <AlertCircle size={48} />
          <h3>Belum Ada KRS Terpilih</h3>
          <p>Silakan kembali ke halaman Pengisian KRS untuk memilih mata kuliah</p>
          <button
            className="goto-krs-button"
            onClick={() => navigate('/pengisian-krs')}
          >
            Ke Pengisian KRS
          </button>
        </div>
      )}
    </div>
  );
}

export default StatusValidasi;
