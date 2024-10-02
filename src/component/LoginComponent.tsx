import { useState } from 'react';
import { auth, googleProvider } from '../config/Firebase';
import { signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function LoginComponent() {
    const [user, setUser] = useState<User>();
    const navigate = useNavigate()
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user?.email && user?.password) {
            try {
                await signInWithEmailAndPassword(auth, user.email, user.password);
                navigate("/todo")
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
            navigate("/todo")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 ">
                                <h3 className="mb-5 text-center">Sign in</h3>
                                <form onSubmit={(e) => handleLogin(e)}>
                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                        <input value={user?.email} name='email' onChange={(e) => handleUserChange(e)} type="email" id="typeEmailX-2" className="form-control form-control-lg" />
                                    </div>
                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                        <input value={user?.password} name='password' onChange={(e) => handleUserChange(e)} type="password" id="typePasswordX-2" className="form-control form-control-lg" />
                                    </div>
                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary mb-4 btn-lg btn-block" type="submit">Login</button>
                                </form>
                                <p>Not a member? <Link to="/register">Register</Link></p>
                                <hr className="my-4" />
                                <button onClick={() => handleLoginGoogle()} data-mdb-button-init data-mdb-ripple-init className="btn w-100 btn-lg btn-block btn-primary" style={{ backgroundColor: '#dd4b39' }} type="submit"><i className="fab fa-google me-2" /> Sign in with google</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginComponent;
