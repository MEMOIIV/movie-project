import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import AllMovies from './components/AllMovies/AllMovies';
import AllTvShow from './components/AllTvShow/AllTvShow';
import People from './components/people/People';
import Details from './components/Details/Details';
import { useState, useEffect } from 'react';
import Search from './components/Search/Search';
import About from './components/About/About';

export default function App() {
  const [myToken, setMyToken] = useState(null);

  function geLogInToken() {
    const token = localStorage.getItem('token');
    if (token) {
      // console.log('Hello', token);
      setMyToken(token);
    }
  };

  function removeUseData() {
    localStorage.removeItem('token');
    setMyToken(null);
  };

  function checkReload() {
    if (localStorage.getItem('token') && myToken == null) {
      geLogInToken();
    }
  };

  useEffect(() => {
    checkReload();
  },);

  return (
    <Routes>
      <Route path="/" element={<Main ifUserLogin={myToken} remove={removeUseData} />}>
        <Route path="" element={<><Home /></>} />
        {myToken != null ? <Route path="/" element={<><Home /></>} />
        :<Route path="/" element={<Login/>} />}
        <Route path="home" element={<><Home /></>} />
        <Route path="about" element={<><About /></>} />
        <Route path="movies" element={<><AllMovies /></>} />
        <Route path="tv" element={<><AllTvShow /></>} />
        <Route path="search" element={<><Search /></>} />
        <Route path="people" element={<><People /></>} />
        <Route path="details/:media/:id" element={<Details />} />
        <Route path="login" element={<Login loginTkn={geLogInToken} />} />
        <Route path="*" element={<h2>Error</h2>} />
      </Route>
    </Routes>
  );
}
