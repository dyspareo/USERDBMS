import React from 'react';
import UserList from '../components/UserList';
import '../App.css';
const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="page-heading">User Management System</h1>
      <UserList />
    </div>
  );
};

export default HomePage;
