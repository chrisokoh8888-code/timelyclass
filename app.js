// ===================== Firebase Config =====================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// ===================== DOM Elements =====================
const loginContainer = document.getElementById('login-container');
const timetableContainer = document.getElementById('timetable-container');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const saveBtn = document.getElementById('save-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const timetableGrid = document.getElementById('timetable-grid').querySelector('tbody');

// ===================== Auth Logic =====================
loginBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => loadTimetable())
    .catch(err => alert(err.message));
});

signupBtn.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => loadTimetable())
    .catch(err => alert(err.message));
});

logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    loginContainer.style.display = 'block';
    timetableContainer.style.display = 'none';
  });
});

// ===================== Timetable Grid =====================
const times = ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00'];

function createGrid(data = {}) {
  timetableGrid.innerHTML = '';
  times.forEach((time, rowIndex) => {
    const tr = document.createElement('tr');
    const timeTd = document.createElement('td');
    timeTd.textContent = time;
    tr.appendChild(timeTd);

    ['Monday','Tuesday','Wednesday','Thursday','Friday'].forEach(day => {
      const td = document.createElement('td');
      const input = document.createElement('input');
      input.value = (data[day] && data[day][rowIndex]) || '';
      td.appendChild(input);
      tr.appendChild(td);
    });

    timetableGrid.appendChild(tr);
  });
}

// ===================== Load/Save Timetable =====================
function loadTimetable() {
  const user = auth.currentUser;
  if (!user) return;

  loginContainer.style.display = 'none';
  timetableContainer.style.display = 'block';

  database.ref('timetables/' + user.uid).once('value').then(snapshot => {
    createGrid(snapshot.val());
  });
}

saveBtn.addEventListener('click', () => {
  const user = auth.currentUser;
  if (!user) return;

  const data = {};
  ['Monday','Tuesday','Wednesday','Thursday','Friday'].forEach((day, colIndex) => {
    data[day] = [];
    times.forEach((time, rowIndex) => {
      const input = timetableGrid.rows[rowIndex].cells[colIndex + 1].querySelector('input');
      data[day].push(input.value);
    });
  });

  database.ref('timetables/' + user.uid).set(data)
    .then(() => alert('Timetable saved successfully!'))
    .catch(err => alert(err.message));
}
);
