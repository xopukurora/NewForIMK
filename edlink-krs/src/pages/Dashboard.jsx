import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { 
  BookOpen,
  FileText,
  DollarSign,
  Calendar,
  GraduationCap,
  Award,
  Users,
  Bell,
  FileCheck,
  UserCheck,
  ClipboardList,
  FolderOpen,
  BadgeCheck,
  Target,
  QrCode,
  CreditCard,
  LogOut
} from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const username = 'Mahasiswa';

  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  const menuItems = [
    { title: 'Kartu Mahasiswa', icon: CreditCard, path: '/kartu-mahasiswa', color: '#ffb81f' },
    { title: 'KRS', icon: BookOpen, path: '/status-validasi', color: '#15bb21' },
    { title: 'Pengisian KRS', icon: FileText, path: '/pengisian-krs', color: '#15bb21' },
    { title: 'KHS', icon: FileCheck, path: '/khs', color: '#7fc37e' },
    { title: 'Nilai', icon: Award, path: '/nilai', color: '#222c6d' },
    { title: 'Transkrip', icon: GraduationCap, path: '/transkrip', color: '#222c6d' }
  ];

  return (
    <div className="dashboard-mobile">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          <button className="icon-button">
            <Bell size={20} />
          </button>
          <button className="icon-button" onClick={handleLogout}>
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="student-info-card">
          <div className="profile-avatar">
            <span>{username.charAt(0).toUpperCase()}</span>
          </div>
          <div className="profile-info">
            <h2>{username.toUpperCase()}</h2>
            <p>Mahasiswa - Pendidikan Teknologi Informasi</p>
            <div className="student-details">
              <div className="detail-item">
                <span className="detail-label">NIM</span>
                <span className="detail-value">2021010123</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Semester</span>
                <span className="detail-value">5</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">IPK</span>
                <span className="detail-value">3.75</span>
              </div>
            </div>
          </div>
        </div>

        <section className="academic-section">
          <div className="academic-card">
            <h3 className="section-title">MyAcademic</h3>
            <div className="menu-grid">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="menu-item"
                    onClick={() => navigate(item.path)}
                  >
                    <div className="menu-icon" style={{ backgroundColor: item.color }}>
                      <Icon size={24} color="white" />
                    </div>
                    <span className="menu-title">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default Dashboard;
