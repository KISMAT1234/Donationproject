import React, { useState } from 'react';
import axiosUrl from '../url/Axiosurl';
import { useParams } from 'react-router-dom';

const PasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { id, token } = useParams();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } 
    axiosUrl.post(`/user/${id}/forgot/${token}`,{password}).then((response)=>{
      console.log(response);
    }).catch((err)=>{
      console.log(err);
    })
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="password">Password:</label>
        <input
        //   type="password"
          value={password}
          onChange={handlePasswordChange}
          className="bg-red-200 rounded"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
        //   type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="bg-red-200 rounded"

        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default PasswordForm;
