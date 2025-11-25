import React, { useState } from 'react';

function PasswordReset({ users, onResetComplete, onBack }) {
  const [username, setUsername] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: enter username, 2: OTP verify, 3: new password
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const findUser = () => users.find((u) => u.username.toLowerCase() === username.toLowerCase());

  const handleSendOtp = () => {
    const user = findUser();
    if (!user) {
      setError('User not found');
      return;
    }
    if (user.role === 'admin') {
      setError('Admin password reset not supported here');
      return;
    }
    setError('');
    // Mock sending OTP: generate 6 digit code
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(generated);
    setOtpSent(true);
    setStep(2);
    // Simulate sending OTP by showing a message (in real app, send email or SMS)
    setMessage('OTP sent to email: ' + user.profile.email + ' and phone: ' + user.profile.phone);
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setError('');
      setStep(3);
      setMessage('OTP verified. Please enter your new password.');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResetPassword = () => {
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const user = findUser();
    if (user) {
      onResetComplete(user.username, newPassword);
      setMessage('Password reset successful. You can now log in with your new password.');
      setStep(4); // Completed
    } else {
      setError('Unexpected error: user not found.');
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      {step === 1 && (
        <>
          <div>
            <label>Username: </label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <button onClick={handleSendOtp}>Send OTP</button>
          <button onClick={onBack}>Back to Login</button>
        </>
      )}
      {step === 2 && (
        <>
          <p>{message}</p>
          <div>
            <label>Enter OTP: </label>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
          <button onClick={handleVerifyOtp}>Verify OTP</button>
          <button onClick={onBack}>Back to Login</button>
        </>
      )}
      {step === 3 && (
        <>
          <p>{message}</p>
          <div>
            <label>New Password: </label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <button onClick={handleResetPassword}>Reset Password</button>
          <button onClick={onBack}>Back to Login</button>
        </>
      )}
      {step === 4 && (
        <>
          <p>{message}</p>
          <button onClick={onBack}>Back to Login</button>
        </>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default PasswordReset;
