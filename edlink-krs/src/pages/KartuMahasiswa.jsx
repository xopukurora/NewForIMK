
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Hash, MapPin, Phone, Mail, QrCode } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/KartuMahasiswa.css';

function KartuMahasiswa() {
  const navigate = useNavigate();

  return (
    <div className="kartu-container">
      <div className="kartu-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Kartu Mahasiswa</h1>
      </div>

      <div className="kartu-content">
        <div className="student-card">
          <div className="card-top">
            <div className="university-logo">
              <User size={40} />
            </div>
            <div className="university-name">
              <h2>UNIVERSITAS TEKNOLOGI</h2>
              <p>FAKULTAS TEKNIK INFORMATIKA</p>
            </div>
          </div>

          <div className="card-body">
            <div className="student-photo">
              <User size={80} />
            </div>
            <div className="student-details">
              <div className="detail-item">
                <Hash size={16} />
                <div>
                  <span className="detail-label">NIM</span>
                  <span className="detail-value">2021010123</span>
                </div>
              </div>
              <div className="detail-item">
                <User size={16} />
                <div>
                  <span className="detail-label">Nama</span>
                  <span className="detail-value">MAHASISWA AKTIF</span>
                </div>
              </div>
              <div className="detail-item">
                <MapPin size={16} />
                <div>
                  <span className="detail-label">Program Studi</span>
                  <span className="detail-value">Pendidikan Teknologi Informasi</span>
                </div>
              </div>
              <div className="detail-item">
                <Calendar size={16} />
                <div>
                  <span className="detail-label">Angkatan</span>
                  <span className="detail-value">2021</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card-qr">
            <div className="qr-placeholder">
              <QrCode size={100} />
            </div>
            <p className="qr-label">Scan untuk verifikasi</p>
          </div>
        </div>

        <div className="contact-info">
          <h3>Informasi Kontak</h3>
          <div className="contact-item">
            <Phone size={18} />
            <span>+62 812-3456-7890</span>
          </div>
          <div className="contact-item">
            <Mail size={18} />
            <span>mahasiswa@university.ac.id</span>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default KartuMahasiswa;
