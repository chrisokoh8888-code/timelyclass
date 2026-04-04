document.addEventListener('DOMContentLoaded', () => {
  // 🔹 Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyDEoau0QUKPdGiQgHR8UsAM3mlq20P6wnQ",
    authDomain: "timelyclass-d9ce2.firebaseapp.com",
    databaseURL: "https://timelyclass-d9ce2.firebaseio.com",
    projectId: "timelyclass-d9ce2",
    storageBucket: "timelyclass-d9ce2.firebasestorage.app",
    messagingSenderId: "433350841480",
    appId: "1:433350841480:web:2294a465abc6e410ed3b3d"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();

  // 🔹 DOM elements
  const loginContainer = document.getElementById('login-container');
  const setupContainer = document.getElementById('setup-container');
  const categoryContainer = document.getElementById('category-container');
  const timetableContainer = document.getElementById('timetable-container');
  const categoryTitle = document.getElementById('category-title');

  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const saveSetupBtn = document.getElementById('save-setup-btn');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const categoryButtons = document.querySelectorAll('.category-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const addPeriodBtn = document.getElementById('add-period-btn');
  const removePeriodBtn = document.getElementById('remove-period-btn');
  const saveTimetableBtn = document.getElementById('save-btn');
  const exportPdfBtn = document.getElementById('export-pdf-btn');
  const exportExcelBtn = document.getElementById('export-excel-btn');
  const timetableGrid = document.getElementById('timetable-grid');

  // 🔹 LOGIN & SIGNUP
  signupBtn.addEventListener('click', () => {
    auth.createUserWithEmailAndPassword(email.value, password.value)
      .then(user => {
        alert("Signup success: " + user.user.email);
        loginContainer.style.display = 'none';
        setupContainer.style.display = 'block';
      })
      .catch(err => alert(err.message));
  });

  loginBtn.addEventListener('click', () => {
    auth.signInWithEmailAndPassword(email.value, password.value)
      .then(user => {
        alert("Login success: " + user.user.email);
        loginContainer.style.display = 'none';
        setupContainer.style.display = 'block';
      })
      .catch(err => alert(err.message));
  });

  // 🔹 SAVE SCHOOL SETUP
  saveSetupBtn.addEventListener('click', () => {
    const schoolName = document.getElementById('school-name').value;
    const schoolCode = document.getElementById('school-code').value;
    const schoolLocation = document.getElementById('school-location').value;
    const userId = auth.currentUser.uid;

    database.ref('schools/' + userId).set({
      schoolName,
      schoolCode,
      schoolLocation
    })
    .then(() => {
      alert("School details saved!");
      setupContainer.style.display = 'none';
      categoryContainer.style.display = 'block';
    })
    .catch(error => {
      alert(error.message);
    });
  });

  // 🔹 CATEGORY SELECTION
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.getAttribute('data-category');
      categoryTitle.textContent = selectedCategory;
      categoryContainer.style.display = 'none';
      timetableContainer.style.display = 'block';
    });
  });

  // 🔹 LOGOUT
  logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
      timetableContainer.style.display = 'none';
      loginContainer.style.display = 'block';
    });
  });

  // 🔹 TIMETABLE PERIOD MANAGEMENT
  addPeriodBtn.addEventListener('click', () => {
    const newRow = timetableGrid.insertRow(-1);
    const timeCell = newRow.insertCell(0);
    timeCell.contentEditable = "true";
    timeCell.textContent = "New Time";
    for (let i = 1; i <= 5; i++) {
      const cell = newRow.insertCell(i);
      cell.contentEditable = "true";
    }
  });

  removePeriodBtn.addEventListener('click', () => {
    if (timetableGrid.rows.length > 2) { // Keep header + at least 1 row
      timetableGrid.deleteRow(-1);
    }
  });

  // 🔹 SAVE TIMETABLE
  saveTimetableBtn.addEventListener('click', () => {
    const rows = timetableGrid.rows;
    const timetableData = [];
    for (let i = 1; i < rows.length; i++) { // skip header
      const rowData = [];
      for (let j = 0; j < rows[i].cells.length; j++) {
        rowData.push(rows[i].cells[j].textContent);
      }
      timetableData.push(rowData);
    }
    const userId = auth.currentUser.uid;
    database.ref('timetables/' + userId).set(timetableData)
      .then(() => alert("Timetable saved successfully!"))
      .catch(err => alert(err.message));
  });

  // 🔹 EXPORT PDF
  exportPdfBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let rowData = [];
    for (let i = 0; i < timetableGrid.rows.length; i++) {
      rowData = [];
      for (let j = 0; j < timetableGrid.rows[i].cells.length; j++) {
        rowData.push(timetableGrid.rows[i].cells[j].textContent);
      }
      doc.text(rowData.join(" | "), 10, 10 + (i * 10));
    }
    doc.save("timetable.pdf");
  });

  // 🔹 EXPORT EXCEL
  exportExcelBtn.addEventListener('click', () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(timetableGrid);
    XLSX.utils.book_append_sheet(wb, ws, "Timetable");
    XLSX.writeFile(wb, "timetable.xlsx");
  });
});
