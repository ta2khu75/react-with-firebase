import { Link, NavLink } from "react-router-dom"

const AppComponent = () => {

    return (
        <nav style={{ display: "flex" }}>
            <div style={{ marginRight: "50px" }}>
                <NavLink to="/">Home</NavLink>
            </div>
            <div style={{ marginRight: "50px" }}>
                <NavLink to="/about">About</NavLink>
            </div>
            <div style={{ marginRight: "50px" }}>
                <NavLink to="/contact">Contact</NavLink>
            </div>
            <div style={{ marginRight: "50px" }}>
                <NavLink to="/contact">Contact</NavLink>
            </div>
            <div style={{ marginRight: "50px" }}>
                <NavLink to="/login">Login</NavLink>
            </div>
            <div style={{ marginRight: "50px" }}>
                <NavLink to="/register">register</NavLink>
            </div>
        </nav>
    )
}

export default AppComponent