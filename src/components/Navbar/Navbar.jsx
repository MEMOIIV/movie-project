import React, { useContext } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import NavbarCss from "./Nav.module.css"
import { SearchContext } from '../Context/Context';
export default function Navbar({ifUserLogin , remove} ) {
  const navigate = useNavigate();
const {valueInput , goToSearch , searchQuery} = useContext(SearchContext);

  function logOut(){
    // remove user data from localStorage + myToken = null
    let userChoice = window.confirm(' Are you sure to logout ')
    if(userChoice){
      remove();
      navigate('/login');
    }
  };


  return <>
  <nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container-fluid">
    <Link  className={ NavbarCss.logoStyle  + " navbar-brand"} to="">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {ifUserLogin?<>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tv">TvShow</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/people">People</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="about">About</Link>
        </li>
        <div className="d-flex" role="search">
        <input className="form-control me-2 search" type="search" placeholder="Search" value={searchQuery} onChange={valueInput} aria-label="Search"/>
        <button className='btn btn-info' onClick={goToSearch}>search</button>
      </div>
      </ul>
      
      </>:''}
    
      <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
      
        {ifUserLogin?<>
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
        <li className="nav-item ">
        <Link to=""><i className="fa-brands fa-facebook"></i></Link>
        <Link to=""><i className="fa-brands fa-spotify"></i></Link>
        <Link to=""><i className="fa-brands fa-instagram"></i></Link>
        <Link to=""><i className="fa-brands fa-youtube"></i></Link>
        </li>
        </ul>
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center  ">
        <li className="nav-item me-0 ">
          <div className={NavbarCss.cursor + " nav-link"} onClick={logOut}>LogOut</div>
        </li>
          </ul>

        </>: <ul  className="navbar-nav mb-2 mb-lg-0 align-items-center">
        <li className="nav-item">
          <Link className=" nav-link" to="register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
        </ul>}

      </ul>
    </div>
  </div>
</nav> 

  </>
  
}
