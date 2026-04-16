import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/')
    }

    // Professional Loading State
    if (loading) {
        return (
            <main className="min-h-screen w-full flex flex-col justify-center items-center bg-darkBg text-white">

                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut"
                        }}
                        className="absolute top-0 w-full h-full bg-primary shadow-[0_0_15px_rgba(210,13,59,0.5)]"
                    />
                </div>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
                    className="mt-6 text-xs font-bold tracking-[0.3em] text-gray-400 uppercase"
                >
                    Authenticating
                </motion.h1>
            </main>
        )
    }
    return (
        <main className="min-h-screen w-full flex justify-center items-center bg-darkBg px-4">
            {/* Form Container with smooth entrance animation */}
            <motion.div

                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.4,
                    ease: "easeOut" // Smooth rukna
                }}
                className="w-full max-w-[400px] flex flex-col gap-6 bg-[#1c1c1c] p-10 rounded-3xl shadow-2xl border border-white/5"
            >
                <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h1 className="text-4xl font-bold tracking-tight text-white">Login</h1>
                    <p className="text-gray-400 text-sm">Enter your credentials to access your account.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            id="email"
                            name='email'
                            placeholder='Enter email address'
                            className="bg-[#262626] border border-white/10 outline-none px-4 py-3.5 rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder:text-gray-600"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300 ml-1">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            id="password"
                            name='password'
                            placeholder='Enter password'
                            className="bg-[#262626] border border-white/10 outline-none px-4 py-3.5 rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 placeholder:text-gray-600"
                        />
                    </div>

                    {/* Animated Login Button */}
                    <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-primary text-white font-bold py-4 rounded-xl mt-2 transition-colors"
                    >
                        Login
                    </motion.button>
                </form>

                {/* Footer Link */}
                <p className="text-center text-sm text-gray-400">
                    Don't have an account?
                    <Link to={"/register"} className="text-primary hover:text-[#e1034d] ml-1.5 font-semibold transition-all hover:underline underline-offset-4">
                        Register
                    </Link>
                </p>
            </motion.div>
        </main>
    )
}

export default Login