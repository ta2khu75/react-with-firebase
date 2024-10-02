import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react";
import { auth } from "../config/Firebase";
import { Link, useNavigate } from "react-router-dom";

const RegisterComponent = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [errorPassword, setErrorPassword] = useState(false)
    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user?.email && user?.password && confirmPassword) {
            if (user.password === confirmPassword) {
                try {
                    await createUserWithEmailAndPassword(auth, user.email, user.password);
                    alert("Register in successfully!");
                    navigate("/login")
                } catch (error: any) {
                    console.error("Error register in:", error);
                    alert(error?.message);
                }
            } else {
                setErrorPassword(true);
            }
        }
    };
    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <section className="vh-100 bg-image" style={{ backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp")' }}>
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: 15 }}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                        <form onSubmit={(e) => handleRegisterSubmit(e)}>
                                            {errorPassword && <p className="text-danger">Password not match</p>}
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                                <input type="email" onChange={(e) => handleUserChange(e)} name="email" id="form3Example3cg" className="form-control form-control-lg" />
                                            </div>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                                <input type="password" onChange={(e) => handleUserChange(e)} name="password" id="form3Example4cg" className="form-control form-control-lg" />
                                            </div>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                                                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} id="form3Example4cdg" className="form-control form-control-lg" />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                            </div>
                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/" className="fw-bold text-body"><u>Login here</u></Link></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default RegisterComponent