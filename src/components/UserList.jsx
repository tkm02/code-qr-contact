// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/userService';
import QRCard from './QRCard';
import './style/UserList.css';
import { Pagination } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getAllUsers();
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user._id !== id));
  };

  return (
    <div className="container-list">
      <h4 className="title">Listes QR code</h4>
      <div className="grid-container-list">
        {users.map((user, index) => (
          <div className="grid-item-list" key={index}>
            <QRCard user={user} />
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination count={10} color="primary" />
      </div>
    </div>
  );
};

export default UserList;
