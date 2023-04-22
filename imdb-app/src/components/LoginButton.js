import React, { useState } from 'react';

function LoginButton({ onSignIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error);
      } else {
        setSuccessMessage(data.message);
        setUsername('');
        setPassword('');
        setErrorMessage('');
        onSignIn(); // Call the onSignIn prop function
      }
    } catch (err) {
      setErrorMessage('Error signing in');
    }
  }

  return (
    <div>
      <h2>Sign In</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginButton;