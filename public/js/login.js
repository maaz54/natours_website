/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Login successful');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }

    console.log(res.data); // Ensure this logs the expected response
  } catch (err) {
    console.error('An error occurred'); // Better error handling
    showAlert('error', 'An error occurred');
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    if ((res.data.status = 'success')) {
      locations.reload(true);
    }
  } catch (err) {
    showAlert('error', 'An error occurred');
  }
};
