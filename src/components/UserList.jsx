// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/userService';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <div>
      <Typography variant="h4" gutterBottom>User List</Typography>
      <List>
        {users.map(user => (
          <ListItem key={user._id}>
            <ListItemText primary={`${user.firstName} ${user.lastName}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user._id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton edge="end" component={Link} to={`/users/${user._id}`}>
                Details
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
