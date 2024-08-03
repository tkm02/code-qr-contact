import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserById, downloadQRCode } from '../services/userService';
import { Typography, Button, Grid } from '@mui/material';

const UserDetail = () => {
const { id } = useParams();
const [user, setUser] = useState(null);

useEffect(() => {
const fetchUser = async () => {
const fetchedUser = await getUserById(id);
console.log(fetchedUser);
setUser(fetchedUser);
};

fetchUser();
}, [id]);

const handleDownloadQRCode = async (format) => {
await downloadQRCode(id, format);
};

if (!user) return <div>Loading...</div>;

return (
<div>
<Typography variant="h4" gutterBottom>User Details</Typography>
<Grid container spacing={2}>
<Grid item xs={12}>
<Typography variant="h6">  Name: {user.firstName} {user.lastName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Primary Phone: {user.primaryPhone}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Secondary Phone: {user.secondaryPhone}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Email: {user.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Website: {user.website}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Company: {user.companyName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Profession: {user.profession}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">City: {user.city}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Country: {user.country}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Postal Code: {user.postalCode}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Primary Color: {user.primaryColor}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Secondary Color: {user.secondaryColor}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Shape: {user.shape}</Typography>
        </Grid>
        <Grid item xs={12}>
          <img src={user.qrCodeUrl} alt="User QR Code" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={() => handleDownloadQRCode('png')}>Download QR Code (PNG)</Button>
          <Button variant="contained" color="primary" onClick={() => handleDownloadQRCode('jpeg')}>Download QR Code (JPEG)</Button>
          <Button variant="contained" color="primary" onClick={() => handleDownloadQRCode('jpg')}>Download QR Code (JPG)</Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component={Link} to={`/users/edit/${user._id}`}>Edit</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDetail;
