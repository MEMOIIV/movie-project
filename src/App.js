import { Routes, Route, Navigate } from 'react-router-dom'; // استخدم Routes و Route
import './App.css';
import Main from './components/Main/Main';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AllMovies from './components/AllMovies/AllMovies';
import AllTvShow from './components/AllTvShow/AllTvShow';
import People from './components/people/People';
import Details from './components/Details/Details';
import { useState, useEffect } from 'react';
import Search from './components/Search/Search';
import About from './components/About/About';

export default function App() {
  const [myToken, setMyToken] = useState(null);

  function ProtectedRoute(props) {
    if (myToken == null) {
      return  <h2>Error not found</h2>; // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن هناك توكن
    } else {
      return <>{props.children}</>; // إظهار المحتوى المحمي
    }
  };

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
    geLogInToken() 
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main ifUserLogin={myToken} remove={removeUseData} />}>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="movies" element={<ProtectedRoute><AllMovies /></ProtectedRoute>} />
        <Route path="tv" element={<ProtectedRoute><AllTvShow /></ProtectedRoute>} />
        <Route path="search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="people" element={<ProtectedRoute><People /></ProtectedRoute>} />
        <Route path="details/:media/:id" element={<Details />} />
        <Route path="login" element={<Login loginTkn={geLogInToken} />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<h2>Error</h2>} />
      </Route>
    </Routes>
  );
}
