/** @format */

import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { usePathname } from 'next/navigation'

const UserContext = createContext(null)

export const useDataContext = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
   const pathname = usePathname()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== 'undefined') {
          const session = localStorage.getItem('auth-token')
          if (session) {
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
      } finally {
      }
    }

    fetchData()
  }, [pathname === '/overview'])

  useEffect(() => {
    setUserData(null)
  }, [pathname === '/login'])

  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  )
}
