import { Link } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from '../../context/AuthContext'

export default function LoginPageForm() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const { loginUser } = useContext(AuthContext) || {};

    const handleSubmit = async (e) => {
        e.preventDefault()
        loginUser(username, password);
    }

    return (
        <div className="form-main-container">
            <form className="form-container" onSubmit={handleSubmit}>
                <h1 className="form-heading">LOGIN</h1>
                <input type="text" name='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username*' required autoComplete="off" />
                <input type={showPassword ? "text" : "password"} name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder=' Password*' required autoComplete="off" />
                <div className="show-password">
                    <input type="checkbox" id="show-password-input" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                    <label id="show-password-label">Show Password</label>
                </div>
                <button type="submit" className="form-btn">Login</button>
            </form>
            <p className="reg-login-switch">Didn&apos;t have an account yet? <Link to="/register">Register</Link></p>
        </div>
    )
}