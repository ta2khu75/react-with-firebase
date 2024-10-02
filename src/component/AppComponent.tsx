import { Link, NavLink } from "react-router-dom"
import { auth } from "../config/Firebase"

const AppComponent = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container d-flex justify-content-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className={"nav-link"} to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={"nav-link"} to="/todo">Todo</NavLink>
                        </li>
                        {!auth.currentUser?.uid && <>
                            <li className="nav-item">
                                <NavLink className={"nav-link"} to="/">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={"nav-link"} to="/register">register</NavLink>
                            </li>
                        </>
                        }
                    </ul>
                </div>
            </nav>

            <nav style={{ display: "flex" }}>
                <div style={{ marginRight: "50px" }}>
                </div>
                <div style={{ marginRight: "50px" }}>
                </div>
                <div style={{ marginRight: "50px" }}>
                </div>
                <div style={{ marginRight: "50px" }}>
                </div>
            </nav>
        </>
    )
}

export default AppComponent