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
  const username = localStorage.getItem('username') || 'Mahasiswa';

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const menuItems = [
    { title: 'Presensi QR', icon: QrCode, path: '/presensi', color: '#7fc37e' },
    { title: 'Kartu Mahasiswa', icon: CreditCard, path: '/kartu', color: '#ffb81f' },
    { title: 'Keuangan', icon: DollarSign, path: '/keuangan', color: '#15bb21' },
    { title: 'KRS', icon: BookOpen, path: '/pengisian-krs', color: '#15bb21' },
    { title: 'KHS', icon: FileText, path: '/khs', color: '#15bb21' },
    { title: 'Nilai', icon: Award, path: '/nilai', color: '#15bb21' },
    { title: 'Pengajuan Sesi', icon: Calendar, path: '/pengajuan-sesi', color: '#7fc37e' },
    { title: 'Kampanye Belajar', icon: Target, path: '/kampanye', color: '#ffb81f' },
    { title: 'Transkrip', icon: FileCheck, path: '/transkrip', color: '#222c6d' },
    { title: 'Konsultasi Dosen', icon: Users, path: '/konsultasi', color: '#7fc37e' },
    { title: 'Tugas Aktif', icon: ClipboardList, path: '/tugas', color: '#15bb21' },
    { title: 'Data Akademik', icon: FolderOpen, path: '/data-akademik', color: '#ffb81f' },
    { title: 'Akreditasi', icon: BadgeCheck, path: '/akreditasi', color: '#222c6d' },
    { title: 'Akreditasi Prodi', icon: GraduationCap, path: '/akreditasi-prodi', color: '#222c6d' }
  ];

  return (
    <div className="dashboard-mobile">
      <header className="dashboard-header">
        <div className="profile-section">
          <div className="profile-avatar">
            <span>{username.charAt(0).toUpperCase()}</span>
          </div>
          <div className="profile-info">
            <h2>{username.toUpperCase()}</h2>
            <p>Mahasiswa - Pendidikan Teknologi</p>
          </div>
        </div>
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
        <section className="academic-section">
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
        </section>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default Dashboard;
