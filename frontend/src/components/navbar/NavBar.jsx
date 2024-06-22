import { NavLink } from "react-router-dom";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../../assets/logo-new.png";
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

export default function NavBar() {

    const [id, setId] = useState('');

    const [username, setUsername] = useState("");

    const [length, setLength] = useState(0)

    const { authTokens } = useContext(AuthContext) || {};
    const { logoutUser } = useContext(AuthContext) || {};

    const token = localStorage.getItem("authTokens")

    const [navOpen, setNavOpen] = useState(false);

    const baseURL = 'https://donorconnect.pythonanywhere.com'

    useEffect(() => {
        if (authTokens && authTokens.access) {
            try {
                const decoded = jwtDecode(authTokens.access);
                if (decoded.username && decoded.user_id) {
                    setUsername(decoded.username);
                    setId(decoded.user_id);
                } else {
                    console.log("Username and id not found in the token");
                }
            } catch (error) {
                console.log("Error decoding token:", error);
            }
        }
    }, [authTokens]);

    useEffect(() => {
        async function fetchViewReqNum() {
            try {
                const response = await axios.get(`${baseURL}/api/requests/request/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    const len = response.data.filter(req => req.user !== id).length;
                    setLength(len);
                }
            } catch (error) {
                console.error('Error fetching view request number:', error);
            }
        }
        if (id) {
            fetchViewReqNum();
        }
    }, [id]);

    return (
        <header>
            <NavLink to="/">
                <div className="logo-container">
                    <img className="logo-img" src={logo} alt="Logo" />
                </div>
            </NavLink>

            {/* for large screens */}
            <nav className="nav-links-large">
                <NavLink to="/">Home</NavLink>
                {token === null ?
                    <>
                        <NavLink to="/register"><div className="register-link">Register</div></NavLink>
                        <NavLink to="/login"><div className="login-link">Login</div></NavLink>
                    </>
                    :
                    <>
                        <NavLink to="/add-request">Add Request</NavLink>
                        <NavLink to="/my-request">My Request</NavLink>
                        <NavLink to="/view-request"><span className="view-req-link">View Request<span className="view-request-badge">{length}</span></span></NavLink>
                        <NavLink to="/contact">Contact Us</NavLink>
                        <a onClick={logoutUser} style={{ cursor: "pointer" }}>Logout</a>
                    </>
                }
            </nav>
            {token !== null &&
                <div className="profile profile-icon-large">
                    <NavLink to="/my-profile">{username.charAt(0).toUpperCase()}</NavLink>
                </div>
            }

            {/* for small screens */}
            <div className="nav-container-small">
                <div className="hamburger-container" onClick={() => setNavOpen(prev => !prev)}>
                    {
                        navOpen ? <CloseIcon /> : <MenuIcon />
                    }
                    {
                        navOpen && (
                            <nav className="nav-links-small">
                                <NavLink to="/">Home</NavLink>
                                {token === null ?
                                    <>
                                        <NavLink to="/register">Register</NavLink>
                                        <NavLink to="/login">Login</NavLink>
                                    </>
                                    :
                                    <>
                                        <NavLink to="/add-request">Add Request</NavLink>
                                        <NavLink to="/my-request">My Request</NavLink>
                                        <NavLink to="/view-request"><span className="view-req-link">View Request<span className="view-request-badge">{length}</span></span></NavLink>
                                        <NavLink to="/contact">Contact Us</NavLink>
                                        <a onClick={logoutUser} style={{ cursor: "pointer" }}>Logout</a>
                                    </>
                                }
                            </nav>
                        )
                    }
                </div>
                {token !== null &&
                    <div className="profile profile-icon-small">
                        <NavLink to="/my-profile">{username.charAt(0).toUpperCase()}</NavLink>
                    </div>
                }
            </div>
        </header>
    );
}