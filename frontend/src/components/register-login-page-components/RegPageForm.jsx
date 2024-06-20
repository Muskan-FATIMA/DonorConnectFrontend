import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from '../../context/AuthContext';

export default function RegPageForm() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { registerUser } = useContext(AuthContext) || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await registerUser(email, username, password, password2);
        if (result.success) {
            navigate('/login');
        } else {
            setErrors(result.errors);
        }
    };

    return (
        <div className="form-main-container">
            <form className="form-container" onSubmit={handleSubmit}>
                <h1 className="form-heading">CREATE NEW ACCOUNT</h1>
                <input type="text" value={username} placeholder="Username*" onChange={e => setUsername(e.target.value)} name='username' required />
                {errors.username && <p id="error-text">{errors.username}</p>}
                <input type="email" placeholder="Email*" value={email} onChange={e => setEmail(e.target.value)} name='email' required />
                {errors.email && <p id="error-text">{errors.email}</p>}
                <input type={showPassword ? "text" : "password"} value={password} placeholder="Password*" onChange={e => setPassword(e.target.value)} name='password' required />
                <input type={showPassword ? "text" : "password"} value={password2} placeholder="Re-enter Password*" onChange={e => setPassword2(e.target.value)} name='password2' required />
                {errors.password && <p id="error-text">{errors.password}</p>}
                <div className="show-password">
                    <input type="checkbox" id="show-password-input" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                    <label id="show-password-label">Show Passwords</label>
                </div>
                <button type="submit" className="form-btn">Register</button>
            </form>

            <p className="reg-login-switch">Already have an account? <Link to="/login">LogIn</Link></p>

        </div>);
}
