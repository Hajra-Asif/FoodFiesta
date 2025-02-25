// import {
//   auth,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
//   sendPasswordResetEmail,
// } from "./firebaseconfig.js";





// onAuthStateChanged(auth, (user) => {
//   console.log("Auth State Changed Triggered:", user);
//   if (user) {
//     console.log("User is logged in:", user);
//     document.getElementById("avatar-email").innerHTML = user.email;
//     document.getElementById("greetings").innerHTML = `Hi, ${user.email.split("@")[0]
//       }`;

//     document.getElementById("profileTrigger").style.display = "block";
//     document.getElementById("avatar").innerHTML = user.email
//       .slice(0, 1)
//       .toUpperCase();
//     document.getElementById("triggerText").innerHTML = user.email
//       .slice(0, 1)
//       .toUpperCase();
//     document.getElementById("authentication")?.remove();
//     document.getElementById("loginmodal")?.remove();
//   } else {
//     console.log("User is logged out");
//     document.getElementById("profileTrigger").style.display = "none";
//   }
// });



// // UpdatePswd()
// const login = async (e) => {
//   e.preventDefault();

//   const email = document.getElementById("login-email").value.trim();
//   const password = document.getElementById("login-password").value.trim();

//   document.getElementById("login-email").style.border = "";
//   document.getElementById("login-password").style.border = "";
//   document.getElementById("loginError").innerText = "";
//   document.getElementById("loginError").style.display = "none";

//   if (!email || !password) {
//     document.getElementById("login-email").style.border = "2px solid crimson";
//     document.getElementById("login-password").style.border =
//       "2px solid crimson";
//     document.getElementById("loginError").innerText =
//       "Email and password are required.";
//     document.getElementById("loginError").style.display = "block";
//     return;
//   }

//   try {
//     let userCredential = await signInWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     let user = userCredential.user;
//     let useremail = user.email;
//     let userNamee = user.displayName || useremail.split("@")[0];

//     console.log("User logged in successfully:", user);

//     if (user) {
//       document.getElementById("authentication")?.remove();
//       document.getElementById("loginmodal")?.remove();
//       document.getElementById("profileTrigger").style.display = "block";
//       document.getElementById("useraplha").innerHTML = useremail
//         .slice(0, 1)
//         .toUpperCase();
//       document.getElementById("profileTrigger").innerHTML = useremail
//         .slice(0, 1)
//         .toUpperCase();
//       document.getElementById("userEmail").innerHTML = useremail;
//       document.getElementById("userName").innerHTML = `Hi, ${userNamee}`;
//     }
//   } catch (error) {
//     console.error("Login failed:", error.code, error.message);
//   }
// };

// document.addEventListener("DOMContentLoaded", function () {
//   const loginButton = document.getElementById("login-btn");
//   if (loginButton) {
//     loginButton.addEventListener("click", login);
//   }
// });



// console.log("login screen pe hooooooooooO!");


// // logout

// let logout = () => {
//   try {
//     console.log(auth, "logout");
//     signOut(auth);
//     window.location.replace("/");
//     console.log("logout success!");
//   } catch (e) {
//     console.log(e, "error in logout");
//   }
// };



// document.addEventListener("DOMContentLoaded", function () {
//   const logutButton = document.getElementById("signout");
//   if (logutButton) {
//     logutButton.addEventListener("click", function () {
//       console.log("User logout button clicked"); // ✅ Ye sirf button click hone pe chalega
//       logout();
//     });
//   }
// });



// // profile image

// document
//   .getElementById("profileTrigger")
//   .addEventListener("click", function () {
//     document.getElementById("popupContainer").style.display = "block";
//   });



// document.addEventListener("DOMContentLoaded", function () {
//   const manageBtn = document.getElementById('manageAccountBtn');



//   if (manageBtn) {

//     manageBtn.addEventListener('click', function () {
//       showStatus("Redirecting to dashboard...");
//       window.location.replace('../Dashboard/dashboard.html');

//     });
//   }
// });

// // Close popup when clicking outside
// window.addEventListener("click", function (e) {
//   const popup = document.getElementById("popupContainer");
//   const trigger = document.getElementById("profileTrigger");
//   if (!popup.contains(e.target) && !trigger.contains(e.target)) {
//     popup.style.display = "none";
//   }
// });

// // forgot password

// let forgotpswd = async () => {
//   try {
//     const email = document.getElementById("login-email").value;
//     let resetpswd = await sendPasswordResetEmail(auth, email);
//     // console.log("aagaya apkay email pe");
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   }
// };

// document.getElementById("forgotpswd")?.addEventListener("click", forgotpswd);

