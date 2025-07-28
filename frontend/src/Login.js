import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/todos');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <input id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input id="password" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="submit" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
