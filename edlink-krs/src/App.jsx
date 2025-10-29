import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './pages/Loading';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PengisianKRS from './pages/PengisianKRS';
import StatusValidasi from './pages/StatusValidasi';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pengisian-krs" element={<PengisianKRS />} />
        <Route path="/status-validasi" element={<StatusValidasi />} />
        <Route path="/jadwal" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Halaman Jadwal (Coming Soon)</h2></div>} />
        <Route path="/transkrip" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Halaman Transkrip (Coming Soon)</h2></div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
