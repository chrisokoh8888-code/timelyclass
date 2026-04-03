document.addEventListener('DOMContentLoaded', () => {

  // 🔴 TEST CODE
  document.getElementById('login-btn').addEventListener('click', () => {
    alert('Login button clicked');
  });

});

// Firebase config
const firebaseConfig = {
    apiKey:"AIzaSyDEoau0QUKPdGiQgHR8UsAM3mlq20P6wnQ",
    authDomain:"timelyclass-d9ce2.firebaseapp.com",
    projectId:"timelyclass-d9ce2",
    storageBucket:"timelyclass-d9ce2.firebasestorage.app",
    messagingSenderId:"433350841480",
    appId:"1:433350841480:web:2294a465abc6e410ed3b3d
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// DOM
const loginContainer = document.getElementById('login-container');
const setupContainer = document.getElementById('setup-container');
const categoryContainer = document.getElementById('category-container');
const timetableContainer = document.getElementById('timetable-container');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');

const schoolNameInput = document.getElementById('school-name');
const schoolCodeInput = document.getElementById('school-code');
const schoolLocationInput = document.getElementById('school-location');
const saveSetupBtn = document.getElementById('save-setup-btn');

const logoutBtn = document.getElementById('logout-btn');
const saveBtn = document.getElementById('save-btn');
const timetableGrid = document.getElementById('timetable-grid');
const schoolTitle = document.getElementById('school-title');
const categoryTitle = document.getElementById('category-title');

const addPeriodBtn = document.getElementById('add-period-btn');
const removePeriodBtn = document.getElementById('remove-period-btn');
const exportPdfBtn = document.getElementById('export-pdf-btn');
const exportExcelBtn = document.getElementById('export-excel-btn');

let currentCategory = "Nursery"; // default

// LOGIN
loginBtn.addEventListener('click', () => {
  auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .catch(err => alert(err.message));
});

// SIGNUP
signupBtn.addEventListener('click', () => {
  auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .catch(err => alert(err.message));
});

// LOGOUT
logoutBtn.addEventListener('click', () => auth.signOut());

// AUTH STATE
auth.onAuthStateChanged(user => {
  if(user){
    loginContainer.style.display = 'none';
    database.ref('users/' + user.uid).once('value').then(snapshot => {
      if(snapshot.exists()){
        categoryContainer.style.display = 'block';
      } else {
        setupContainer.style.display = 'block';
      }
    });
  } else {
    loginContainer.style.display = 'block';
    setupContainer.style.display = 'none';
    categoryContainer.style.display = 'none';
    timetableContainer.style.display = 'none';
  }
});

// SAVE SCHOOL SETUP
saveSetupBtn.addEventListener('click', () => {
  const user = auth.currentUser;
  if(!user) return;
  const schoolData = {
    schoolName: schoolNameInput.value,
    schoolCode: schoolCodeInput.value,
    location: schoolLocationInput.value,
    createdAt: new Date().toISOString()
  };
  database.ref('users/' + user.uid).set(schoolData)
    .then(() => {
      setupContainer.style.display = 'none';
      categoryContainer.style.display = 'block';
    })
    .catch(err => alert(err.message));
});

// CATEGORY SELECTION
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.dataset.category;
    categoryTitle.innerText = currentCategory;
    categoryContainer.style.display = 'none';
    timetableContainer.style.display = 'block';
    loadTimetable();
  });
});

// LOAD TIMETABLE
function loadTimetable(){
  const user = auth.currentUser;
  database.ref(`timetables/${user.uid}/${currentCategory}`).once('value').then(snapshot => {
    const data = snapshot.val();
    for(let i=0;i<timetableGrid.rows.length;i++){
      for(let j=0;j<timetableGrid.rows[i].cells.length;j++){
        timetableGrid.rows[i].cells[j].innerText = data?.[i]?.[j] || timetableGrid.rows[i].cells[j].innerText;
      }
    }
  });
}

// SAVE TIMETABLE
saveBtn.addEventListener('click', ()=>{
  const user = auth.currentUser;
  if(!user) return;
  const data = [];
  for(let i=0;i<timetableGrid.rows.length;i++){
    data[i]=[];
    for(let j=0;j<timetableGrid.rows[i].cells.length;j++){
      data[i][j]=timetableGrid.rows[i].cells[j].innerText;
    }
  }
  database.ref(`timetables/${user.uid}/${currentCategory}`).set(data)
    .then(()=> alert('Timetable saved!'))
    .catch(err=>alert(err.message));
});

// ADD PERIOD
addPeriodBtn.addEventListener('click', ()=>{
  const row = timetableGrid.insertRow(-1);
  for(let i=0;i<=5;i++){
    const cell = row.insertCell(i);
    cell.contentEditable=true;
    if(i===0) cell.innerText="New Time";
  }
});

// REMOVE PERIOD
removePeriodBtn.addEventListener('click', ()=>{
  if(timetableGrid.rows.length>2) timetableGrid.deleteRow(-1);
});

// EXPORT PDF
exportPdfBtn.addEventListener('click', ()=>{
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(`${schoolTitle.innerText} - ${currentCategory}`,14,15);
  doc.autoTable({ html: '#timetable-grid', startY:20 });
  doc.save(`Timetable_${currentCategory}.pdf`);
});

// EXPORT EXCEL
exportExcelBtn.addEventListener('click', ()=>{
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(timetableGrid);
  XLSX.utils.book_append_sheet(wb, ws, currentCategory);
  XLSX.writeFile(wb, `Timetable_${currentCategory}.xlsx`);
});//
