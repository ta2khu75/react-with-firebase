// src/components/Login.js
import { useState } from 'react';
import { auth, googleProvider } from '../config/Firebase';
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
    const [user, setUser] = useState<User>();
    const navigate = useNavigate()
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user?.email && user?.password) {
            try {
                await signInWithEmailAndPassword(auth, user.email, user.password);
                alert("Logged in successfully!");
                navigate("/firebase")
            } catch (error: any) {
                console.error("Error logging in:", error);
                alert(error?.message);
            }
        }
    };
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const handleLoginGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            navigate("/firebase")
        } catch (error) {
            console.log(error);
        }
    }

    console.log(auth.currentUser?.email);

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={(e) => handleLogin(e)}>
                <input
                    type="email"
                    name="email"
                    value={user?.email}
                    onChange={(e) => handleUserChange(e)}
                    placeholder="Email"
                /><br />
                <input
                    type="password"
                    value={user?.password}
                    name="password"
                    onChange={(e) => handleUserChange(e)}
                    placeholder="Password"
                /><br />
                <button type="submit">Login</button>
            </form>
            <button onClick={() => handleLoginGoogle()}>Login with google</button>
        </div>
    );
}

export default LoginComponent;
