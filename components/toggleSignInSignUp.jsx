// Create React Component to toggle between Signup and Login

import { useState } from "react";
import Login from "./login";
import Signup from "./signup";

export default function ToggleSignInSignUp() {
    const [isSignup, setIsSignup] = useState(false);

    const handleToggle = () => {
        setIsSignup(!isSignup);
    }

    return (
        <div>
            <button onClick={handleToggle}>
                {isSignup ? "Sign In" : "Sign Up"}
            </button>
            {isSignup ? <Signup /> : <Login />}
        </div>
    );
}