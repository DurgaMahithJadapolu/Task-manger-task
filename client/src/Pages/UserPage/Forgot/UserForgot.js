import React, { useState } from 'react';
import axios from 'axios';

function UpdatePasswordForm() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/user/forgot-password', {
        email,
        newPassword
      });

      setMessage(response.data.message); // Show success message
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message); // Show error message from backend
      } else {
        setError('Something went wrong.');
      }
    }
  };

  return (
    <div>
         {error && <p style={{ color: 'red' }}>{error}</p>}
         {message && <p style={{ color: 'green' }}>{message}</p>}
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Password</button>
      </form>

     
    </div>
  );
}

export default UpdatePasswordForm;
