  import React, { useEffect, useState } from 'react';
  import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Box, Typography, Paper } from '@mui/material';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import { useParams, useNavigate } from 'react-router-dom';
  import { createUser, getUserById, updateUser } from '../services/userService';

  // Create a custom theme with green color
  const theme = createTheme({
    palette: {
      primary: {
        main: '#388e3c', // Green
      },
      secondary: {
        main: '#a5d6a7', // Light green
      },
    },
  });

  const UserForm =  ({ user = {}}) => {
    const [formData, setFormData] = useState({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      primaryPhone: user.primaryPhone || '',
      secondaryPhone: user.secondaryPhone || '',
      email: user.email || '',
      website: user.website || '',
      companyName: user.companyName || '',
      profession: user.profession || '',
      city: user.city || '',
      country: user.country || '',
      postalCode: user.postalCode || '',
      socialLinks: {
        linkedIn: user.socialLinks?.linkedIn || '',
        tiktok: user.socialLinks?.tiktok || '',
        facebook: user.socialLinks?.facebook || '',
        snapchat: user.socialLinks?.snapchat || '',
        telegram: user.socialLinks?.telegram || '',
        instagram: user.socialLinks?.instagram || '',
        twitter: user.socialLinks?.twitter || '',
      },
    
      imageUrl: user.imageUrl || '',
      primaryColor: user.primaryColor || '#388e3c', // Default to green
      secondaryColor: user.secondaryColor || '#a5d6a7', // Default to light green
      shape: user.shape || 'square',
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      let isMounted = true;
    
      const fetchData = async () => {
        if (id) {
          try {
            const userData = await getUserById(id);
            if (isMounted) {
              setFormData(userData);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      };
    
      fetchData();
    
      return () => {
        isMounted = false;
      };
    }, [id]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.startsWith('socialLinks.')) {
        const socialLinkKey = name.split('.')[1];
        setFormData(prevState => ({
          ...prevState,
          socialLinks: {
            ...prevState.socialLinks,
            [socialLinkKey]: value
          }
        }));
      } else {
        setFormData(prevState => ({ ...prevState, [name]: value }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          if (id) {
            // Modification
            await updateUser(id, formData);
          } else {
            // Création
            console.log('====================================');
            console.log(formData);
            console.log('====================================');
            await createUser(formData);
          }
          //navigate('/'); // Redirection vers la liste des utilisateurs
        } catch (error) {
          console.error('Error submitting form:', error);
        }
    };

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ mt: 4, p: 2 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              User Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="primaryPhone"
                    label="Primary Phone"
                    value={formData.primaryPhone}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="secondaryPhone"
                    label="Secondary Phone"
                    value={formData.secondaryPhone}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="website"
                    label="Website"
                    value={formData.website}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="companyName"
                    label="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="profession"
                    label="Profession"
                    value={formData.profession}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="city"
                    label="City"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="country"
                    label="Country"
                    value={formData.country}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="postalCode"
                    label="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="socialLinks.linkedIn"
                    label="LinkedIn"
                    value={formData.socialLinks.linkedIn}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="socialLinks.tiktok"
                    label="TikTok"
                    value={formData.socialLinks.tiktok}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="socialLinks.facebook"
                    label="Facebook"
                    value={formData.socialLinks.facebook}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="socialLinks.snapchat"
                    label="Snapchat"
                    value={formData.socialLinks.snapchat}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="socialLinks.telegram"
                    label="Telegram"
                    value={formData.socialLinks.telegram}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="socialLinks.instagram"
                    label="Instagram"
                    value={formData.socialLinks.instagram}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="socialLinks.twitter"
                    label="Twitter"
                    value={formData.socialLinks.twitter}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="imageUrl"
                    label="Image URL"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="primaryColor"
                    label="Primary Color"
                    value={formData.primaryColor}
                    onChange={handleChange}
                    type="color"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="secondaryColor"
                    label="Secondary Color"
                    value={formData.secondaryColor}
                    onChange={handleChange}
                    type="color"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Shape</InputLabel>
                    <Select
                      name="shape"
                      value={formData.shape}
                      onChange={handleChange}
                      fullWidth
                    >
                      <MenuItem value="square">Square</MenuItem>
                      <MenuItem value="circle">Circle</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
          {id ? 'Update User' : 'Create User'}
        </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  };

  export default UserForm;
