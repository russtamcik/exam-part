import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="container" id="container">
      <div className="form-container sign-up">
        <form>
          <h1>Create Account</h1>
          <span>or use your email for registeration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
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
          <Link to="/login">
            <button className="hidden" id="register">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
