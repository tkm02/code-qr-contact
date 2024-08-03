// src/components/Page404.js
import React from 'react';
import { Typography, Container } from '@mui/material';

const Page404 = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
    </Container>
  );
};

export default Page404;
