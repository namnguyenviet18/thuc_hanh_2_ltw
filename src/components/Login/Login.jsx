
import { FaUser, FaLock } from "react-icons/fa";
import './Login.css';
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

function Login() {
    const { notify, setIsLogin } = useContext(UserContext);
    const [user, setUser] = useState({
        login_name: "",
        password: ""
    });

    const navigation = useNavigate();



    const handleLogin = async (event) => {
        event.preventDefault();

        try {

            const res = await fetch(
                "http://localhost:8080/admin/login",
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(user)
                }
            );

            const result = await res.json();

            if (res.ok) {
                notify("Đăng nhập thành công");
                localStorage.setItem('token', result.userToken);
                localStorage.setItem('user', JSON.stringify(result.other));
                setIsLogin(true);
                navigation('/', { replace: true });
                setUser({
                    login_name: "",
                    password: ""
                });
            }

        } catch (err) {
            notify("Mất kết nối tới máy chủ");
        }

    }
    return (

        <div className="wrapper-login">
            <div className="form-box login">
                <form action="" onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required
                            value={user.login_name}
                            onChange={(event) => setUser((prev) => ({ ...prev, login_name: event.target.value }))}
                            autoComplete="username" />
                        <FaUser className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Password" required
                            value={user.password}
                            onChange={(event) => setUser((prev) => ({ ...prev, password: event.target.value }))}
                            autoComplete="new-password" />
                        <FaLock className="icon" />
                    </div>
                    <div className="remembar-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <p>Forgot password</p>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-login-link">
                        <p>Don't have an account?</p>
                        <Link to={"/register"} className="link">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;