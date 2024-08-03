// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import { Container, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import Page404 from './components/Page404';
import {createUser} from './services/userService'

function App() {
  const handleUserSubmit = async (userData) => {
    try {
      const createdUser = await createUser(userData);
      console.log('User created successfully:', createdUser);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">QR Code Generator</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/new" element={<UserForm onSubmit={handleUserSubmit} />} />
          <Route path="/users/edit/:id" element={<UserForm />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
