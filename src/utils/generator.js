export function generateTimetable(form) {
  const days = Array.from({ length: Number(form.daysPerWeek || 5) }, (_, i) => `Day ${i + 1}`);
  const subjects = (form.subjects || "").split(",");

  let table = {};

  days.forEach(day => {
    table[day] = [];

    for (let p = 1; p <= Number(form.periodsPerDay || 6); p++) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)] || "Free";
      table[day].push(subject);
    }
  });

  return table;
}
