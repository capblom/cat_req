import React, { useState } from 'react';
import EmailInput from './EmailInput';
import Loading from './Loading';
import NewUserForm from './NewUserForm';
import SuccessMessage from './SuccessMessage';
import UserInfo from './UserInfo';
import axios from 'axios';
import './App.css';
import Logo from './Logo';

function App() {
  const [email, setEmail] = useState('');
  const [postcode, setPostcode] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const checkEmail = (inputEmail) => {
    const consumerKey = 'cap.blom@blomsbulbs.com';
    const consumerSecret = 'eGoz Pfse M20p tuBM dSfn cr3h';

    setLoading(true);

    const config = {
      url: 'https://blomsbulbs.com/wp-json/catalogue_request/v1/cat_req_email_check/',
      method: 'post',
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
      data: {
        email: inputEmail,
      },
    };

    axios(config)
      .then(response => {
        setLoading(false);
        if (response.data.found) {
          setEmail(inputEmail);
          setPostcode(response.data.postcode);
          setUserId(response.data.user_id);
          setShowNewUserForm(false);
        } else {
          setShowNewUserForm(true);
          setEmail(inputEmail);
        }
      })
      .catch(error => {
        setLoading(false);
        setShowNewUserForm(true);
        setEmail(inputEmail);
      });
  };

  const handleUserCreationSuccess = () => {
    setUserCreated(true);
  };

  return (
    <div className="App">
      <div className="logo-container">
      <a href="https://blomsbulbs.com/product-category/autumn/" target="_blank" rel="noreferrer noopener"><Logo /></a>
      </div>
      {loading ? <Loading /> : null}
      {!userId && !loading && !showNewUserForm && !userCreated ? <EmailInput checkEmail={checkEmail} /> : null}
      {userId && !showNewUserForm && !userCreated ? <UserInfo userId={userId} postcode={postcode} onSuccess={handleUserCreationSuccess} /> : null}
      {showNewUserForm && !userCreated ? <NewUserForm email={email} onSuccess={handleUserCreationSuccess} /> : null}
      {userCreated ? <SuccessMessage /> : null}
    </div>
  );
}

export default App;
