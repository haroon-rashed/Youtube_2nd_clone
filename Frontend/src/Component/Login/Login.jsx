import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, resetUser } from '../../redux/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, userSuccess, userError, userMessage, loading } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in both email and password');
      return;
    }
    dispatch(loginUserAsync({ email, password }));
  };

  useEffect(() => {
    if (userSuccess && user) {
      toast.success(userMessage || 'Login successful');
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
      dispatch(resetUser());
    }

    if (userError) {
      toast.error(userMessage || 'Login failed');
      dispatch(resetUser());
    }
  }, [userSuccess, userError, userMessage, user, navigate, dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>

      <form className='inputs' onSubmit={handleLogin}>
        <div className='input'>
          <img src='/assets/email.png' alt='email' />
          <input
            type='email'
            placeholder='Email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='input'>
          <img src='/assets/password.png' alt='password' />
          <input
            type='password'
            placeholder='Password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className='submit-container'>
          <button
            className='submit'
            type='submit'
            disabled={loading}
            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <Link to='/signup' className='submit' style={{ whiteSpace: 'nowrap', padding: '5px' }}>
            Create new account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
