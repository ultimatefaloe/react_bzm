import React from 'react'
import { useAuth } from '../provider/AuthProvider';

const Profile = () => {
  const { auth } = useAuth();
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {auth?.fullName}</p>
      <p>Email: {auth?.email}</p>
      <img src="/favicon.svg" alt="Profile" />
    </div>
  )
}

export default Profile