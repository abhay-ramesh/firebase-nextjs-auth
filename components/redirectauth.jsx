import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import ToggleSignInSignUp from "./toggleSignInSignUp";

export function RedirectAuth({ children }) {
    // get url parameters
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const auth = getAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        }
        );
        return () => unsubscribe();
    }, [auth]);

    if (user) {
        return children;
    }
    return <ToggleSignInSignUp />;
}



