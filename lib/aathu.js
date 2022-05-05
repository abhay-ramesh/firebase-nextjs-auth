import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function aathu() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in from aathu: ", user);
        setUser(user);
        setIsLoggedIn(true);
        setLoading(false);
      } else {
        // User is signed out
        console.log("User is signed out from aathu");
        setUser(null);
        setIsLoggedIn(false);
        setLoading(false);
        // redirect to login page
      }
    });
  }, [auth]);
  console.log("aathu: ", user);
  return { user, isLoggedIn, loading };
}

export function aathuServer() {
  console.log("aathuServer: ", auth);
  const user = auth.currentUser;
  const isLoggedIn = !!user;
  const loading = false;
  console.log(
    "aathuServer: ",
    "user: ",
    user,
    "isLoggedIn: ",
    isLoggedIn,
    "loading: ",
    loading
  );
  return { user, isLoggedIn, loading };
  //   console.log("aathuServer: ", auth);
  //   const { isLoggedIn, user } = onAuthStateChanged(auth, (user) => {
  //     const isLoggedIn = user ? true : false;
  //     user = user ? user : null;
  //     console.log("aathuServer: ", "User: ", user, "isLoggedIn: ", isLoggedIn);
  //     return { user, isLoggedIn };
  //   });
  //   console.log("aathuServer: ", "User: ", user, "isLoggedIn: ", isLoggedIn);
  //   return { user, isLoggedIn };
}
