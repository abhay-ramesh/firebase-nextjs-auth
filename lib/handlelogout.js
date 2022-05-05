import { getAuth, signOut } from "firebase/auth";

const handleLogout = async (e) => {
  const auth = getAuth();
  e.preventDefault();
  try {
    await signOut(auth);
    console.log("User Logged out");
    // ...
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  }
};

export default handleLogout;
