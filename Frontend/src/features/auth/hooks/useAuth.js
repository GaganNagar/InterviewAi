import { useContext } from "react"
import { AuthContext } from "../auth.context"
import {
    login,
    register,
    logout,
    getMe,
    updateProfile as updateProfileApi
} from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    const {
        user,
        setUser,
        loading,
        setLoading,
    } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)

        try {
            const data = await login({ email, password })

            if (data?.token) {
                localStorage.setItem("token", data.token)
            }

            if (data?.user) {
                setUser(data.user)
            } else {
                const userData = await getMe()
                setUser(userData?.user || null)
            }

            return { success: true }
        } catch (err) {
            console.error("Login failed:", err)
            const errorMessage = err?.response?.data?.message || err?.message || "Invalid email or password"
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({
        username,
        email,
        password,
    }) => {
        setLoading(true)

        try {
            const data = await register({
                username,
                email,
                password,
            })

            if (data?.token) {
                localStorage.setItem("token", data.token)
            }

            if (data?.user) {
                setUser(data.user)
            } else {
                const userData = await getMe()
                setUser(userData?.user || null)
            }

            return { success: true }
        } catch (err) {
            console.error("Registration failed:", err)
            const errorMessage = err?.response?.data?.message || err?.message || "Registration failed"
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)

        try {
            await logout()
        } catch (err) {
            console.warn("Server logout notification failed:", err)
        } finally {
            localStorage.removeItem("token")
            setUser(null)
            setLoading(false)
        }

        return true
    }

    const handleUpdateProfile = async ({ username, headline, avatar }) => {
        try {
            const data = await updateProfileApi({ username, headline, avatar })
            if (data?.user) {
                setUser(data.user)
                return { success: true, user: data.user }
            }
            return { success: false, error: "Failed to update profile" }
        } catch (err) {
            console.error("Profile update failed:", err)
            const errorMessage = err?.response?.data?.message || err?.message || "Update failed"
            return { success: false, error: errorMessage }
        }
    }

    return {
        user,
        setUser,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
        handleUpdateProfile
    }
}