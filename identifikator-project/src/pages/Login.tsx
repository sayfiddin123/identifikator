import React, { useState } from 'react';
import { login } from '../api/services/authService';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';


interface FormData {
  username: string;
  password: string;
}

interface Errors {
  username?: string | null;
  password?: string | null;
  general?: string | null;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = (): boolean => {
    const error: Errors = {};

    if (!formData.username) error.username = `Username ni to'ldiring`;
    if (!formData.password) error.password = `Password kiriting`;
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) return;

    setLoading(true); 

    try {
      await login(formData.username, formData.password);
      navigate('/');
    } catch  {
      setErrors({ general: `Login yoki parol xato` });
    } finally {
      setLoading(false);
    }

    setFormData({ username: '', password: '' });
  };

  return (
    <div className='login container'>
      <form onSubmit={handleSubmit}>
        <input
          name='username'
          value={formData.username}
          placeholder='Username...'
          onChange={handleChange}
          type="text"
        />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        <input
          name='password'
          value={formData.password}
          placeholder='Password...'
          onChange={handleChange}
          type="password" 
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
        <button type='submit'>{loading ? <TailSpin
  visible={true}
  height="100"
  width="100"
  color="red"
  ariaLabel="tail-spin-loading"
  radius="3"
  wrapperStyle={{}}
  wrapperClass=""
  /> : 'Login'} </button>
      </form>
    </div>
  );
}

export default Login;
