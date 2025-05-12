import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

export const signupUser = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  console.log(response, "Response Data");
  console.log(response.data, "Response Data");
  const { token, user } = response.data;

  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user.id);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };



  return response.data; 
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
    console.log(response, "Response Data");
  console.log(response.data, "Response Data");
  const { token, user_id } = response.data;


  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user_id);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return response.data;
};

export const verifyUser = async (userData) => {
  const { user_id, otp } = userData;
  const response = await axios.post(`${API_URL}/verify/${user_id}`, { otp });

  const { token, user } = response.data;

  if (token && user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user.id);
  }

  return response.data;
};
