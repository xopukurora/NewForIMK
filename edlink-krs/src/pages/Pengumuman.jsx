
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Calendar, AlertCircle, CheckCircle, Info, Pin } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/Pengumuman.css';

function Pengumuman() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const announcements = [
    {
      id: 1,
      title: 'Perpanjangan Masa Pengisian KRS',
      category: 'important',
      date: '28 Oktober 2024',
      time: '14:30',
      author: 'Biro Akademik',
      isPinned: true,
      content: 'Masa pengisian KRS diperpanjang hingga 5 November 2024. Mahasiswa diharapkan segera melakukan pengisian dan validasi KRS dengan dosen wali masing-masing.',
      tags: ['KRS', 'Akademik']
    },
    {
      id: 2,
      title: 'Jadwal UTS Semester Ganjil 2024/2025',
      category: 'exam',
      date: '27 Oktober 2024',
      time: '10:15',
      author: 'Fakultas Teknik Informatika',
      isPinned: true,
      content: 'Ujian Tengah Semester akan dilaksanakan pada tanggal 1-8 November 2024. Jadwal lengkap dapat diakses melalui portal akademik.',
      tags: ['UTS', 'Ujian', 'Akademik']
    },
    {
      id: 3,
      title: 'Beasiswa Prestasi Akademik 2024',
      category: 'info',
      date: '26 Oktober 2024',
      time: '09:00',
      author: 'Kemahasiswaan',
      isPinned: false,
      content: 'Pendaftaran beasiswa prestasi akademik semester ganjil 2024/2025 dibuka mulai 1 November 2024. Syarat IPK minimal 3.50.',
      tags: ['Beasiswa', 'Prestasi']
    },
    {
      id: 4,
      title: 'Workshop Machine Learning & AI',
      category: 'event',
      date: '25 Oktober 2024',
      time: '15:45',
      author: 'Himpunan Mahasiswa Informatika',
      isPinned: false,
      content: 'Workshop "Introduction to Machine Learning with Python" akan diadakan pada 10 November 2024 pukul 13.00-16.00 WIB di Lab Komputer 1.',
      tags: ['Workshop', 'AI', 'Ekstrakurikuler']
    },
    {
      id: 5,
      title: 'Pemeliharaan Sistem E-Learning',
      category: 'maintenance',
      date: '24 Oktober 2024',
      time: '16:20',
      author: 'IT Support',
      isPinned: false,
      content: 'Sistem e-learning akan mengalami maintenance pada 29 Oktober 2024 pukul 00.00-06.00 WIB. Mohon maaf atas ketidaknyamanannya.',
      tags: ['Maintenance', 'E-Learning']
    },
    {
      id: 6,
      title: 'Lomba Karya Tulis Ilmiah Nasional',
      category: 'event',
      date: '23 Oktober 2024',
      time: '11:30',
      author: 'BEM Universitas',
      isPinned: false,
      content: 'Pendaftaran Lomba Karya Tulis Ilmiah tingkat nasional dibuka hingga 15 November 2024. Total hadiah Rp 25.000.000.',
      tags: ['Lomba', 'LKTI', 'Nasional']
    }
  ];

  const categories = [
    { id: 'all', label: 'Semua', icon: Bell },
    { id: 'important', label: 'Penting', icon: AlertCircle },
    { id: 'exam', label: 'Ujian', icon: CheckCircle },
    { id: 'event', label: 'Event', icon: Calendar },
    { id: 'info', label: 'Info', icon: Info }
  ];

  const getCategoryColor = (category) => {
    switch(category) {
      case 'important': return '#ff6b6b';
      case 'exam': return '#ffb81f';
      case 'event': return '#15bb21';
      case 'maintenance': return '#8798a4';
      default: return '#222c6d';
    }
  };

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'important': return 'Penting';
      case 'exam': return 'Ujian';
      case 'event': return 'Event';
      case 'maintenance': return 'Maintenance';
      default: return 'Info';
    }
  };

  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(a => a.category === filter);

  return (
    <div className="pengumuman-container">
      <div className="pengumuman-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Pengumuman</h1>
      </div>

      <div className="filter-section">
        <div className="filter-chips">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className={`filter-chip ${filter === cat.id ? 'active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="announcements-list">
        {filteredAnnouncements.map(announcement => (
          <div key={announcement.id} className="announcement-card">
            {announcement.isPinned && (
              <div className="pinned-badge">
                <Pin size={14} />
                <span>Disematkan</span>
              </div>
            )}
            
            <div className="announcement-header">
              <div className="category-badge" style={{ backgroundColor: getCategoryColor(announcement.category) }}>
                {getCategoryLabel(announcement.category)}
              </div>
              <div className="announcement-meta">
                <span className="announcement-date">{announcement.date}</span>
                <span className="announcement-time">{announcement.time}</span>
              </div>
            </div>

            <h3 className="announcement-title">{announcement.title}</h3>
            
            <p className="announcement-content">{announcement.content}</p>

            <div className="announcement-footer">
              <div className="announcement-author">
                <Bell size={14} />
                <span>{announcement.author}</span>
              </div>
              <div className="announcement-tags">
                {announcement.tags.map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
}

export default Pengumuman;
