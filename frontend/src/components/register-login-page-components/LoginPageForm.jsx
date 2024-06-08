import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from '../../context/AuthContext'

export default function LoginPageForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const { loginUser } = useContext(AuthContext) || {};

    const handleSubmit = async (e) => {
        e.preventDefault()
        loginUser(username, password);
    }

    return (
        <div className="login-page-form-container">
            <h1 className="login-page-heading">LOG IN...</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Username</label>
                <br />
                <input
                    type="text"
                    name='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Enter your Username'
                    required
                />
                <br />
                <label>Password</label>
                <br />
                <input
                    type={showPassword ? "text" : "password"}
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=' Enter your Password'
                    required
                />
                <div className="show-password">
                    <input
                        type="checkbox"
                        id="show-password-input"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)
                        }
                    />
                    <label id="show-password-label">Show Password</label>
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>
            <p className="no-acc">Didn&apos;t have an account yet? <Link to="/register">Register</Link></p>
        </div>
    )
}
