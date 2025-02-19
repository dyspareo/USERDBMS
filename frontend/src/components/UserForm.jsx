import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../services/api';
import '../App.css';

const UserForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    } else {
      setFormData({ name: '', email: '' }); // Reset form when no user selected
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      await updateUser(user.id, formData);
    } else {
      await createUser(formData);
      setFormData({ name: '', email: '' }); // Reset form after adding new user
    }

    onSave();
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-btn">
        {user ? 'Update User' : 'Create User'}
      </button>
    </form>
  );
};

export default UserForm;
