import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/api'; // Import API functions
import UserForm from './UserForm';
import '../App.css'; // Import styles

const UserList = () => {
  const [users, setUsers] = useState([]); // State to hold user data
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleSave = () => {
    setSelectedUser(null);
    setIsEditing(false);
    fetchUsers();
  };

  return (
    <div className="user-list-container">
      <h1 className="user-list-title">User List</h1>
      {isEditing ? (
        <UserForm user={selectedUser} onSave={handleSave} />
      ) : (
        <div>
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id} className="user-list-item">
                <span className="user-name">
                  {user.name} ({user.email})
                </span>
                <div className="user-actions">
                  <button className="edit-btn" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="add-user-btn" onClick={() => setIsEditing(true)}>
            Add New User
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
