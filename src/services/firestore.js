import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

export const saveTimetable = async (userId, data) => {
  await addDoc(collection(db, "timetables"), {
    userId,
    ...data,
    createdAt: new Date(),
  });
};

export const getUserTimetables = async (userId) => {
  const q = query(collection(db, "timetables"), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  let results = [];
  snapshot.forEach(doc => results.push(doc.data()));

  return results;
};
