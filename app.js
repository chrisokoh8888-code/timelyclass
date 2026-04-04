// app.js
document.addEventListener('DOMContentLoaded', () => {

  // -------------------------
  // 🔹 Firebase Config
  // -------------------------
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

  // -------------------------
  // 🔹 DOM Elements
  // -------------------------
  const loginContainer = document.getElementById('login-container');
  const setupContainer = document.getElementById('setup-container');
  const categoryContainer = document.getElementById('category-container');

  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const saveSetupBtn = document.getElementById('save-setup-btn');

  const email = document.getElementById('email');
  const password = document.getElementById('password');

  // -------------------------
  // 🔹 Signup
  // -------------------------
  signupBtn.addEventListener('click', () => {
    const userEmail = email.value;
    const userPassword = password.value;

    if (!userEmail || !userPassword) {
      alert("Please enter email and password.");
      return;
    }

    auth.createUserWithEmailAndPassword(userEmail, userPassword)
      .then(userCredential => {
        alert("Signup successful: " + userCredential.user.email);
        // Switch to school setup screen
        loginContainer.style.display = 'none';
        setupContainer.style.display = 'block';
      })
      .catch(err => alert(err.message));
  });

  // -------------------------
  // 🔹 Login
  // -------------------------
  loginBtn.addEventListener('click', () => {
    const userEmail = email.value;
    const userPassword = password.value;

    if (!userEmail || !userPassword) {
      alert("Please enter email and password.");
      return;
    }

    auth.signInWithEmailAndPassword(userEmail, userPassword)
      .then(userCredential => {
        alert("Login successful: " + userCredential.user.email);
        // Switch to school setup screen
        loginContainer.style.display = 'none';
        setupContainer.style.display = 'block';
      })
      .catch(err => alert(err.message));
  });

  // -------------------------
  // 🔹 Save School Setup
  // -------------------------
  saveSetupBtn.addEventListener('click', () => {
    const user = auth.currentUser;
    if (!user) {
      alert("No user logged in! Please login first.");
      return;
    }

    const schoolName = document.getElementById('school-name').value;
    const schoolCode = document.getElementById('school-code').value;
    const schoolLocation = document.getElementById('school-location').value;

    if (!schoolName || !schoolCode || !schoolLocation) {
      alert("Please fill all school details.");
      return;
    }

    // Save data to Realtime Database
    database.ref('schools/' + user.uid).set({
      schoolName,
      schoolCode,
      schoolLocation
    })
    .then(() => {
      alert("School details saved successfully!");
      // Switch to category selection screen
      setupContainer.style.display = 'none';
      categoryContainer.style.display = 'block';
    })
    .catch(error => {
      alert("Error saving details: " + error.message);
    });
  });

});
