import { Link } from "react-router-dom";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from "../../assets/logo-new.png";
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

function NavBar() {
    const [navOpen, setNavOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [id, setId] = useState('');
    const [length, setLength] = useState(0)

    const { authTokens } = useContext(AuthContext) || {};
    const { logoutUser } = useContext(AuthContext) || {};

    const token = localStorage.getItem("authTokens")

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
                const response = await axios.get('http://127.0.0.1:8000/api/requests/request/', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 200) {
                    const len = response.data.filter(req => req.user !== id).length;
                    setLength(len);
                }
            } catch (error) {
                console.log("Error fetching view requests:", error);
            }
        }
        if (id) {
            fetchViewReqNum();
        }
    }, [id]);

    return (
        <header>
            <Link to="/">
                <div className="logo-container">
                    <img className="logo-img" src={logo} alt="Logo" />
                </div>
            </Link>

            {/* for large screens */}
            <nav className="nav-links-large">
                <Link to="/">Home</Link>
                <Link to="/educational-resources">Educational Resources</Link>
                {token === null ?
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>
                    :
                    <>
                        <Link to="/add-request">Add Request</Link>
                        <Link to="/view-request">View Request<div className="view-request-badge">{length}</div></Link>
                        <a onClick={logoutUser} style={{ cursor: "pointer" }}>Logout</a>
                    </>
                }
                <a href="/contact">Contact Us</a>
            </nav>
            {token !== null &&
                <div className="profile-icon-large">
                    <Link to='/my-profile'>
                        {username.charAt(0).toUpperCase()}
                    </Link>
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
                                <Link to="/">Home</Link>
                                <Link to="/educational-resources">Educational Resources</Link>
                                {token === null ?
                                    <>
                                        <Link to="/register">Register</Link>
                                        <Link to="/login">Login</Link>
                                    </>
                                    :
                                    <>
                                        <Link to="/add-request">Add Request</Link>
                                        <Link to="/view-request">View Request</Link>
                                        <a onClick={logoutUser} style={{ cursor: "pointer" }}>Logout</a>
                                    </>
                                }
                                <a href="#contact">Contact Us</a>
                            </nav>
                        )
                    }
                </div>
            </div>
        </header>
    );
}

export default NavBar;
