import React, { useState } from 'react'
import axios from 'axios'
import './Login.css'
import {useNavigate} from 'react-router-dom'

function Login() {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()

    const handleLogin = async(e) => {
        try {   
            e.preventDefault();
            const response = await axios({
                method:'post',
                url:'http://localhost:8000/login',
                data : {
                    email:email,
                    password:password
                }
            })
            console.log(response,"login");
            if(response.data.status == true){
                response.data.email == 'admin@gmail.com' ? window.location.href="/admin" : window.location.href="/"
                localStorage.setItem('accessToken',response.data.accessToken)
            }else{
                alert('User Not Exist');
                window.location.reload()
            }
        } catch (error) {
            console.log(error);
        }       
    }
  return (
    <div>
      <div className="loginParentDiv">
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            value={email}
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={password}
            className="input"
            type="password"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
          <a onClick={()=>navigate('/signup')}>Signup</a>
        </form>
      </div>

    </div>
  )
}

export default Login;
