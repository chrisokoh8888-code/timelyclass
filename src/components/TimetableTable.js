export default function TimetableTable({ timetable }) {
  return (
    <div>
      {Object.keys(timetable).map(day => (
        <div key={day} className="mb-4">
          <h3 className="font-bold">{day}</h3>
          <div className="grid grid-cols-8 gap-2">
            {timetable[day].map((item, i) => (
              <div key={i} className="p-2 bg-gray-200 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
