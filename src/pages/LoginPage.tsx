import { Link, useNavigate } from "react-router-dom";
import useAuth from "../store/auth";
import Login from "../types/login";
import Cookies from "js-cookie";

import "../css/login.css";
import { TOKEN, USER } from "../constants";
import request from "../server";
import User from "../types/user";
import useSkill from "../store/skill";

const LoginPage = () => {
  // const { login } = useAuth();
  const login = useAuth((state) => state.login);
  const setUser = useSkill((state) => state.setUser);

  const navigate = useNavigate();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: Login = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };
    const {
      data: { token, user },
    } = await request.post<{ token: string; user: User }>(
      "auth/login",
      userData
    );

    Cookies.set(TOKEN, token);
    localStorage.setItem(USER, JSON.stringify(user));

    navigate("/dashboard");
    location.reload();
    setUser(user);
    login(user);
  };
  return (
    // <form onSubmit={submit}>
    //   <input type="text" name="username" />
    //   <input type="text" name="password" />
    //   <button type="submit">Login</button>
    // </form>
    <div className="login-body">
      <div className="container" id="container">
        <div className="form-container sign-in">
          <form onSubmit={submit}>
            <h1>Sign In</h1>
            <input type="text" placeholder="Username" name="username" />
            <input type="password" placeholder="Password" name="password" />
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login">
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <Link to="/register">
                <button className="hidden" id="register">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
