import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'

function Signup() {
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [mobile,setMobile] = useState()
    const navigate = useNavigate()
    
    const handleSignup = async(e) => {
        try {
            e.preventDefault();
            const error = document.getElementById('error')
            const nameValue = document.getElementById('fname')?.value.trim()
            error.innerText = ""
    
            if(nameValue == ""){
                error.innerText = "Name cannot be empty"
                error.style.backgroundColor = "rgba(200,0,0,0.2)"
                return;
            }
    
            const response = await axios({
                method:'post',
                url:'http://localhost:8000/signup',
                data:{
                    name:name,
                    email:email,
                    password:password,
                    mobile:mobile
                }
            })

            response.data.status ? navigate('/login') : window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
      <div className="signupParentDiv">
        <form onSubmit={handleSignup}>
            <p id='error'></p>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="mobile"
            name="phone"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>

  )
}

export default Signup
