document.addEventListener('DOMContentLoaded', () => {

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
  // 🔥 ADD THESE HERE
 const loginContainer = document.getElementById('login-container');
 const setupContainer = document.getElementById('setup-container');
 const categoryContainer = document.getElementById('category-container');
  
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const saveSetupBtn = document.getElementById('save-setup-btn');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  signupBtn.addEventListener('click', () => {
  auth.createUserWithEmailAndPassword(email.value, password.value)
    .then(user => {
      alert("Signup success: " + user.user.email);

      // 👉 ADD THIS HERE
      loginContainer.style.display = 'none';
      setupContainer.style.display = 'block';
    })
    .catch(err => alert(err.message));
});

  loginBtn.addEventListener('click', () => {
  auth.signInWithEmailAndPassword(email.value, password.value)
    .then(user => {
      alert("Login success: " + user.user.email);

      // 👉 ADD THIS HERE
      loginContainer.style.display = 'none';
      setupContainer.style.display = 'block';
    })
    .catch(err => alert(err.message));
});

});
