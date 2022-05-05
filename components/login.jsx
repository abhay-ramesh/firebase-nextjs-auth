// Create React Component for Login using firebase authentication

import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

const provider = new GoogleAuthProvider();

export default function Login() {
    const auth = getAuth();

    setPersistence(auth, browserSessionPersistence);

    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider);
    };

    return (
        <div>
            <div>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input

                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button>Login</button>
                </form>
                {error && <p>{error}</p>}
            </div>
            <div>
                <button onClick={handleGoogleLogin}>Login with Google</button>
            </div>
        </div>
    );
}
