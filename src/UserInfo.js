import React, { useState } from "react";
import axios from "axios";

const UserInfo = ({ userId, postcode, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestCatalogue = (event) => {
    event.preventDefault();

    setIsLoading(true);

    const consumerKey = 'cap.blom@blomsbulbs.com';
    const consumerSecret = 'eGoz Pfse M20p tuBM dSfn cr3h';

    const config = {
      url: 'https://blomsbulbs.com/wp-json/catalogue_request/v1/cat_req_resend/',
      method: 'post',
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
      data: {
        user_id: userId,
      },
    };

    axios(config)
      .then(response => {
        setIsLoading(false);
        if (response.data.success) {
          console.log('Catalogue requested successfully!', userId);
          onSuccess();
        } else {
          console.error('Something went wrong:', response.data);
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error("An error occurred:", error.response ? error.response.data : error);
      });
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h3>It looks like you already have an account, is your postcode {postcode}?</h3>
        <p>If you would like to request a catalogue, please click the button below and we will send one by return. If you would like to update your address, <a target="_blank" rel="noopener noreferrer" href="https://blomsbulbs.com/my-account/">please sign in to your account</a>, give us a call on <strong>01234 709099</strong>, or, send an email to <a href="mailto:help@blomsbulbs.com">help@blomsbulbs.com</a>.</p>
        <button onClick={handleRequestCatalogue} disabled={isLoading}>
          {isLoading ? "LOADING..." : "REQUEST A NEW CATALOGUE"}
        </button>
        <p>OR</p>
        <button onClick={() => window.open('https://blomsbulbs.com/product-category/autumn/', '_blank')}>VISIT OUR ONLINE CATALOGUE</button>
      </div>
    </div>
  );
};

export default UserInfo;
