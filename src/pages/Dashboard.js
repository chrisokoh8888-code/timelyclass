import { useState, useEffect } from "react";
import { generateTimetable } from "../utils/generator";
import { saveTimetable, getUserTimetables } from "../services/firestore";
import auth from "../services/auth";
import Sidebar from "../components/Sidebar";
import TimetableTable from "../components/TimetableTable";

export default function Dashboard() {
  const [form, setForm] = useState({});
  const [timetable, setTimetable] = useState(null);
  const [saved, setSaved] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      getUserTimetables(user.uid).then(setSaved);
    }
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    setTimetable(generateTimetable(form));
  };

  const handleSave = async () => {
    await saveTimetable(user.uid, { schoolName: form.schoolName, timetable });
    alert("Saved!");
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 flex-1">
        <h1 className="text-2xl mb-4">Dashboard</h1>

        <input name="schoolName" placeholder="School Name" onChange={handleChange} />
        <input name="subjects" placeholder="Math,English" onChange={handleChange} />

        <button onClick={handleGenerate}>Generate</button>

        {timetable && (
          <>
            <TimetableTable timetable={timetable} />
            <button onClick={handleSave}>Save</button>
          </>
        )}

        <h2 className="mt-6">Saved</h2>
        {saved.map((t, i) => (
          <div key={i}>{t.schoolName}</div>
        ))}
      </div>
    </div>
  );
}
