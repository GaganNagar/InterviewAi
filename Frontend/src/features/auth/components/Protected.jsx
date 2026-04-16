import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react';
import { motion } from 'framer-motion';

const Protected = ({ children }) => {
    const { loading, user } = useAuth();

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

    if (!user) {
        return <Navigate to={'/login'} />;
    }

    // Wrap children in a motion div for a smooth entrance once authenticated
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {children}
        </motion.div>
    );
};

export default Protected;