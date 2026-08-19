import React, { useState, useRef, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { useAuth } from '../../auth/hooks/useAuth.js'
import InterviewWorkspace from '../components/InterviewWorkspace.jsx'
import RecentReports from '../components/RecentReports.jsx'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const { handleLogout } = useAuth()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [fileName, setFileName] = useState("")
    const [activeStep, setActiveStep] = useState(0)
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const steps = ["Reading Resume", "Analyzing Job Description", "Identifying Skill Gaps", "Generating Questions"]

    useEffect(() => {
        let interval
        if (loading) {
            interval = setInterval(() => {
                setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
            }, 5000)
        } else {
            setActiveStep(0)
        }
        return () => clearInterval(interval)
    }, [loading])

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFileName(file.name)
        }
    }

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (data?._id) {
    navigate(`/report/${data._id}`)
}
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex flex-col justify-center items-center bg-darkBg text-white px-6">
                <div className="max-w-md w-full">
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-8 relative">
                        <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="h-full bg-primary shadow-[0_0_20px_rgba(210,13,59,0.6)]"
                        />
                    </div>

                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0.3 }}
                                animate={{ 
                                    opacity: index === activeStep ? 1 : index < activeStep ? 0.5 : 0.2,
                                    x: index === activeStep ? 10 : 0
                                }}
                                className="flex items-center gap-4"
                            >
                                <div className={`w-2 h-2 rounded-full ${index <= activeStep ? 'bg-primary shadow-[0_0_8px_#d20d3b]' : 'bg-white/10'}`} />
                                <span className={`text-sm font-medium tracking-wide ${index === activeStep ? 'text-white' : 'text-gray-500'}`}>
                                    {step}...
                                </span>
                                {index === activeStep && (
                                    <motion.span 
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="text-[10px] text-primary font-bold uppercase ml-auto"
                                    >
                                        In Progress
                                    </motion.span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
                <p className="mt-12 text-xs text-gray-600 uppercase tracking-[0.3em]">AI is tailoring your strategy</p>
            </main>
        )
    }

    return (
        <div className="relative min-h-screen bg-darkBg text-whitesmoke font-sans pb-10">
            <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(210, 13, 59, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                    await handleLogout()
                    navigate('/login')
                }}
                className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-600 cursor-pointer hover:text-primary transition-all text-xl font-medium z-10"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Logout
            </motion.button>

            <header className="max-w-6xl mx-auto pt-16 pb-10 px-6 text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-4xl md:text-5xl font-extrabold mb-4"
                >
                    Create Your Custom <span className="text-primary">Interview Plan</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="text-gray-400 text-lg max-w-2xl mx-auto"
                >
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </motion.p>
            </header>

            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="max-w-6xl mx-auto mx-4 bg-[#1c1c1c] rounded-3xl overflow-hidden shadow-2xl border border-white/5"
            >
                <div>

                <InterviewWorkspace
                    jobDescription={jobDescription}
                    setJobDescription={setJobDescription}
                    selfDescription={selfDescription}
                    setSelfDescription={setSelfDescription}
                    fileName={fileName}
                    resumeInputRef={resumeInputRef}
                    handleFileChange={handleFileChange}
                    />
                </div>

                <div className="bg-[#141414] p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGenerateReport}
                        className="bg-primary text-white cursor-pointer font-bold px-10 py-4 rounded-xl flex items-center gap-3 shadow-lg shadow-primary/20 transition-all"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </motion.button>
                </div>
            </motion.div>

            {reports.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 mt-16">
                    <h2 className="text-2xl font-bold mb-8">My Recent Interview Plans</h2>
                    <RecentReports reports={reports} />
                </section>
            )}

            <footer className="mt-20 py-10 text-center border-t border-white/5">
                <div className="flex justify-center gap-8 text-sm text-gray-500 mb-4">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-primary transition-colors">Help Center</a>
                </div>
                <p className="text-xs text-gray-600">&copy; 2026 AI Interview Strategist. Built by Gagan Nagar.</p>
            </footer>
        </div>
    )
}

export default Home