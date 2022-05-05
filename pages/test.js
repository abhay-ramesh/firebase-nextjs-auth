import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { useState, useEffect } from "react";

export default function login() {
  const auth = getAuth();
  // setPersistence(auth, browserSessionPersistence);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState(null);

  const [userDetails, setUserDetails] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const test = auth.currentUser;
  console.log("User Info: ", test);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("User is signed in: ", user);
      setUserDetails(user);
      setUserLoggedIn(true);
      // ...
    } else {
      // User is signed out
      console.log("User is signed out");
      // ...
    }
  });
  // console.log("userDetails: ", userDetails);
  // console.log("userLoggedIn: ", userLoggedIn);
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        // console.log(userDetails);
      });
      console.log("User created: ", userCredential.user);
      console.log(userCredential.user.email);
      // ...
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError("User already exists");
      // ..
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User Logged in: ", userCredential.user);
      console.log(userCredential.user.email);
      // ...
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      // ..
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      setUser(null);
      setUserLoggedIn(false);
      console.log("User Logged out");
      // ...
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      // ..
    }
  };

  if (userLoggedIn) {
    return (
      <div>
        <h1>Profile</h1>
        <h2>Welcome {userDetails.email}</h2>
        <img src={userDetails.photoURL} alt={userDetails.displayName} />
        {/* <button onClick={signOut}>Logout</button> */}
        {userDetails ? (
          <>
            {userDetails.displayName ? (
              <h2>Hi {userDetails.displayName}</h2>
            ) : (
              <></>
            )}
            {userDetails.photoURL ? (
              <img src={userDetails.photoURL} alt={userDetails?.displayName} />
            ) : (
              <img
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt={userDetails?.displayName}
              />
            )}
            {userDetails.emailVerified ? (
              <>
                <p>Email Verified✅</p>
              </>
            ) : (
              <p>Email Not Verified❌</p>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return (
      <>
        <h1>Signup</h1>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSignup}>Signup</button>
        </div>
        <div>
          <p>{passwordError}</p>
          <p>{error}</p>
        </div>

        {/* make html seprator */}
        <hr />
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>
        <div>
          <p>{passwordError}</p>
          <p>{error}</p>
        </div>
      </>
    );
  }
}
