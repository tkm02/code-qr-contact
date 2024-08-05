import React from 'react';
import './style/QRCard.css';
import { Link } from 'react-router-dom';

const QRCard = ({ user }) => {
  console.log(user);

  return (
    <div className="paper">
      <div className="grid-container">
        <div className="grid-item-qr">
          <img src={user.qrCodeUrl} alt="User QR Code" />
        </div> 
        <div className="grid-item-info">
          <div className="typography"><strong>Nom :</strong> {user.lastName}</div>
          <div className="typography"><strong>Prénoms :</strong> {user.firstName}</div>
          <div className="typography"><strong>Pays :</strong> {user.country}</div>
          <div className="typography"><strong>Ville :</strong> {user.city}</div>
          <div className="typography"><strong>Téléphone :</strong> {user.primaryPhone}</div>
          <div className="typography"><strong>Code postal :</strong> {user.postalCode}</div>
          <Link className="button-container" to={`/users/${user._id}`}>
                Details
            </Link>
          
        </div>
      </div>
    </div>
  );
};

export default QRCard;
