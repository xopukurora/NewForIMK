import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  AlertTriangle,
  Users,
  CheckCircle2,
  Save,
  XCircle,
  Info
} from 'lucide-react';
import { mataKuliahWajib, mataKuliahPilihan } from '../data/courses';
import { checkConflict, isClassFull, getTotalSKS } from '../utils/scheduleHelper';
import '../styles/PengisianKRS.css';

function PengisianKRS() {
  const navigate = useNavigate();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }

    const saved = localStorage.getItem('selectedKRS');
    if (saved) {
      setSelectedCourses(JSON.parse(saved));
    }
  }, [navigate]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSelectClass = (course, kelas) => {
    const isAlreadySelected = selectedCourses.some(
      (selected) => selected.courseId === course.id && selected.kelasId === kelas.id
    );

    if (isAlreadySelected) {
      const newSelected = selectedCourses.filter(
        (selected) => !(selected.courseId === course.id && selected.kelasId === kelas.id)
      );
      setSelectedCourses(newSelected);
      showNotification('Kelas berhasil dihapus dari KRS', 'info');
      return;
    }

    const alreadyTakenCourse = selectedCourses.find(
      (selected) => selected.courseId === course.id
    );
    if (alreadyTakenCourse) {
      const newSelected = selectedCourses.filter(
        (selected) => selected.courseId !== course.id
      );
      setSelectedCourses([
        ...newSelected,
        {
          courseId: course.id,
          kelasId: kelas.id,
          courseName: course.nama,
          courseCode: course.kode,
          sks: course.sks,
          dosen: course.dosen,
          ...kelas
        }
      ]);
      showNotification('Kelas berhasil diubah!', 'success');
      return;
    }

    if (isClassFull(kelas)) {
      showNotification('Kelas penuh! Tidak dapat memilih kelas ini.', 'error');
      return;
    }

    if (checkConflict(selectedCourses, kelas)) {
      showNotification('Jadwal bentrok dengan kelas lain!', 'error');
      return;
    }

    setSelectedCourses([
      ...selectedCourses,
      {
        courseId: course.id,
        kelasId: kelas.id,
        courseName: course.nama,
        courseCode: course.kode,
        sks: course.sks,
        dosen: course.dosen,
        ...kelas
      }
    ]);
    showNotification('Kelas berhasil ditambahkan ke KRS tersimpan!', 'success');
  };

  const handleSave = () => {
    localStorage.setItem('selectedKRS', JSON.stringify(selectedCourses));
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleSubmit = () => {
    localStorage.setItem('selectedKRS', JSON.stringify(selectedCourses));
    localStorage.setItem('krsStatus', 'pending');
    localStorage.setItem('krsSubmittedAt', new Date().toISOString());
    navigate('/status-validasi');
  };

  const isSelected = (courseId, kelasId) => {
    return selectedCourses.some(
      (selected) => selected.courseId === courseId && selected.kelasId === kelasId
    );
  };

  const renderCourseCard = (course, isMandatory) => {
    const selectedClass = selectedCourses.find(
      (selected) => selected.courseId === course.id
    );

    return (
      <div key={course.id} className="course-card">
        <div className="course-header">
          <div>
            <h3>{course.nama}</h3>
            <p className="course-code">{course.kode} - {course.sks} SKS</p>
            <p className="course-lecturer">{course.dosen}</p>
          </div>
          {isMandatory && <span className="badge-wajib">WAJIB</span>}
        </div>

        <div className="class-list">
          {course.kelas.map((kelas) => {
            const isFull = isClassFull(kelas);
            const hasConflict = checkConflict(selectedCourses, kelas);
            const isThisSelected = isSelected(course.id, kelas.id);
            const cannotSelect = (isFull || hasConflict) && !isThisSelected;

            return (
              <div
                key={kelas.id}
                className={`class-item ${isThisSelected ? 'selected' : ''} ${cannotSelect ? 'disabled' : ''}`}
              >
                <div className="class-info">
                  <div className="class-checkbox">
                    {isThisSelected ? (
                      <CheckCircle2 size={24} className="check-icon" />
                    ) : (
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => handleSelectClass(course, kelas)}
                        disabled={cannotSelect}
                      />
                    )}
                  </div>
                  <div className="class-details">
                    <div className="class-name">Kelas {kelas.id}</div>
                    <div className="class-schedule">
                      {kelas.hari}, {kelas.waktu}
                    </div>
                    <div className="class-room">Ruang: {kelas.ruang}</div>
                  </div>
                </div>

                <div className="class-status">
                  <div className="capacity-info">
                    <Users size={16} />
                    <span>{kelas.terisi}/{kelas.kapasitas}</span>
                  </div>

                  {isFull && (
                    <div className="status-badge status-full">
                      <XCircle size={18} />
                      <span>Kelas Penuh</span>
                    </div>
                  )}

                  {hasConflict && !isThisSelected && (
                    <div className="status-badge status-conflict">
                      <AlertTriangle size={18} />
                      <span>Jadwal Bentrok</span>
                    </div>
                  )}
                </div>

                {!isThisSelected && !cannotSelect && (
                  <button
                    className="select-button"
                    onClick={() => handleSelectClass(course, kelas)}
                  >
                    Pilih
                  </button>
                )}

                {isThisSelected && (
                  <button
                    className="deselect-button"
                    onClick={() => handleSelectClass(course, kelas)}
                  >
                    Batalkan
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="pengisian-krs-container">
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.type === 'success' && <CheckCircle2 size={20} />}
          {notification.type === 'error' && <XCircle size={20} />}
          {notification.type === 'info' && <Info size={20} />}
          <span>{notification.message}</span>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-modal">
          <CheckCircle2 size={48} />
          <h3>KRS Berhasil Disimpan!</h3>
          <p>Data KRS Anda telah tersimpan</p>
        </div>
      )}

      <div className="krs-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
          Kembali
        </button>
        <h1>Pengisian Kartu Rencana Studi (KRS)</h1>
      </div>

      <div className="krs-summary">
        <div className="summary-card">
          <h3>Total SKS Terpilih</h3>
          <div className="summary-value">{getTotalSKS(selectedCourses)}</div>
        </div>
        <div className="summary-card">
          <h3>Mata Kuliah Terpilih</h3>
          <div className="summary-value">{selectedCourses.length}</div>
        </div>
        <div className="summary-card">
          <h3>Batas SKS</h3>
          <div className="summary-value">24 SKS</div>
        </div>
      </div>

      <div className="krs-content">
        <section className="course-section">
          <div className="section-header">
            <h2>Mata Kuliah Wajib</h2>
            <span className="badge-count">{mataKuliahWajib.length} mata kuliah</span>
          </div>
          <div className="course-list">
            {mataKuliahWajib.map((course) => renderCourseCard(course, true))}
          </div>
        </section>

        <section className="course-section">
          <div className="section-header">
            <h2>Mata Kuliah Pilihan</h2>
            <span className="badge-count">{mataKuliahPilihan.length} mata kuliah</span>
          </div>
          <div className="course-list">
            {mataKuliahPilihan.map((course) => renderCourseCard(course, false))}
          </div>
        </section>
      </div>

      <div className="krs-actions">
        <button className="save-button" onClick={handleSave}>
          <Save size={20} />
          Simpan Draft
        </button>
        <button 
          className="submit-button" 
          onClick={handleSubmit}
          disabled={selectedCourses.length === 0}
        >
          <CheckCircle2 size={20} />
          Ajukan KRS untuk Validasi
        </button>
      </div>
    </div>
  );
}

export default PengisianKRS;
