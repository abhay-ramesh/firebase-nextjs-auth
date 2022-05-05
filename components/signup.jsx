// Create React Component for Signup using firebase authentication

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Signup() {
    const auth = getAuth();

    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordLength, setPasswordLength] = useState(false);
    const [passwordUpperCase, setPasswordUpperCase] = useState(false);
    const [passwordLowerCase, setPasswordLowerCase] = useState(false);
    const [passwordNumber, setPasswordNumber] = useState(false);
    const [passwordSpecialChar, setPasswordSpecialChar] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);


    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError("Passwords do not match");
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
    // Regex password validation
    useEffect(() => {
        if (password.length > 8) setPasswordLength(true)
        else setPasswordLength(false);
        if (password.match(/[A-Z]/)) setPasswordUpperCase(true)
        else setPasswordUpperCase(false);
        if (password.match(/[a-z]/)) setPasswordLowerCase(true)
        else setPasswordLowerCase(false);
        if (password.match(/[0-9]/)) setPasswordNumber(true)
        else setPasswordNumber(false);
        if (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) setPasswordSpecialChar(true)
        else setPasswordSpecialChar(false);
    }, [password]);

    // Password is valid
    useEffect(() => {
        if (passwordLength && passwordUpperCase && passwordLowerCase && passwordNumber && passwordSpecialChar) {
            setPasswordValid(true);
        }
    }, [passwordLength, passwordUpperCase, passwordLowerCase, passwordNumber, passwordSpecialChar, passwordMatch]);

    // Password and passwordConfirm match
    useEffect(() => {
        if (password === passwordConfirm && passwordValid) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    }, [password, passwordConfirm]);

    return (
        <div>
            <form onSubmit={handleSignup}>
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
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$"
                    // To check a password above 8 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
                    title="Must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character and be at least 8 characters long"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    disabled={!passwordValid}
                />
                <button disabled={!passwordMatch}>Signup</button>
            </form>
            {error && <p>{error}</p>}
            <div>
                {passwordValid ?
                    <>
                        <p>Password is valid{passwordValid ? "✅" : "❌"}</p>
                        <p>Password and Confirm Password match{passwordMatch ? "✅" : "❌"}</p>
                    </>
                    :
                    <>
                        <p>Password is at least 8 characters long{passwordLength ? "✅" : "❌"}</p>
                        <p>Password contains at least one lowercase letter{passwordLowerCase ? "✅" : "❌"}</p>
                        <p>Password contains at least one uppercase letter{passwordUpperCase ? "✅" : "❌"}</p>
                        <p>Password contains at least one numeric digit{passwordNumber ? "✅" : "❌"}</p>
                        <p>Password contains at least one special character{passwordSpecialChar ? "✅" : "❌"}</p>
                    </>
                }
            </div>
        </div>
    );
}
