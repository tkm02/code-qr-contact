import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createUser, getUserById, updateUser } from '../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css' 
import './style/UserForm.css';

const UserForm = ({ user = {} }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    personalPhone: user.personalPhone || '',
    professionalPhone: user.professionalPhone || '',
    personalEmail: user.personalEmail || '',
    professionalEmail: user.professionalEmail || '',
    website: user.website || '',
    companyName: user.companyName || '',
    profession: user.profession || '',
    bio: user.bio || '',
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
    profileImageUrl: user.profileImageUrl || '',
    primaryColor: user.primaryColor || '#000000',
    secondaryColor: user.secondaryColor || '#ffffff',
    qrCodeShape: user.qrCodeShape || 'square',
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
      setFormData((prevState) => ({
        ...prevState,
        socialLinks: {
          ...prevState.socialLinks,
          [socialLinkKey]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateUser(id, formData);
        toast.success('Mise à jour réussie');
      } else {
        await createUser(formData);
        toast.success('QR code créé avec succès!');
      }
      navigate('/');
    } catch (error) {
      toast.error('Erreur');
      console.error('Erreur submitting form:', error);
    }
  };

  return (
    <div className="container-form">
      <div className='form'>
        {/* Personal Information Section */}
        <div className='section-form'>
          <h3>Informations personnelles</h3>
          <div className='content-form'>
            <div className='col-form'>
              <div className="grid-item-form">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid-item-form">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='col-form'>
              <div className="grid-item-form">
                <textarea
                  name="bio"
                  placeholder="Biographie"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className='section-form'>
          <h3>Contact</h3>
          <div className='content-form'>
            <div className='col-form'>
              <div className="grid-item-form">
                <input
                  type="tel"
                  name="personalPhone"
                  placeholder="Numéro personnel"
                  value={formData.personalPhone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid-item-form">
                <input
                  type="tel"
                  name="professionalPhone"
                  placeholder="Numéro professionnel"
                  value={formData.professionalPhone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='col-form'>
              <div className="grid-item-form">
                <input
                  type="email"
                  name="personalEmail"
                  placeholder="Email personnel"
                  value={formData.personalEmail}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid-item-form">
                <input
                  type="email"
                  name="professionalEmail"
                  placeholder="Email professionnel"
                  value={formData.professionalEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='col-form'>
              <div className="grid-item-form">
                <input
                  type="url"
                  name="website"
                  placeholder="Site web"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
              <div className="grid-item-form">
                <input
                  type="url"
                  name="profileImageUrl"
                  placeholder="URL de la photo de profil"
                  value={formData.profileImageUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Company Section */}
        <div className='section-form'>
          <h3>Entreprise</h3>
          <div className='content-form'>
            <div className='col-form'>
              <div className="grid-item-form">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Nom de l'entreprise"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='col-form'>
              <div className="grid-item-form">
                <input
                  type="text"
                  name="profession"
                  placeholder="Profession"
                  value={formData.profession}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className='section-form'>
          <h3>Adresse</h3>
          <div className='content-form'>
            <div className='col-form'>
              <div className="grid-item-form">
                <input
                  type="text"
                  name="country"
                  placeholder="Pays"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
              <div className="grid-item-form">
                <input
                  type="text"
                  name="city"
                  placeholder="Ville"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='col-form'>
              <div className="grid-item-form">
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Code postal"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Design Section */}
        <div className='section-form'>
          <h3>Design QR code</h3>
          <div className='content-form'>
            <div className='col-form'>
              <div className="grid-item-form">
                <label htmlFor="primaryColor">Couleur primaire</label>
                <input
                  id="primaryColor"
                  type="color"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                />
              </div>
              <div className="grid-item-form">
                <label htmlFor="secondaryColor">Couleur secondaire</label>
                <input
                  id="secondaryColor"
                  type="color"
                  name="secondaryColor"
                  value={formData.secondaryColor}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='col-form'>
              <div className="grid-item-form">
                <label htmlFor="qrCodeShape">Forme</label>
                <select
                  id="qrCodeShape"
                  name="qrCodeShape"
                  value={formData.qrCodeShape}
                  onChange={handleChange}
                >
                  <option value="square">Carré</option>
                  <option value="circle">Rond</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className='section-form'>
          <h3>Réseaux sociaux</h3>
          <div className='content-form'>
            <div className='col-form'>
              <div className="grid-item-form">
                <input
                  type="url"
                  name="socialLinks.facebook"
                  placeholder="Facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleChange}
                />
              </div>
              <div className="grid-item-form">
                <input
                  type="url"
                  name="socialLinks.linkedIn"
                  placeholder="LinkedIn"
                  value={formData.socialLinks.linkedIn}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='col-form'>
              <div className="grid-item-form">
                <input
                  type="url"
                  name="socialLinks.tiktok"
                  placeholder="TikTok"
                  value={formData.socialLinks.tiktok}
                  onChange={handleChange}
                />
              </div>
              <div className="grid-item-form">
                <input
                  type="url"
                  name="socialLinks.snapchat"
                  placeholder="Snapchat"
                  value={formData.socialLinks.snapchat}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='col-form'>
              <div className="grid-item-form">
                <input
                  type="url"
                  name="socialLinks.telegram"
                  placeholder="Telegram"
                  value={formData.socialLinks.telegram}
                  onChange={handleChange}
                />
              </div>
              <div className="grid-item-form">
                <input
                  type="url"
                  name="socialLinks.instagram"
                  placeholder="Instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='col-form'>
              <div className="grid-item-form">
                <input
                  type="url"
                  name="socialLinks.twitter"
                  placeholder="Twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='section-btn'>
          <button type="submit" onClick={handleSubmit}>Envoyer</button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;