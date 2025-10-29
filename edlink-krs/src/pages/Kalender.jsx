
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, BookOpen } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/Kalender.css';

function Kalender() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const events = [
    {
      id: 1,
      date: new Date(2024, 9, 30),
      title: 'Kuliah Pemrograman Web',
      time: '08:00 - 10:30',
      location: 'Lab 1',
      type: 'lecture',
      lecturer: 'Dr. Ahmad Fauzi, M.Kom'
    },
    {
      id: 2,
      date: new Date(2024, 9, 30),
      title: 'Basis Data',
      time: '10:30 - 13:00',
      location: 'R201',
      type: 'lecture',
      lecturer: 'Prof. Siti Nurhaliza, M.T'
    },
    {
      id: 3,
      date: new Date(2024, 9, 31),
      title: 'Pengumpulan Tugas RPL',
      time: '23:59',
      location: 'E-Learning',
      type: 'assignment',
      lecturer: 'Budi Santoso, S.Kom, M.Sc'
    },
    {
      id: 4,
      date: new Date(2024, 10, 1),
      title: 'UTS Jaringan Komputer',
      time: '13:00 - 15:00',
      location: 'Lab 3',
      type: 'exam',
      lecturer: 'Rina Wati, M.Kom'
    },
    {
      id: 5,
      date: new Date(2024, 10, 5),
      title: 'Presentasi Proyek Akhir',
      time: '09:00 - 12:00',
      location: 'R401',
      type: 'presentation',
      lecturer: 'Dr. Hendra Wijaya, M.Kom'
    }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const hasEvent = (date) => {
    return events.some(event => isSameDay(event.date, date));
  };

  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getEventTypeColor = (type) => {
    switch(type) {
      case 'lecture': return '#15bb21';
      case 'assignment': return '#ffb81f';
      case 'exam': return '#ff6b6b';
      case 'presentation': return '#222c6d';
      default: return '#7fc37e';
    }
  };

  const getEventTypeLabel = (type) => {
    switch(type) {
      case 'lecture': return 'Kuliah';
      case 'assignment': return 'Tugas';
      case 'exam': return 'Ujian';
      case 'presentation': return 'Presentasi';
      default: return 'Acara';
    }
  };

  const days = getDaysInMonth(currentMonth);
  const todayEvents = getEventsForDate(selectedDate);

  return (
    <div className="kalender-container">
      <div className="kalender-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Kalender Akademik</h1>
      </div>

      <div className="calendar-section">
        <div className="month-navigation">
          <button className="nav-btn" onClick={previousMonth}>
            <ChevronLeft size={20} />
          </button>
          <h2>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h2>
          <button className="nav-btn" onClick={nextMonth}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="calendar-grid">
          {dayNames.map(day => (
            <div key={day} className="day-name">{day}</div>
          ))}
          {days.map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${!day ? 'empty' : ''} ${isSameDay(day, selectedDate) ? 'selected' : ''} ${isSameDay(day, new Date()) ? 'today' : ''}`}
              onClick={() => day && setSelectedDate(day)}
            >
              {day && (
                <>
                  <span className="day-number">{day.getDate()}</span>
                  {hasEvent(day) && <div className="event-indicator"></div>}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="events-section">
        <div className="events-header">
          <CalendarIcon size={20} />
          <h3>
            {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h3>
        </div>

        {todayEvents.length > 0 ? (
          <div className="events-list">
            {todayEvents.map(event => (
              <div key={event.id} className="event-card" style={{ borderLeftColor: getEventTypeColor(event.type) }}>
                <div className="event-type" style={{ backgroundColor: getEventTypeColor(event.type) }}>
                  {getEventTypeLabel(event.type)}
                </div>
                <h4 className="event-title">{event.title}</h4>
                <div className="event-details">
                  <div className="event-detail">
                    <Clock size={14} />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                  <div className="event-detail">
                    <BookOpen size={14} />
                    <span>{event.lecturer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            <CalendarIcon size={48} />
            <p>Tidak ada jadwal untuk tanggal ini</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}

export default Kalender;
