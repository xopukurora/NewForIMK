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
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pengisian-krs" element={<PengisianKRS />} />
        <Route path="/status-validasi" element={<StatusValidasi />} />
        <Route path="/jelajah" element={<ComingSoon title="Jelajah" />} />
        <Route path="/ruang-kelas" element={<ComingSoon title="Ruang Kelas" />} />
        <Route path="/obrolan" element={<ComingSoon title="Obrolan" />} />
        <Route path="/akun" element={<ComingSoon title="Akun" />} />
        <Route path="/presensi" element={<ComingSoon title="Presensi QR" />} />
        <Route path="/kartu" element={<ComingSoon title="Kartu Mahasiswa" />} />
        <Route path="/keuangan" element={<ComingSoon title="Keuangan" />} />
        <Route path="/khs" element={<ComingSoon title="KHS" />} />
        <Route path="/nilai" element={<ComingSoon title="Nilai" />} />
        <Route path="/pengajuan-sesi" element={<ComingSoon title="Pengajuan Sesi" />} />
        <Route path="/kampanye" element={<ComingSoon title="Kampanye Belajar" />} />
        <Route path="/transkrip" element={<ComingSoon title="Transkrip" />} />
        <Route path="/konsultasi" element={<ComingSoon title="Konsultasi Dosen" />} />
        <Route path="/tugas" element={<ComingSoon title="Tugas Aktif" />} />
        <Route path="/data-akademik" element={<ComingSoon title="Data Akademik" />} />
        <Route path="/akreditasi" element={<ComingSoon title="Akreditasi" />} />
        <Route path="/akreditasi-prodi" element={<ComingSoon title="Akreditasi Prodi" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
