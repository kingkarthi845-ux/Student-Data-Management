import React, { useState, useEffect } from 'react';

function StudentForm({ existingStudent, onSave, onCancel }) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingStudent) {
      setUsername(existingStudent.username);
      setName(existingStudent.profile.name || '');
      setDob(existingStudent.profile.dob || '');
      setEmail(existingStudent.profile.email || '');
      setPhone(existingStudent.profile.phone || '');
    }
  }, [existingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !name || !dob || !email || !phone) {
      setError('All fields are required.');
      return;
    }
    // Basic email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }
    setError('');
    const newStudent = {
      username,
      password: dob, // Initial password = DOB as per requirement
      role: 'student',
      profile: {
        name,
        dob,
        email,
        phone,
      },
      attendance: [],
    };
    onSave(newStudent);
  };

  return (
    <div>
      <h2>{existingStudent ? 'Edit Student' : 'Add Student'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username (Roll No): </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!!existingStudent}
            required
          />
        </div>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Date of Birth (DOB): </label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Phone: </label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button type="submit">{existingStudent ? 'Update Student' : 'Add Student'}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
