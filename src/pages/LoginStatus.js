import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function LoginStatus() {
    const navigate = useNavigate()
   
    return ( <div className='box' style={{width:'100%',display:'grid',justifyContent:'center',alignItems:'center',marginTop:'5rem'}}>
       <h5>Please Login to Continue</h5>
        <br></br>
        <button onClick={()=>navigate('/login')}>Login</button>
    </div> )

    
}

export default LoginStatus
