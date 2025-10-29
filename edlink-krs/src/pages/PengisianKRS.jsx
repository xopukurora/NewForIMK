
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  AlertTriangle,
  Users,
  CheckCircle2,
  Save,
  XCircle,
  Info,
  Search,
  Filter,
  Trash2
} from 'lucide-react';
import { semester1, semester2, semester3, semester4, mataKuliahWajib, mataKuliahPilihan, semester6 } from '../data/courses';
import { checkConflict, isClassFull, getTotalSKS } from '../utils/scheduleHelper';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/PengisianKRS.css';

function PengisianKRS() {
  const navigate = useNavigate();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState('pilih'); // 'pilih' or 'tersimpan'
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isAutoSelecting, setIsAutoSelecting] = useState(false);

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
    showNotification('Kelas berhasil ditambahkan!', 'success');
  };

  const handleRemoveCourse = (courseId, kelasId) => {
    const newSelected = selectedCourses.filter(
      (selected) => !(selected.courseId === courseId && selected.kelasId === kelasId)
    );
    setSelectedCourses(newSelected);
    showNotification('Mata kuliah dihapus dari KRS', 'info');
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

  const handleAutoSelect = () => {
    setIsAutoSelecting(true);
    
    // Filter mata kuliah semester 5
    const semester5Courses = [...mataKuliahWajib, ...mataKuliahPilihan].filter(
      course => course.semester === 5
    );
    
    let newSelections = [...selectedCourses];
    let successCount = 0;
    let failedCourses = [];
    
    semester5Courses.forEach(course => {
      // Cek apakah mata kuliah sudah dipilih
      const alreadySelected = newSelections.find(s => s.courseId === course.id);
      if (alreadySelected) return;
      
      // Cari kelas yang tersedia (tidak penuh dan tidak bentrok)
      let selectedClass = null;
      
      for (const kelas of course.kelas) {
        const isFull = isClassFull(kelas);
        const hasConflict = checkConflict(newSelections, kelas);
        
        if (!isFull && !hasConflict) {
          selectedClass = kelas;
          break;
        }
      }
      
      if (selectedClass) {
        newSelections.push({
          courseId: course.id,
          kelasId: selectedClass.id,
          courseName: course.nama,
          courseCode: course.kode,
          sks: course.sks,
          dosen: course.dosen,
          ...selectedClass
        });
        successCount++;
      } else {
        failedCourses.push(course.nama);
      }
    });
    
    setSelectedCourses(newSelections);
    setIsAutoSelecting(false);
    
    if (successCount > 0) {
      let message = `Berhasil memilih ${successCount} mata kuliah semester 5 secara otomatis!`;
      if (failedCourses.length > 0) {
        message += ` ${failedCourses.length} mata kuliah tidak dapat dipilih (penuh/bentrok).`;
      }
      showNotification(message, 'success');
    } else {
      showNotification('Tidak ada mata kuliah semester 5 yang dapat dipilih otomatis.', 'error');
    }
  };

  const isSelected = (courseId, kelasId) => {
    return selectedCourses.some(
      (selected) => selected.courseId === courseId && selected.kelasId === kelasId
    );
  };

  const allCourses = [...semester1, ...semester2, ...semester3, ...semester4, ...mataKuliahWajib, ...mataKuliahPilihan, ...semester6];
  const filteredCourses = allCourses.filter(course =>
    course.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.kode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group courses by semester
  const groupedCourses = filteredCourses.reduce((acc, course) => {
    const sem = course.semester;
    if (!acc[sem]) {
      acc[sem] = [];
    }
    acc[sem].push(course);
    return acc;
  }, {});

  const totalSKS = getTotalSKS(selectedCourses);
  const maxSKS = 24;
  const remainingSKS = maxSKS - totalSKS;

  const renderCourseCard = (course) => {
    const selectedClass = selectedCourses.find(
      (selected) => selected.courseId === course.id
    );

    return (
      <div key={course.id} className="krs-course-card">
        <div className="krs-course-header">
          <div className="krs-course-title">
            <h3>{course.nama}</h3>
            <p className="krs-course-code">{course.kode} • {course.sks} SKS • Semester {course.semester}</p>
            <p className="krs-course-dosen">Dosen: {course.dosen}</p>
          </div>
        </div>

        <div className="krs-class-options">
          {course.kelas.map((kelas) => {
            const isFull = isClassFull(kelas);
            const hasConflict = checkConflict(selectedCourses, kelas);
            const isThisSelected = isSelected(course.id, kelas.id);
            const cannotSelect = (isFull || hasConflict) && !isThisSelected;

            return (
              <div
                key={kelas.id}
                className={`krs-class-option ${isThisSelected ? 'krs-selected' : ''} ${cannotSelect ? 'krs-disabled' : ''}`}
                onClick={() => !cannotSelect && handleSelectClass(course, kelas)}
              >
                <div className="krs-class-main">
                  <div className="krs-checkbox-wrapper">
                    {isThisSelected ? (
                      <CheckCircle2 size={24} className="krs-check-icon" />
                    ) : (
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => {}}
                        disabled={cannotSelect}
                        className="krs-checkbox"
                      />
                    )}
                  </div>
                  
                  <div className="krs-class-info">
                    <div className="krs-class-name">
                      UNIT {kelas.id} • {kelas.hari} {kelas.waktu}
                    </div>
                    <div className="krs-class-meta">
                      Ruang {kelas.ruang} • Mahasiswa: {kelas.terisi}/{kelas.kapasitas}
                    </div>
                  </div>
                </div>

                <div className="krs-class-badges">
                  {isFull && (
                    <span className="krs-badge krs-badge-full">Kelas penuh ({kelas.terisi}/{kelas.kapasitas})</span>
                  )}
                  {hasConflict && !isThisSelected && (
                    <span className="krs-badge krs-badge-conflict">Jadwal bentrok</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSavedCourses = () => {
    if (selectedCourses.length === 0) {
      return (
        <div className="krs-empty-state">
          <Info size={48} />
          <h3>Belum ada KRS tersimpan</h3>
          <p>Pilih mata kuliah dari tab "PILIH KELAS"</p>
        </div>
      );
    }

    return (
      <div className="krs-saved-list">
        {selectedCourses.map((course) => (
          <div key={`${course.courseId}-${course.kelasId}`} className="krs-saved-item">
            <div className="krs-saved-content">
              <h3>{course.courseName}</h3>
              <p className="krs-saved-code">{course.courseCode} • {course.sks} SKS</p>
              <p className="krs-saved-dosen">Dosen: {course.dosen}</p>
              <p className="krs-saved-schedule">
                UNIT {course.kelasId} • {course.hari}, {course.waktu}
              </p>
            </div>
            <button
              className="krs-remove-btn"
              onClick={() => handleRemoveCourse(course.courseId, course.kelasId)}
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
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
        </button>
        <h1>Kartu Rencana Studi</h1>
      </div>

      <div className="krs-info-bar">
        <div className="krs-info-item">
          <span className="krs-info-label">Semester</span>
          <span className="krs-info-value">5</span>
        </div>
        <div className="krs-info-item">
          <span className="krs-info-label">Batas SKS</span>
          <span className="krs-info-value">{maxSKS}</span>
        </div>
        <div className="krs-info-item">
          <span className="krs-info-label">Periode Akademik</span>
          <span className="krs-info-value">2025 Ganjil</span>
        </div>
      </div>

      <div className="krs-tabs">
        <button
          className={`krs-tab ${activeTab === 'pilih' ? 'krs-tab-active' : ''}`}
          onClick={() => setActiveTab('pilih')}
        >
          PILIH KELAS
        </button>
        <button
          className={`krs-tab ${activeTab === 'tersimpan' ? 'krs-tab-active' : ''}`}
          onClick={() => setActiveTab('tersimpan')}
        >
          KRS TERSIMPAN
          <span className="krs-tab-badge">{totalSKS} SKS</span>
        </button>
      </div>

      {activeTab === 'pilih' && (
        <>
          <div className="krs-search-bar">
            <div className="krs-search-input">
              <Search size={20} />
              <input
                type="text"
                placeholder="Cari mata kuliah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="krs-auto-select-btn" 
              onClick={handleAutoSelect}
              disabled={isAutoSelecting}
            >
              <CheckCircle2 size={18} />
              <span>{isAutoSelecting ? 'Memilih...' : 'Pilih Otomatis'}</span>
            </button>
            <button className="krs-filter-btn" onClick={() => setShowFilter(!showFilter)}>
              <Filter size={20} />
            </button>
          </div>

          <div className="krs-courses-content">
            {Object.keys(groupedCourses).sort((a, b) => a - b).map((semester) => (
              <div key={semester} className="krs-semester-group">
                <h2 className="krs-semester-title">Semester {semester}</h2>
                {groupedCourses[semester].map((course) => renderCourseCard(course))}
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'tersimpan' && (
        <div className="krs-saved-content">
          {renderSavedCourses()}
        </div>
      )}

      <div className="krs-bottom-bar">
        <div className="krs-bottom-info">
          <div className="krs-sks-info">
            <span className="krs-sks-label">{selectedCourses.length} Terpilih, {selectedCourses.length > 0 ? selectedCourses.length : 0} Tersimpan</span>
            <span className="krs-sks-value">Tersisa {remainingSKS} SKS dari {maxSKS} SKS</span>
          </div>
        </div>
        <button 
          className="krs-submit-btn" 
          onClick={handleSubmit}
          disabled={selectedCourses.length === 0}
        >
          Simpan
        </button>
      </div>

      <BottomNavigation />
    </div>
  );
}

export default PengisianKRS;
