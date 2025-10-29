import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './pages/Loading';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PengisianKRS from './pages/PengisianKRS';
import StatusValidasi from './pages/StatusValidasi';
import KartuMahasiswa from './pages/KartuMahasiswa';
import KHS from './pages/KHS';
import Nilai from './pages/Nilai';
import Transkrip from './pages/Transkrip';
import Kalender from './pages/Kalender';
import Pengumuman from './pages/Pengumuman';
import Akun from './pages/Akun';
import ComingSoon from './pages/ComingSoon';
import './index.css';

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
        <Route path="/kartu-mahasiswa" element={<KartuMahasiswa />} />
        <Route path="/khs" element={<KHS />} />
        <Route path="/nilai" element={<Nilai />} />
        <Route path="/transkrip" element={<Transkrip />} />
        <Route path="/kalender" element={<Kalender />} />
        <Route path="/pengumuman" element={<Pengumuman />} />
        <Route path="/akun" element={<Akun />} />


        {/* Coming Soon Pages */}
        <Route path="/jelajah" element={<ComingSoon title="Jelajah" />} />
        <Route path="/ruang-kelas" element={<ComingSoon title="Ruang Kelas" />} />
        <Route path="/obrolan" element={<ComingSoon title="Obrolan" />} />
        {/* The original /akun route has been removed as it's now a dedicated page */}


        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;