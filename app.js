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

  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const saveSetupBtn = document.getElementById('save-setup-btn');

  const email = document.getElementById('email');
  const password = document.getElementById('password');

  // 🔹 SIGNUP
  signupBtn.addEventListener('click', () => {
    auth.createUserWithEmailAndPassword(email.value, password.value)
      .then(user => {
        alert("Signup success: " + user.user.email);
        loginContainer.style.display = 'none';
        setupContainer.style.display = 'block';
      })
      .catch(err => alert(err.message));
  });

  // 🔹 LOGIN
  loginBtn.addEventListener('click', () => {
    auth.signInWithEmailAndPassword(email.value, password.value)
      .then(user => {
        alert("Login success: " + user.user.email);
        loginContainer.style.display = 'none';
        setupContainer.style.display = 'block';
      })
      .catch(err => alert(err.message));
  });

  // 🔹 SAVE SCHOOL DETAILS
  saveSetupBtn.addEventListener('click', () => {

    // ✅ Debug alert to confirm button is working
    console.log("Save button clicked");

    const schoolName = document.getElementById('school-name').value;
    const schoolCode = document.getElementById('school-code').value;
    const schoolLocation = document.getElementById('school-location').value;

    const user = auth.currentUser;
    if (!user) {
      alert("Error: No user logged in!");
      return;
    }

    console.log("User ID:", user.uid);
    console.log("School Name:", schoolName, "Code:", schoolCode, "Location:", schoolLocation);

    // 🔹 Save to Firebase
    database.ref('schools/' + user.uid).set({
      schoolName,
      schoolCode,
      schoolLocation
    })
    .then(() => {
      alert("School details saved successfully!");
      setupContainer.style.display = 'none';
      categoryContainer.style.display = 'block';
    })
    .catch(error => {
      alert("Error saving details: " + error.message);
    });

  });

});
