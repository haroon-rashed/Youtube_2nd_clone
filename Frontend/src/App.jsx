import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './Component/Navbar/Navbar';
import Video from './Pages/Video/Video';
import Login from './Component/Login/Login';
import SignUp from './Component/Login/SignUp';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home/Home ';
import PrivateRoute from './Component/PrivateRoute';
import OtpVerification from './Component/otpVerification/otpVerification';


const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const location = useLocation();

  const hideNavbarPaths = ['/', '/signup', '/otp'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  console.log("Location path",location.pathname);
  return (
    <div>
      {shouldShowNavbar && <Navbar setSidebar={setSidebar} />}
      
      <Toaster />

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/otp' element={<OtpVerification />} />
        <Route path='/home' element={
          <PrivateRoute>
            <Home sidebar={sidebar} />
          </PrivateRoute>
        } />
        <Route path="/home/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
};

export default App;
