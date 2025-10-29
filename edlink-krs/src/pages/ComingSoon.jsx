import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/ComingSoon.css';

function ComingSoon({ title }) {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1>{title}</h1>
      </div>

      <div className="coming-soon-content">
        <Construction size={80} className="construction-icon" />
        <h2>Segera Hadir</h2>
        <p>Fitur ini sedang dalam pengembangan dan akan segera tersedia.</p>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default ComingSoon;
