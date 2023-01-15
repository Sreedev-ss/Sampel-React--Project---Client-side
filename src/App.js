import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

//Components
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { Auth } from './store/AuthContext';
import LoginStatusAdmin from './pages/LoginStatusAdmin';
import LoginStatus from './pages/LoginStatus';
import ErrorPage from './pages/ErrorPage';

function App() {

  const { userStatus, setUserStatus } = useContext(Auth)
  const [userdata, setUserdata] = useState('')

  useEffect(() => {
    return ()=>{
      getUser()
    }
  }, [])

  const getUser = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios({
        method: 'get',
        url: 'http://localhost:8000/get-user',
        headers: {
          Authorization: `Bearer ${token}`
        }

      })
      setUserdata(response.data.email)
      const data = await axios({
        method: 'post',
        url: 'http://localhost:8000/get-userdata',
        data: {
          email: response.data.email
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUserStatus(data.data)
    } catch (error) {
      console.log(error.message)
    }

  }



  return (
    <div>
      <Routes>
        {!userStatus && <Route path='/login' element={<LoginPage />}></Route>}
        {!userStatus && <Route path='/signup' element={<SignupPage />}></Route>}
        <Route path='/' element={userStatus ? <HomePage /> : <LoginStatus/> }></Route>
        <Route path='/admin' element={userdata == "admin@gmail.com" ? <AdminPage /> : <LoginStatusAdmin />}></Route>
        <Route path='*'  element={<ErrorPage/>}></Route>

      </Routes>

    </div>
  );
}

export default App;
