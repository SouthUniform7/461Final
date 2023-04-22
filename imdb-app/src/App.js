import React, { useState } from 'react';
import './App.css';
import ApiButton from './components/ApiButton';
import DynamicTable from './components/DynamicTable';
import LoginButton from './components/LoginButton';
import SignUpForm from './components/SignUpForm';

function App() {
  const [tableData, setTableData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png' className="logo" alt='imdb logo'/>
      {!isLoggedIn && (
        <>
          <SignUpForm />
          <LoginButton onSignIn={() => setIsLoggedIn(true)} />
        </>
      )}
      {isLoggedIn && (
        <>
        <div className="api-button-container">
          <ApiButton
            buttonText="View Movies"
            endpoint="http://localhost:3001/movies/details/console"
            onResponse={setTableData}
          />
          <ApiButton
            buttonText="View Directors and Studios"
            endpoint="http://localhost:3001/movies/directors-and-studios/console"
            onResponse={setTableData}
          />
          <ApiButton
            buttonText="View Movie Ratings"
            endpoint="http://localhost:3001/movies/ratings/console"
            onResponse={setTableData}
          />
          <ApiButton
            buttonText="View Actors"
            endpoint="http://localhost:3001/actors"
            onResponse={setTableData}
          />
          <ApiButton
            buttonText="View Characters"
            endpoint="http://localhost:3001/characters/actors"
            onResponse={setTableData}
          />
          </div>
          <DynamicTable data={tableData} />
        </>
      )}
    </div>
  );
}

export default App;
