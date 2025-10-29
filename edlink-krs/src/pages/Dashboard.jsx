import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  CheckSquare, 
  LogOut,
  User,
  GraduationCap
} from 'lucide-react';
import '../styles/Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

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
    {
      title: 'Pengisian KRS',
      description: 'Isi Kartu Rencana Studi semester ini',
      icon: <BookOpen size={40} />,
      path: '/pengisian-krs',
      color: 'blue'
    },
    {
      title: 'Jadwal Kuliah',
      description: 'Lihat jadwal kuliah Anda',
      icon: <Calendar size={40} />,
      path: '/jadwal',
      color: 'green'
    },
    {
      title: 'Transkrip Nilai',
      description: 'Lihat transkrip dan IPK',
      icon: <FileText size={40} />,
      path: '/transkrip',
      color: 'orange'
    },
    {
      title: 'Status Validasi',
      description: 'Cek status validasi KRS',
      icon: <CheckSquare size={40} />,
      path: '/status-validasi',
      color: 'purple'
    }
  ];

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <div className="navbar-brand">
          <GraduationCap size={32} />
          <span>EDLINK</span>
        </div>
        <div className="navbar-user">
          <User size={20} />
          <span>{localStorage.getItem('username')}</span>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={20} />
            Keluar
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Selamat Datang di EDLINK</h1>
          <p>Sistem Informasi Akademik Universitas</p>
        </div>

        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`menu-card menu-card-${item.color}`}
              onClick={() => navigate(item.path)}
            >
              <div className="menu-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
