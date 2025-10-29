import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import '../styles/Loading.css';

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="logo-wrapper">
          <GraduationCap size={80} className="logo-icon" />
        </div>
        <h1 className="app-title">EDLINK</h1>
        <p className="app-subtitle">Sistem Informasi Akademik</p>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p className="loading-text">Memuat aplikasi...</p>
      </div>
    </div>
  );
}

export default Loading;
