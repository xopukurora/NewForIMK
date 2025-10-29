
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './pages/Loading';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PengisianKRS from './pages/PengisianKRS';
import StatusValidasi from './pages/StatusValidasi';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes - Dashboard & Features */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pengisian-krs" element={<PengisianKRS />} />
        <Route path="/status-validasi" element={<StatusValidasi />} />
        
        {/* Coming Soon Pages */}
        <Route path="/jelajah" element={<ComingSoon title="Jelajah" />} />
        <Route path="/ruang-kelas" element={<ComingSoon title="Ruang Kelas" />} />
        <Route path="/obrolan" element={<ComingSoon title="Obrolan" />} />
        <Route path="/akun" element={<ComingSoon title="Akun" />} />
        <Route path="/kartu" element={<ComingSoon title="Kartu Mahasiswa" />} />
        <Route path="/khs" element={<ComingSoon title="KHS" />} />
        <Route path="/nilai" element={<ComingSoon title="Nilai" />} />
        <Route path="/transkrip" element={<ComingSoon title="Transkrip" />} />
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
