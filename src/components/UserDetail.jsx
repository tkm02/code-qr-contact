import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserById, downloadQRCode } from '../services/userService';
import { Typography, Button, Grid } from '@mui/material';
import './style/UserDetail.css'; // Import the new CSS file

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
    <div className="paper-detail">
      <div className='detail'>
        <div className="grid-container-detail">
          <div className="grid-item-qr-detail">
            <img src={user.qrCodeUrl} alt="User QR Code" />
          </div>
          <div className="grid-item-info-detail">
            <div className='item-info'>
              <div className="typography"><strong>Nom :</strong> {user.lastName}</div>
              <div className="typography"><strong>Prénoms :</strong> {user.firstName}</div>
              <div className="typography"><strong>Pays :</strong> {user.country}</div>
              <div className="typography"><strong>Ville :</strong> {user.city}</div>
              <div className="typography"><strong>Téléphone :</strong> {user.primaryPhone}</div>
            </div>
            <div className='item-info'>
              <div className="typography"><strong>Code postal :</strong> {user.postalCode}</div>
              <div className="typography"><strong>Email :</strong> {user.email}</div>
              <div className="typography"><strong>Site web :</strong> {user.website}</div>
              <div className="typography"><strong>Entreprise :</strong> {user.companyName}</div>
              <div className="typography"><strong>Profession :</strong> {user.profession}</div>
            </div>
          </div>
        </div>
        <div className="button-container-detail">
          <button  onClick={() => handleDownloadQRCode('png')}>Download QR Code (PNG)</button>
          <button onClick={() => handleDownloadQRCode('jpeg')}>Download QR Code (JPEG)</button>
          <button  onClick={() => handleDownloadQRCode('jpg')}>Download QR Code (JPG)</button>
        </div>
        <div className="button-container-detail">
          <Link  to={`/users/edit/${user._id}`}>Edit</Link>
        </div>
      </div>

    </div>
  );
};

export default UserDetail;
