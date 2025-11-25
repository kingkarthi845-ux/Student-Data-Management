import React, { useState } from 'react';

const initialAdmin = {
  username: 'Karthi',
  password: 'Karthi@123',
  role: 'admin',
  profile: {
    email: 'admin@example.com',
    phone: '1234567890',
    name: 'Admin Karthi',
  },
  firstLogin: true,
};

const initialStaffs = [
  {
    username: 'S001',
    password: '2000-01-01', // DOB format YYYY-MM-DD for initial login
    role: 'staff',
    profile: {
      email: 'staff1@example.com',
      phone: '1112223333',
      name: 'Staff One',
      dob: '2000-01-01',
    },
  },
];

const initialStudents = [
  {
    username: 'ST001',
    password: '2005-05-15',
    role: 'student',
    profile: {
      email: 'student1@example.com',
      phone: '4445556666',
      name: 'Student One',
      dob: '2005-05-15',
    },
    attendance: [],
  },
];

function Login({ onLogin, onShowPasswordReset }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Mock user DB in component for demo
  const users = [initialAdmin, ...initialStaffs, ...initialStudents];

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    if (user) {
      setError('');
      onLogin(user);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Log In</button>
      </form>
      <p>
        <button
          type="button"
          onClick={() => onShowPasswordReset && onShowPasswordReset()}
          style={{ marginTop: '10px' }}
        >
          Forgot Password?
        </button>
      </p>
    </div>
  );
}

export default Login;
