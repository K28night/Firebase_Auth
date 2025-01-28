// Import the Firebase modules you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1j2jZemTd21wo4k1qctyfgsDDfaX-XL8",
  authDomain: "chatnow-d053e.firebaseapp.com",
  projectId: "chatnow-d053e",
  storageBucket: "chatnow-d053e.firebasestorage.app",
  messagingSenderId: "222972944786",
  appId: "1:222972944786:web:712834d91384ff1e08214b",
  measurementId: "G-7GL9JVGPLZ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


//sign up
document.querySelector("#rlogin"),addEventListener("click", e=>{
  e.preventDefault();
  const email=document.querySelector("email");
  const password=document.querySelector("pass");
  const username=document.querySelector("username");
  auth.createUserWithEmailAndPassword(email,password).then((cred)=>{
    alert("user sign up");
  });

});

// Google Authentication Example
const googleLoginButton = document.getElementById("firelogin");
googleLoginButton.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    console.log("Attempting sign-in...");
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
    alert(`Welcome, ${result.user.displayName}`);
    window.location.href="welcome.html?name="+encodeURIComponent(result.user.displayName);;
  } catch (error) {
    console.error("Error during sign-in:", error);
    alert(`Error: ${error.message}`);
  }
});


const modal = document.getElementById("myModal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.querySelector(".close");
    const loginTab = document.getElementById("loginTab");
    const registerTab = document.getElementById("registerTab");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Open modal
    openModalBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    // Close modal
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside content
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    // Toggle tabs
    loginTab.addEventListener("click", () => {
      loginTab.classList.add("active");
      registerTab.classList.remove("active");
      loginForm.classList.add("active");
      registerForm.classList.remove("active");
    });

    registerTab.addEventListener("click", () => {
      registerTab.classList.add("active");
      loginTab.classList.remove("ulogin");
      loginTab.classList.remove("active");
      registerForm.classList.add("active");
      loginForm.classList.remove("active");
    });
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

