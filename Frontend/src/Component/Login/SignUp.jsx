
import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { signupUserAsync, resetUser } from '../../redux/userSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

     const { loading, userSuccess, userError, userMessage, user } = useSelector((state) => state.auth);


  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }

    if (userSuccess && user) {
      toast.success(userMessage);
      navigate('/otp'); 
    }

    dispatch(resetUser());
  }, [userSuccess, userError, userMessage, user, dispatch, navigate]);

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signupUserAsync({ name, email, password }));
  };

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/home');
      }
    }, [navigate]);

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>SignUp</div>
        <div className='underline'></div>
      </div>

      <form className='inputs' onSubmit={handleSignUp}>
        <div className='input'>
          <img src='/assets/person.png' alt='user' />
          <input type='text' placeholder='Name...' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className='input'>
          <img src='/assets/email.png' alt='email' />
          <input type='email' placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className='input'>
          <img src='/assets/password.png' alt='password' />
          <input type='password' placeholder='Password...' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className='submit-container'>
          <button className='submit' type='submit' disabled={loading} style={{ cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Signing up...' : 'SignUp'}
          </button>

          <Link to='/' className='submit' style={{ whiteSpace: 'nowrap', padding: '5px' }}>
            Have an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
