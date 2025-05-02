import React from 'react';
import './Navbar.css';
import menue from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search from '../../assets/search.png';
import upload from '../../assets/upload.png';
import more from '../../assets/more.png';
import notification from '../../assets/notification.png';
import profile from '../../assets/jack.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/'); 
  };

  return (
    <nav className='flex-div'>
      <div className='flex-div nav-left'>
        <img
          src={menue}
          onClick={() => setSidebar((prev) => !prev)}
          className='menu-icon'
          alt=''
        />
        <Link to={'/'}>
          <img src={logo} className='logo-icon' alt='' />
        </Link>
      </div>

      <div className='nav-middle flex-div'>
        <div className='search-box flex-div'>
          <input type='text' />
          <img src={search} className='search' alt='' />
        </div>
      </div>

      <div className='nav-right flex-div'>
        <img src={upload} className='upload-icon' alt='' />
        <img src={more} className='more-icon' alt='' />
        <img src={notification} className='notification-icon' alt='' />
        <img src={profile} className='profile-icon' alt='' />

      
        <button
          className='logout-btn'
          onClick={handleLogout}
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            backgroundColor: '#ff4d4f',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
