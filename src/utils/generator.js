export function generateTimetable(form) {
  const days = Array.from({ length: form.daysPerWeek }, (_, i) => `Day ${i + 1}`);
  const subjects = form.subjects.split(",");

  let table = {};

  days.forEach(day => {
    table[day] = [];

    for (let p = 1; p <= form.periodsPerDay; p++) {
      if (p == form.shortBreak) {
        table[day].push("Short Break");
      } else if (p == form.longBreak) {
        table[day].push("Long Break");
      } else {
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        table[day].push(subject);
      }
    }
  });

  return table;
}
