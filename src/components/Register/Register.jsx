
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";
import './Register.css';
function Register() {

    const { toast } = useContext(UserContext);
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        location: "",
        description: "",
        occupation: "",
        login_name: "",
        password: ""
    });


    const [cfPassword, setCfPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
        if (user.password !== cfPassword) {
            toast("Xác nhận mật khẩu không khớp!");
            return;
        }
        try {
            const userStr = JSON.stringify(user);
            console.log(userStr);
            const res = await fetch(
                "http://localhost:8080/admin/user",
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(user)
                },
            );
            const result = await res.json();
            toast(result.msg);

            if (res.status) {
                setUser({
                    first_name: "",
                    last_name: "",
                    location: "",
                    description: "",
                    occupation: "",
                    login_name: "",
                    password: ""
                });

                setCfPassword("");
            }

        } catch (err) {
            console.log(err);
        }


    }

    return (
        <div className="wrapper">
            <div className="form-box register">
                <form action="" onSubmit={handleLogin}>
                    <h1>Registration</h1>

                    <div className="name">
                        <input type="text" placeholder="Your firstname" required
                            value={user.first_name}
                            onChange={(event) => setUser((prev) => ({ ...prev, first_name: event.target.value }))} />
                        <input type="text" placeholder="Your lastname" required
                            value={user.last_name}
                            onChange={(event) => setUser((prev) => ({ ...prev, last_name: event.target.value }))} />
                    </div>

                    <div className="input-box">
                        <input type="text" placeholder="Your address"
                            value={user.location}
                            onChange={(event) => setUser((prev) => ({ ...prev, location: event.target.value }))} />
                    </div>

                    <div className="input-box">
                        <input type="text" placeholder="Your occupation"
                            value={user.occupation}
                            onChange={(event) => setUser((prev) => ({ ...prev, occupation: event.target.value }))} />
                    </div>

                    <div className="input-box">
                        <input type="text" placeholder="Introduce yourself"
                            value={user.description}
                            onChange={(event) => setUser((prev) => ({ ...prev, description: event.target.value }))} />
                    </div>

                    <div className="input-box">
                        <input type="text" placeholder="Username" required autoComplete="username"
                            value={user.login_name}
                            onChange={(event) => setUser((prev) => ({ ...prev, login_name: event.target.value }))} />
                        <FaUser className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Password" required autoComplete="new-password"
                            value={user.password}
                            onChange={(event) => setUser((prev) => ({ ...prev, password: event.target.value }))} />
                        <FaLock className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Confirm password" required autoComplete="new-password"
                            value={cfPassword}
                            onChange={(event) => setCfPassword(event.target.value)} />
                        <FaLock className="icon" />
                    </div>

                    <button type="submit">Register me</button>

                    <div className="register-login-link">
                        <p>Do you already have an account?</p>
                        <Link to={"/login"} className="link">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register;