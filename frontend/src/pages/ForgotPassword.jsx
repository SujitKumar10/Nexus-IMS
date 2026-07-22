import { Link } from "react-router-dom";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
  return (
    <div className="forgot-container">

      <div className="forgot-card">

        <h2>Forgot Password</h2>

        <p>
          Enter your registered email address and we'll send you a password reset link.
        </p>

        <form>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <button type="submit">
            Send Reset Link
          </button>

        </form>

        <p className="back-login">
          <Link to="/">← Back to Login</Link>
        </p>

      </div>

    </div>
  );
}

export default ForgotPassword;