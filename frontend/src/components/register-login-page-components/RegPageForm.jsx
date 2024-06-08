import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import { AuthContext } from '../../context/AuthContext'

export default function RegPageForm() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const { registerUser } = useContext(AuthContext) || {};

    const handleSubmit = async e => {
        e.preventDefault()
        registerUser(email, username, password, password2)
    }

    return (
        <div className="register-page-form-container">
            <h1 className="register-page-heading">CREATE NEW ACCOUNT</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="email" placeholder="Enter Email-id"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name='email'
                    required
                />
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    placeholder="Enter Username"
                    onChange={e => setUsername(e.target.value)}
                    name='username'
                    required
                />
                <label>Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Enter Password"
                    onChange={e => setPassword(e.target.value)}
                    name='password'
                    required
                />
                <label>Confirm Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    value={password2}
                    placeholder="Re-enter Password"
                    onChange={e => setPassword2(e.target.value)}
                    name='password2'
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
                    <label id="show-password-label">Show Passwords</label>
                </div>
                <center>
                    <button type="submit" className="register-btn">REGISTER</button>
                </center>
            </form>
            <p className="already-acc">Already have an account? <Link to="/login">Log In</Link></p>
        </div>
    )
}
