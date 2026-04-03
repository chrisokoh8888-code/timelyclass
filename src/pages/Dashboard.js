import { useState } from "react";
import { generateTimetable } from "../utils/generator";

export default function Dashboard() {
  const [form, setForm] = useState({});
  const [timetable, setTimetable] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    setTimetable(generateTimetable(form));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ClassGrid Dashboard</h1>

      <input name="schoolName" placeholder="School Name" onChange={handleChange} /><br /><br />
      <input name="subjects" placeholder="Math,English,Bio" onChange={handleChange} /><br /><br />
      <input name="periodsPerDay" placeholder="Periods per day" onChange={handleChange} /><br /><br />
      <input name="daysPerWeek" placeholder="Days per week" onChange={handleChange} /><br /><br />

      <button onClick={handleGenerate}>Generate Timetable</button>

      {timetable && (
        <div style={{ marginTop: "20px" }}>
          {Object.keys(timetable).map(day => (
            <div key={day}>
              <h3>{day}</h3>
              <p>{timetable[day].join(" | ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
