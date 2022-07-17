import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import './styles/register.scss';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitError(false);
    try {
      // register http request
      const response = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      response.data && window.location.replace("/login");
      // console.log(response.data);
    } catch (err) {
      setSubmitError(true);
      // console.log(err);
    }
  };

  useEffect(() => {
    if (confirm !== password) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
    }

  }, [confirm]);

  return (
    <div className="register-container">
      <div className="register">
        <div className="title">Sign up</div>
        <form className="register-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="text" placeholder="Email" className="email-input" onChange={(e) => setEmail(e.target.value)} />
          <label>Username</label>
          <input type="text" placeholder="Username" className="username-input" onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" placeholder="Password" className="password-input" onChange={(e) => setPassword(e.target.value)} />
          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm Password" className="confirm-input" onChange={(e) => setConfirm(e.target.value)} />
          <div className="error-message">
            {confirmError && <span>Passwords didn't match.</span>}
            {submitError && <span>Something went wrong creating new account. Please try again later.</span>}
          </div>
          <Button type="submit" disabled={confirmError ? true : false}>Create Account</Button>
        </form>
        <Link to="/login" className='link'>
          <Button className='login-button'>Sign in</Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;