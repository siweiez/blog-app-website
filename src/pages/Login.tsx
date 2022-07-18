import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Context } from '../context/Context';
import './styles/login.scss';

function Login() {
  const userRef = useRef<any>();
  const passwordRef = useRef<any>();
  const { state, dispatch } = useContext(Context);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      // login http request
      const response = await axios.post(process.env.REACT_APP_API_URL + "auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      // console.log(response.data);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      // console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="title">Sign in</div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" placeholder="Username" ref={userRef} />
          <label>Password</label>
          <input type="password" placeholder="Password" ref={passwordRef} />
          <Button type='submit' disabled={state.isFetching}>Sign in</Button>
        </form>
        <Link to="/register" className='link'>
          <Button className='register-button'>Create Account</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;