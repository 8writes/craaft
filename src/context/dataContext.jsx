/** @format */

import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const UserContext = createContext(null)

export const useDataContext = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== 'undefined') {
          const session = localStorage.getItem('auth-token')
          if (session && !userData) {
            const sessionData = JSON.parse(session)
            const userSessionData = sessionData || null
            const response = await axios.get(
              `https://craaft.onrender.com/v1/api/fetchuser?id=${userSessionData?.id}`
            )
            const { error, data } = response.data

            if (error) {
              console.error(error.message)
              setUserData(null)
            } else {
              setUserData(data[0])
            }
          }
        }
      } catch (error) {
        console.error(error)
        setUserData(null)
      }
    }

    if (!userData) {
      fetchData()
    }
  }, [userData])

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  )
}
