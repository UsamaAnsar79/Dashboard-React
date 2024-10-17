


import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    navigate('/dashboard');
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-secondary">
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h3 className="card-title text-center mb-4">Welcome Back!</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p>Don't have an account? <a href="/signup">Sign Up here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

