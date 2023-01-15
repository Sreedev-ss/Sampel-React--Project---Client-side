import React from 'react'
import './AdminHeader.css'

function AdminHeader() {
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    window.location.href = '/login'
  }
  return (
    <div>
      <nav className="navbar">
        <div className="container">

          <div className="navbar-header">
            <button className="navbar-toggler" data-toggle="open-navbar1">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <a href="/">
              <h4>Web<span>App</span></h4>
            </a>
          </div>

          <div className="navbar-menu" id="open-navbar1">
            <ul className="navbar-nav">
              <li className="active"><a href="/admin">Home</a></li>
              <li className="navbar-dropdown">
                <a  className="dropdown-toggler" data-dropdown="my-dropdown-id">
                  Categories <i className="fa fa-angle-down"></i>
                </a>
                <ul className="dropdown" id="my-dropdown-id">
                  <li><a >Actions</a></li>
                  <li><a >Something else here</a></li>
                  <li className="separator"></li>
                  <li><a >Seprated link</a></li>
                  <li className="separator"></li>
                  <li><a >One more seprated link.</a></li>
                </ul>
              </li>
              <li className="navbar-dropdown">
                <a  className="dropdown-toggler" data-dropdown="blog">
                  Blog <i className="fa fa-angle-down"></i>
                </a>
                <ul className="dropdown" id="blog">
                  <li><a >Some category</a></li>
                  <li><a >Some another category</a></li>
                  <li className="separator"></li>
                  <li><a >Seprated link</a></li>
                  <li className="separator"></li>
                  <li><a >One more seprated link.</a></li>
                </ul>
              </li>
              <li><a >About</a></li>
              <li><a onClick={() => handleLogout()}>Sign Out</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AdminHeader
