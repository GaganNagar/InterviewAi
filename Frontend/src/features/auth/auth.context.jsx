import { createContext, useState, useEffect } from "react"
import { getMe } from "./services/auth.api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            setLoading(false)
            return
        }

        const initUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                console.error("Session verification failed:", err)
                localStorage.removeItem("token")
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        initUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}