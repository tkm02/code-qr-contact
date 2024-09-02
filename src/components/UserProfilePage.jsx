import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../services/userService';
import './style/UserProfilePage.css';

const UserProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(id);
      setUser(userData);
    };
    fetchUser();
  }, [id]);

  const handleSaveContact = () => {
    // Créer un objet vCard
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:${user.lastName};${user.firstName};;;
FN:${user.firstName} ${user.lastName}
TEL;TYPE=HOME,VOICE:${user.personalPhone}
TEL;TYPE=WORK,VOICE:${user.professionalPhone || ''}
EMAIL;TYPE=HOME,INTERNET:${user.personalEmail}
EMAIL;TYPE=WORK,INTERNET:${user.professionalEmail || ''}
URL:${user.website || ''}
ORG:${user.companyName || ''}
TITLE:${user.profession || ''}
ADR;TYPE=WORK:;;${user.city || ''};${user.country || ''};${user.postalCode || ''}
NOTE:${user.bio || ''}
${Object.entries(user.socialLinks || {})
  .filter(([_, value]) => value)
  .map(([key, value]) => `X-SOCIAL-${key.toUpperCase()}:${value}`)
  .join('\n')}
END:VCARD`;;

    // Créer un blob et un lien de téléchargement
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${user.firstName}_${user.lastName}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user) return <div>Chargement...</div>;

  return (
    <div className="user-profile">
      <img src={user.profileImageUrl} alt={`${user.firstName} ${user.lastName}`} className="profile-image" />
      <h1>{user.firstName} {user.lastName}</h1>
      <p className="position">{user.position} chez {user.companyName}</p>
      <p className="bio">{user.bio}</p>
      
      <div className="contact-info">
        <h2>Coordonnées</h2>
        <p>Tél. personnel : {user.personalPhone}</p>
        <p>Tél. professionnel : {user.professionalPhone}</p>
        <p>Email personnel : {user.personalEmail}</p>
        <p>Email professionnel : {user.professionalEmail}</p>
        <p>Site web : {user.website}</p>
        <p>Adresse : {user.city}, {user.country}, {user.postalCode}</p>
      </div>
      
      <div className="social-links">
        <h2>Réseaux sociaux</h2>
        {user.socialLinks.linkedIn && <a href={user.socialLinks.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
        {user.socialLinks.twitter && <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
        {user.socialLinks.facebook && <a href={user.socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
        {user.socialLinks.instagram && <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
      </div>
      
      <button onClick={handleSaveContact} className="save-contact-btn">Enregistrer le contact</button>
    </div>
  );
};

export default UserProfilePage;