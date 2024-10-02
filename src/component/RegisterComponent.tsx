import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react";
import { auth } from "../config/Firebase";

const RegisterComponent = () => {
    const [user, setUser] = useState<User>();
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(user);

        if (user?.email && user?.password) {
            try {
                await createUserWithEmailAndPassword(auth, user.email, user.password);
                alert("Register in successfully!");
            } catch (error: any) {
                console.error("Error register in:", error);
                alert(error?.message);
            }
        }
    };
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <h2>Register</h2>
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
                    name="password"
                    value={user?.password}
                    onChange={(e) => handleUserChange(e)}
                    placeholder="Password"
                /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default RegisterComponent