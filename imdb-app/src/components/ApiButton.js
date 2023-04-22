import React from 'react';

const ApiButton = ({ buttonText, endpoint, onResponse }) => {
  const handleClick = async () => {
    try {
      const response = await fetch(endpoint, { method: 'GET' });
      console.log('Request URL:', endpoint); // Add this line to log the request URL
      const responseText = await response.text();
      console.log('Raw response text:', responseText); // Log the raw response text
      const data = JSON.parse(responseText);
      onResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  

  return <button onClick={handleClick}>{buttonText}</button>;
};

export default ApiButton;
