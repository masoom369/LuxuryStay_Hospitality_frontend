import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Alert from '../components/Alert';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (!result.success) {
      setAlert({ type: 'error', message: result.message });
    } else {
      setAlert({ type: 'success', message: 'Login successful!' });
      // Redirect or update UI accordingly
    }
  };

  const closeAlert = () => setAlert(null);

  return (
    <div>
      <h2>Login</h2>
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
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
