import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, BookOpen, MessageCircle, User } from 'lucide-react';
import '../styles/BottomNavigation.css';

function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home, path: '/dashboard' },
    { id: 'explore', label: 'Jelajah', icon: Compass, path: '/jelajah' },
    { id: 'class', label: 'Ruang Kelas', icon: BookOpen, path: '/ruang-kelas' },
    { id: 'chat', label: 'Obrolan', icon: MessageCircle, path: '/obrolan' },
    { id: 'account', label: 'Akun', icon: User, path: '/akun' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bottom-navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        
        return (
          <button
            key={item.id}
            className={`nav-item ${active ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <Icon size={24} className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNavigation;
