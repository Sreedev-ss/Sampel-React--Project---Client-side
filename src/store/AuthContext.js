import React, { createContext, useContext, useState } from 'react'

export const Auth = createContext()

function AuthContext({children}) {
    const [userStatus,setUserStatus] = useState("")
  return (
    <Auth.Provider value={{userStatus,setUserStatus}}>
        {children}
    </Auth.Provider>
  )
}

export default AuthContext
