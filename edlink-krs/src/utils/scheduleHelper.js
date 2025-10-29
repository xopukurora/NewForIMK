export const checkConflict = (selectedClasses, newClass) => {
  for (const selected of selectedClasses) {
    if (selected.hari === newClass.hari) {
      const selectedStart = timeToMinutes(selected.waktu.split('-')[0]);
      const selectedEnd = timeToMinutes(selected.waktu.split('-')[1]);
      const newStart = timeToMinutes(newClass.waktu.split('-')[0]);
      const newEnd = timeToMinutes(newClass.waktu.split('-')[1]);

      if (
        (newStart >= selectedStart && newStart < selectedEnd) ||
        (newEnd > selectedStart && newEnd <= selectedEnd) ||
        (newStart <= selectedStart && newEnd >= selectedEnd)
      ) {
        return true;
      }
    }
  }
  return false;
};

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const isClassFull = (kelas) => {
  return kelas.terisi >= kelas.kapasitas;
};

export const getTotalSKS = (selectedCourses) => {
  return selectedCourses.reduce((total, course) => total + course.sks, 0);
};
