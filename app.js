document.addEventListener('DOMContentLoaded', () => {

  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  signupBtn.addEventListener('click', () => {
    auth.createUserWithEmailAndPassword(email.value, password.value)
      .then(user => alert("Signup success: " + user.user.email))
      .catch(err => alert(err.message));
  });

  loginBtn.addEventListener('click', () => {
    auth.signInWithEmailAndPassword(email.value, password.value)
      .then(user => alert("Login success: " + user.user.email))
      .catch(err => alert(err.message));
  });

});
