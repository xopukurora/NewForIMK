
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, BookOpen, Award, Settings, Bell, Lock, HelpCircle, LogOut, ChevronRight, Edit } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/Akun.css';

function Akun() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const profileData = {
    nim: '2021010123',
    nama: 'Mahasiswa Aktif',
    email: 'mahasiswa@university.ac.id',
    phone: '+62 812-3456-7890',
    alamat: 'Jl. Pendidikan No. 123, Jakarta Selatan',
    prodi: 'Pendidikan Teknologi Informasi',
    fakultas: 'Fakultas Teknik',
    angkatan: '2021',
    semester: 5,
    ipk: 3.74,
    totalSKS: 82,
    status: 'Aktif',
    dosenWali: 'Dr. Ahmad Fauzi, M.Kom'
  };

  const menuSections = [
    {
      title: 'Akun & Keamanan',
      items: [
        { icon: Settings, label: 'Pengaturan Akun', action: () => {} },
        { icon: Lock, label: 'Ubah Password', action: () => {} },
        { icon: Bell, label: 'Notifikasi', action: () => {} }
      ]
    },
    {
      title: 'Informasi',
      items: [
        { icon: HelpCircle, label: 'Bantuan & FAQ', action: () => {} },
        { icon: BookOpen, label: 'Panduan Aplikasi', action: () => {} }
      ]
    }
  ];

  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="akun-container">
      <div className="akun-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Profil Saya</h1>
      </div>

      <div className="profile-banner">
        <div className="profile-avatar">
          <User size={48} />
        </div>
        <div className="profile-info">
          <h2>{profileData.nama}</h2>
          <p className="nim">{profileData.nim}</p>
          <div className="status-badge active">
            <span className="status-dot"></span>
            {profileData.status}
          </div>
        </div>
        <button className="edit-profile-btn">
          <Edit size={18} />
        </button>
      </div>

      <div className="tabs-container">
        <button 
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profil
        </button>
        <button 
          className={`tab ${activeTab === 'academic' ? 'active' : ''}`}
          onClick={() => setActiveTab('academic')}
        >
          Akademik
        </button>
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Pengaturan
        </button>
      </div>

      {activeTab === 'profile' && (
        <div className="tab-content">
          <div className="info-section">
            <h3>Informasi Pribadi</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={18} />
                </div>
                <div className="info-details">
                  <label>Email</label>
                  <span>{profileData.email}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Phone size={18} />
                </div>
                <div className="info-details">
                  <label>No. Telepon</label>
                  <span>{profileData.phone}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={18} />
                </div>
                <div className="info-details">
                  <label>Alamat</label>
                  <span>{profileData.alamat}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academic' && (
        <div className="tab-content">
          <div className="info-section">
            <h3>Data Akademik</h3>
            <div className="academic-cards">
              <div className="academic-card">
                <div className="card-icon" style={{ backgroundColor: '#15bb21' }}>
                  <Award size={24} />
                </div>
                <div className="card-info">
                  <label>IPK</label>
                  <span className="card-value">{profileData.ipk}</span>
                </div>
              </div>
              <div className="academic-card">
                <div className="card-icon" style={{ backgroundColor: '#222c6d' }}>
                  <BookOpen size={24} />
                </div>
                <div className="card-info">
                  <label>Total SKS</label>
                  <span className="card-value">{profileData.totalSKS}</span>
                </div>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">
                  <BookOpen size={18} />
                </div>
                <div className="info-details">
                  <label>Program Studi</label>
                  <span>{profileData.prodi}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <BookOpen size={18} />
                </div>
                <div className="info-details">
                  <label>Fakultas</label>
                  <span>{profileData.fakultas}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Calendar size={18} />
                </div>
                <div className="info-details">
                  <label>Angkatan</label>
                  <span>{profileData.angkatan}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Calendar size={18} />
                </div>
                <div className="info-details">
                  <label>Semester</label>
                  <span>{profileData.semester}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <User size={18} />
                </div>
                <div className="info-details">
                  <label>Dosen Wali</label>
                  <span>{profileData.dosenWali}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="tab-content">
          {menuSections.map((section, index) => (
            <div key={index} className="menu-section">
              <h3>{section.title}</h3>
              <div className="menu-items">
                {section.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button key={idx} className="menu-item" onClick={item.action}>
                      <div className="menu-item-left">
                        <div className="menu-icon">
                          <Icon size={20} />
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight size={18} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}

export default Akun;
