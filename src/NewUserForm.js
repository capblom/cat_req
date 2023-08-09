import React, { useState } from "react";
import axios from "axios";

const NewUserForm = ({ email, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('');
  const [telephone, setTelephone] = useState('');
  const [source, setSource] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !firstName || !lastName || !line1 || !city || !postcode || !country || !email || !source) {
      setError('Please fill in all required fields.');
      return;
    }

    setError('');

    const consumerKey = 'cap.blom@blomsbulbs.com';
    const consumerSecret = 'eGoz Pfse M20p tuBM dSfn cr3h';

    const userData = {
      username: email,
      email: email,
      first_name: firstName,
      last_name: lastName,
      title: title,
      billing_address_1: line1,
      billing_address_2: line2,
      billing_city: city,
      billing_postcode: postcode,
      billing_country: country,
      billing_phone: telephone,
      user_source: source,
    };

    const config = {
      url: 'https://blomsbulbs.com/wp-json/catalogue_request/v1/cat_req_new',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
      data: JSON.stringify(userData),
    };

    setLoading(true);

    axios(config)
      .then(response => {
        setLoading(false);
        if (response.data.success) {
          console.log('User created successfully!', response.data.user_id);
          onSuccess();
        } else {
          console.error('Something went wrong:', response.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error("An error occurred:", error.response ? error.response.data : error);
      });
  };
  return (
    <div className="wrapper">
      <div className="container">
        {error && <p className="error">{error}</p>}
        <form className="new-user-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <br />
          <input type="email" value={email} readOnly />
          <br /> <br />

          <p>Please enter your details below and we will send your FREE copy of our Autumn  2023 Bulb Catalogue by return.</p>

          <label>Title: </label>
          <br />
          <select value={title} onChange={(e) => setTitle(e.target.value)}>
            <option></option>
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
            <option>Miss.</option>
            <option>Dr.</option>
            <option>Lord</option>
            <option>Lady</option>
            <option>Sir</option>
            <option>Dame</option>
            <option>Other</option>
          </select>
          <br />
          <label>First Name</label><br />
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <br />

          <label>Last Name</label><br />
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <br />

          <label>Address Line 1</label><br />
          <input type="text" value={line1} onChange={(e) => setLine1(e.target.value)} />
          <br />

          <label>Address Line 2</label><br />
          <input type="text" value={line2} onChange={(e) => setLine2(e.target.value)} />
          <br />

          <label>City</label><br />
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          <br />

          <label>Postcode</label><br />
          <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
          <br />

          <label>Country</label><br />
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
          <br />

          <label>Telephone</label><br />
          <input type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          <br /><br />

          <label>Where did you hear about us? </label>
          <br />
          <select value={source} onChange={(e) => setSource(e.target.value)}>
            <option></option>
            <option>English Garden Magazine</option>
            <option>Social Media</option>
            <option>Friend or Family</option>
            <option>Other</option>
          </select>
          <br /><br />

          {loading ? (
            <button type="button" disabled>LOADING...</button>
          ) : (
            <button type="submit">REQUEST A CATALOGUE</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewUserForm;