import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  getDoc,
  doc,
  db,
  getDocs,
  collection,
  query,
  where
} from "./firebaseconfig.js";

// 🔹 **User Authentication State Maintain Karna** 🔹

let userId;
let userRole;
onAuthStateChanged(auth, async (user) => {
  console.log("Auth State Changed Triggered:", user);
  if (user) {
    console.log("User is logged in:", user.uid);
    userId = user.uid

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot, "query snapshot")
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]; // First matching document
      const userData = userDoc.data();

      console.log("User role:", userData.role);
      userRole = userData.role

      if (userData.role === "admin") {
        console.log("User exists:", userData.role);
      } else {
        console.log("role not found");
        
      }

      return userData; // Return user object if needed
    } else {
      console.log("User data not found in Firestore!");
    }
    // **HTML Elements Update**
    try {
      document.getElementById("avatar-email").innerHTML = user.email;
      document.getElementById("greetings").innerHTML = `Hi, ${user.email.split("@")[0]}`;
      document.getElementById("profileTrigger").style.display = "block";
      document.getElementById("avatar").innerHTML = user.email.slice(0, 1).toUpperCase();
      document.getElementById("triggerText").innerHTML = user.email.slice(0, 1).toUpperCase();
      document.getElementById("authentication")?.remove();
      document.getElementById("loginmodal")?.remove();
    } catch (error) {
      console.log(error);

    }

  } else {
    console.log("User is logged out");
    document.getElementById("profileTrigger").style.display = "none";
  }
});

//  **User Login Function**
const login = async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  // **Validation**
  if (!email || !password) {
    document.getElementById("login-email").style.border = "2px solid crimson";
    document.getElementById("login-password").style.border = "2px solid crimson";
    document.getElementById("loginError").innerText = "Email and password are required.";
    document.getElementById("loginError").style.display = "block";
    return;
  }

  try {
    // **Firebase Authentication**
    let userCredential = await signInWithEmailAndPassword(auth, email, password);
    let user = userCredential.user;
    let useremail = user.email;
    let userNamee = user.displayName || useremail.split("@")[0];

    console.log("User logged in successfully:", user);

    // 🔹 **Firestore se Role Fetch Karna**
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("User role:", userData.role);
    }

    // **HTML Elements Update**
    document.getElementById("authentication")?.remove();
    document.getElementById("loginmodal")?.remove();
    document.getElementById("profileTrigger").style.display = "block";
    document.getElementById("userEmail").innerHTML = useremail;
    document.getElementById("userName").innerHTML = `Hi, ${userNamee}`;
  } catch (error) {
    console.error("Login failed:", error.code, error.message);
  }
};

// **Event Listener for Login Button**
document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login-btn");
  if (loginButton) {
    loginButton.addEventListener("click", login);
  }
});

// 🔹 **User Logout Function**
let logout = async () => {
  try {
    console.log("Logging out...");
    await signOut(auth); // **Proper Logout**
    console.log("Logout successful!");
    window.location.replace("/");
  } catch (e) {
    console.error("Error in logout:", e);
  }
};

// **Event Listener for Logout Button**
document.addEventListener("DOMContentLoaded", function () {
  const logoutButton = document.getElementById("signout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      console.log("User logout button clicked");
      logout();
    });
  }
});

// 🔹 **Profile Image Toggle**
document.getElementById("profileTrigger").addEventListener("click", function () {
  document.getElementById("popupContainer").style.display = "block";
});

// **Close Popup When Clicking Outside**
window.addEventListener("click", function (e) {
  const popup = document.getElementById("popupContainer");
  const trigger = document.getElementById("profileTrigger");
  if (!popup.contains(e.target) && !trigger.contains(e.target)) {
    popup.style.display = "none";
  }
});

// 🔹 **Manage Account Button**
document.addEventListener("DOMContentLoaded", function () {
  const manageBtn = document.getElementById("manageAccountBtn");
  if (manageBtn) {
    manageBtn.addEventListener("click", function () {
      // console.log(userId, "this is userid");
      // console.log(userRole, "this is user role");
      // window.location.replace("../Dashboard/dashboard.html");


      if (userRole == "admin") {
        showStatus("Redirecting to dashboard...");
        window.location.replace("../admindashboard/admindashboard.html");
      }
      else {
        window.location.replace("../Dashboard/dashboard.html");
        showStatus("Redirecting to dashboard...");
      }


    });
  }
});

// 🔹 **Forgot Password Function**
let forgotpswd = async () => {
  try {
    const email = document.getElementById("login-email").value;
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent!");
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
  }
};

// **Event Listener for Forgot Password Button**
document.getElementById("forgotpswd")?.addEventListener("click", forgotpswd);

console.log("Login screen pe ho!");