import React, { useState, useEffect } from 'react';

function MyProfile({ user, onUpdate }) {
  const [profile, setProfile] = useState({ ...user.profile });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setProfile({ ...user.profile });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(profile);
    setEditing(false);
    setMessage('Profile updated successfully.');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h2>My Profile</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <div>
        <label>Name: </label>
        {editing ? (
          <input name="name" value={profile.name || ''} onChange={handleChange} />
        ) : (
          <span>{profile.name}</span>
        )}
      </div>
      <div>
        <label>Email: </label>
        {editing ? (
          <input name="email" value={profile.email || ''} onChange={handleChange} />
        ) : (
          <span>{profile.email}</span>
        )}
      </div>
      <div>
        <label>Phone: </label>
        {editing ? (
          <input name="phone" value={profile.phone || ''} onChange={handleChange} />
        ) : (
          <span>{profile.phone}</span>
        )}
      </div>
      {user.role !== 'admin' && (
        <div>
          <label>Date of Birth: </label>
          {editing ? (
            <input name="dob" type="date" value={profile.dob || ''} onChange={handleChange} />
          ) : (
            <span>{profile.dob}</span>
          )}
        </div>
      )}
      {!editing ? (
        <button onClick={() => setEditing(true)}>Edit Profile</button>
      ) : (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default MyProfile;
