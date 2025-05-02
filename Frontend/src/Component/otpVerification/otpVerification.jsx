import { useState, useRef, useEffect } from 'react';
import './otpVerification.css';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { resetUser, verifyUserAsync } from '../../redux/userSlice';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(45);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, userError, userSuccess, userMessage } = useSelector((state) => state.auth);

  // fallback to localStorage if Redux state lost
  const userId = user?.user_id || localStorage.getItem('user_id');

  useEffect(() => {
    if (user?.user_id) {
      localStorage.setItem('user_id', user.user_id);
    }
  }, [user]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  useEffect(() => {
    if (userError) {
      toast.error(userMessage);
    }
    if (userSuccess) {
      toast.success(userMessage);
      navigate('/home');
    }
    dispatch(resetUser());
  }, [userError, userSuccess, userMessage, dispatch, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').trim();
    if (/^[0-9]{6}$/.test(pasteData)) {
      const pasteArray = pasteData.split('').slice(0, 6);
      setOtp(pasteArray);
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length < 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setIsSubmitting(true);
    await dispatch(verifyUserAsync({ user_id: userId, otp: enteredOtp }));
    setIsSubmitting(false);
  };

  const handleResendOtp = () => {
    setIsResendDisabled(true);
    setResendTimer(45);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
    toast.success('OTP code resent successfully!');
  };

  return (
    <div className="otp-container">
      <div className="otp-header">
        <svg className="otp-icon" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <h2>Verify your identity</h2>
        <p>We've sent a 6-digit code to your registered device</p>
      </div>

      <div className="otp-card">
        <form className="otp-form" onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`otp-digit ${error ? 'error' : digit ? 'filled' : ''}`}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {error && (
            <p className="otp-error">
              <svg className="error-icon" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`otp-submit ${isSubmitting ? 'submitting' : ''}`}
          >
            {isSubmitting ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>

        <div className="otp-resend">
          <div className="resend-divider">
            <span>Didn't receive code?</span>
          </div>
          <button
            onClick={handleResendOtp}
            disabled={isResendDisabled}
            className={`resend-button ${isResendDisabled ? 'disabled' : ''}`}
          >
            {isResendDisabled ? `Resend code in ${resendTimer}s` : 'Resend verification code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
