import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

const generateCode = () => {
    const timestamp = Date.now().toString(16)
    const randomString = Math.random().toString(16).substring(2, 15)
    return timestamp + randomString
}

export const UserProvider = ({ children }) => {
    const [userCode, setUserCode] = useState('');

    useEffect(() => {
        const storedCode = localStorage.getItem('userCode')
        if (storedCode) {
            setUserCode(storedCode)
        } else {
            const newCode = generateCode()
            localStorage.setItem('userCode', newCode)
            setUserCode(newCode)
        }
    }, [])

    return (
        <UserContext.Provider value={{ userCode }}>
            {children}
        </UserContext.Provider>
    )
}