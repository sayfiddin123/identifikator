import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className="navbar container">
            <h1>
            <Link to="/">Logo</Link>
            </h1>
            <nav>
                <NavLink 
                    to="/" 
                    className={({ isActive }: { isActive: boolean }) => isActive ? "active" : ""}
                >
                    Asosiy
                </NavLink>
                <NavLink 
                    to="/about" 
                    className={({ isActive }: { isActive: boolean }) => isActive ? "active" : ""}
                >
                    Biz haqimizda
                </NavLink>
            </nav>
            <div className="auth">
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/register')}>Register</button>
            </div>
        </div>
    );
}

export default Navbar;
