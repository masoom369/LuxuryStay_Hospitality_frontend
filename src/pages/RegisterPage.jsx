import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Alert from '../components/Alert';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    if (!result.success) {
      setAlert({ type: 'error', message: result.message });
    } else {
      setAlert({ type: 'success', message: 'Registration successful! You are now logged in.' });
      setName('');
      setEmail('');
      setPassword('');
      // Redirect to dashboard or home
    }
  };

  const closeAlert = () => setAlert(null);

  return (
    <div>
      <h2>Register</h2>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={closeAlert}
          autoClose={alert.type === 'success'}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
