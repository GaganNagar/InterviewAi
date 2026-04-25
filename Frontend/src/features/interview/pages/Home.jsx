import React, { useState, useRef, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { useAuth } from '../../auth/hooks/useAuth.js'

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
                <div className="flex flex-col lg:flex-row">
                    <div className="flex-1 p-8 border-r border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-white">Target Job Description</h2>
                            <span className="bg-primary/20 text-primary text-[10px] uppercase font-bold px-2 py-1 rounded">Required</span>
                        </div>
                        <textarea
                            onChange={(e) => setJobDescription(e.target.value)}
                            className="w-full h-80 bg-[#141414] border border-white/10 rounded-2xl p-5 text-gray-300 outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                            placeholder="Paste the full job description here..."
                            maxLength={5000}
                        />
                        <div className="text-right text-xs text-gray-500 mt-2">{jobDescription.length} / 5000 chars</div>
                    </div>

                    <div className="flex-1 p-8 bg-[#212121]/30">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-white">Your Profile</h2>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-3 text-gray-300">
                                Upload Resume <span className="text-primary text-[10px] ml-2 font-bold uppercase tracking-wider">Best Results</span>
                            </label>
                            <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-8 cursor-pointer transition-all ${fileName ? 'border-primary/50 bg-primary/5' : 'border-white/10 hover:border-primary/30 bg-[#141414]'}`} htmlFor="resume">
                                <div className={`p-4 rounded-full mb-3 ${fileName ? 'bg-primary text-white' : 'bg-white/5 text-gray-400'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </div>
                                <p className="text-sm font-bold text-center text-gray-600 leading-tight px-2">
                                    {fileName ? fileName : "Click to upload or drag & drop"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-tight">PDF or DOCX (Max 5MB)</p>
                                <input ref={resumeInputRef} onChange={handleFileChange} hidden type="file" id="resume" accept=".pdf,.docx" />
                            </label>
                        </div>

                        <div className="relative my-8 text-center">
                            <hr className="border-white/5" />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1c1c1c] px-4 text-xs font-bold text-gray-500 tracking-widest">OR</span>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-3 text-gray-300" htmlFor="selfDescription">Quick Self-Description</label>
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                id="selfDescription"
                                className="w-full h-32 bg-[#141414] border border-white/10 rounded-2xl p-4 text-gray-300 outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                                placeholder="Describe your experience briefly..."
                            />
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                            <div className="text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                            </div>
                            <p className="text-xs text-gray-400">Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required.</p>
                        </div>
                    </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reports.map((report) => (
                            <motion.div 
                                key={report._id} 
                                whileHover={{ y: -5 }}
                                onClick={() => navigate(`/report/${report._id}`)}
                                className="bg-[#1c1c1c] p-6 rounded-2xl border border-white/5 cursor-pointer hover:border-primary/50 transition-all group"
                            >
                                <h3 className="text-lg text-white font-bold group-hover:text-primary transition-colors">{report.title || 'Untitled Position'}</h3>
                                <p className="text-xs text-gray-500 mt-1 mb-4 italic">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <div className="flex items-center justify-between">
                                    <div className={`text-sm font-bold px-3 py-1 rounded-full ${report.matchScore >= 80 ? 'bg-green-500/10 text-green-500' : report.matchScore >= 60 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'}`}>
                                        Match: {report.matchScore}%
                                    </div>
                                    <div className="text-gray-600 group-hover:text-primary transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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