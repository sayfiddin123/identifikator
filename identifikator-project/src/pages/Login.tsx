import React, { useState } from 'react';
import { login } from '../api/services/authService';
import '../App.css';

interface FormData {
  username: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await login(formData.username, formData.password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <div className='login container'>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Emblem_of_Uzbekistan.svg/1200px-Emblem_of_Uzbekistan.svg.png" alt="" />
        <div className='form-group'>
          <label htmlFor="username">Username</label>
          <input onChange={handleChange} type="text" id='username' />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input onChange={handleChange} type="password" name='password' id='password' />
        </div>
         <button type='submit'>Sign in</button>
      </form>
    </div>
  )
}

export default Login