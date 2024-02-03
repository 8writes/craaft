/** @format */

import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext(null)

// Custom hook to use the context
export const useDataContext = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  const fetchedUserData = async () => {
    try {
      const session = localStorage.getItem('auth-token')

      if (session) {
        const sessionData = JSON.parse(session)
        const userSessionData = sessionData || null

        const response = await axios.get(
          `https://craftserver.onrender.com/v1/api/fetchuser?id=${userSessionData.id}`
        )

        const { error, data } = response.data

        if (error) {
          console.error(error.message)
        }

        setUserData(data[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!userData) {
      fetchedUserData()
    }
  }, [userData])

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  )
}
