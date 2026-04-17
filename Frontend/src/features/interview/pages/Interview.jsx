import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Question Card Sub-component ──────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <motion.div 
            layout
            className="bg-[#1c1c1c] border border-white/5 rounded-2xl overflow-hidden mb-4"
        >
            <div 
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-4">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">Q{index + 1}</span>
                    <p className="font-medium text-gray-200">{item.question}</p>
                </div>
                <motion.span 
                    animate={{ rotate: open ? 180 : 0 }}
                    className="text-gray-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </motion.span>
            </div>
            
            <AnimatePresence>
                {open && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 border-t border-white/5"
                    >
                        <div className="mt-4 space-y-4">
                            <div>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">Intention</span>
                                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{item.intention}</p>
                            </div>
                            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Model Answer</span>
                                <p className="mt-2 text-sm text-gray-300 leading-relaxed italic">"{item.answer}"</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ── Road Map Day Sub-component ──────────────────────────────────────────────
const RoadMapDay = ({ day }) => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="relative pl-8 pb-10 border-l border-white/10 last:border-0"
    >
        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(210,13,59,0.5)]" />
        <div className="bg-[#1c1c1c] p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold bg-white/5 text-gray-400 px-3 py-1 rounded-full uppercase tracking-tighter">Day {day.day}</span>
                <h3 className="text-lg font-bold text-white">{day.focus}</h3>
            </div>
            <ul className="space-y-3">
                {day.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                        {task}
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) getReportById(interviewId)
    }, [interviewId])

    if (loading || !report) {
        return (
            <main className="min-h-screen w-full flex flex-col justify-center items-center bg-darkBg text-white">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-12 h-12 border-4 border-t-primary border-white/10 rounded-full"
                />
                <h1 className="mt-4 text-gray-400 tracking-widest font-medium uppercase">Fetching Report...</h1>
            </main>
        )
    }

    const scoreColor = report.matchScore >= 80 ? 'text-green-500 border-green-500/20' : 
                      report.matchScore >= 60 ? 'text-yellow-500 border-yellow-500/20' : 'text-red-500 border-red-500/20'

    return (
        <div className="min-h-screen bg-darkBg text-whitesmoke">
            <div className="flex flex-col lg:flex-row min-h-screen max-w-[1600px] mx-auto">
                
                {/* ── Left Navigation (Sidebar) ── */}
                <nav className="w-full lg:w-72 bg-[#141414] lg:border-r border-white/5 p-6 flex flex-col justify-between">
                    <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">Navigation</p>
                        <div className="space-y-2">
                            {NAV_ITEMS.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveNav(item.id)}
                                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                                        activeNav === item.id 
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                        : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                                    }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => getResumePdf(interviewId)}
                        className="mt-10 lg:mt-0 flex items-center text-white cursor-pointer justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-xl text-sm font-bold hover:bg-white/10 transition-all"
                    >
                        <svg className="text-primary"  width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Resume PDF
                    </motion.button>
                </nav>

                {/* ── Main Content Area ── */}
                <main className="flex-1 p-8 lg:p-12 h-screen overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeNav}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-3xl font-bold capitalize">{activeNav} Guide</h2>
                                    <p className="text-gray-500 mt-1">Personalized strategy based on your profile</p>
                                </div>
                                <span className="bg-white/5 px-4 py-2 rounded-full text-xs font-medium border border-white/5">
                                    {activeNav === 'roadmap' ? `${report.preparationPlan.length} Days` : `${activeNav === 'technical' ? report.technicalQuestions.length : report.behavioralQuestions.length} Items`}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {activeNav === 'technical' && report.technicalQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                                {activeNav === 'behavioral' && report.behavioralQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                                {activeNav === 'roadmap' && (
                                    <div className="pt-4 ml-2">
                                        {report.preparationPlan.map((day) => <RoadMapDay key={day.day} day={day} />)}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </main>

                {/* ── Right Sidebar (Stats) ── */}
                <aside className="w-full lg:w-80 bg-[#141414] lg:border-l border-white/5 p-8">
                    <div className="sticky top-8 space-y-10">
                        {/* Match Score Ring */}
                        <div className="text-center">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Match Score</p>
                            <div className={`relative w-32 h-32 mx-auto flex items-center justify-center rounded-full border-4 ${scoreColor} shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
                                <div className="text-center">
                                    <span className="text-4xl font-black">{report.matchScore}</span>
                                    <span className="text-sm font-bold opacity-50">%</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-4">Strong candidate profile detected</p>
                        </div>

                        <hr className="border-white/5" />

                        {/* Skill Gaps Tags */}
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Identified Skill Gaps</p>
                            <div className="flex flex-wrap gap-2">
                                {report.skillGaps.map((gap, i) => (
                                    <motion.span 
                                        key={i} 
                                        whileHover={{ scale: 1.05 }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                                            gap.severity === 'high' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                            gap.severity === 'mid' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                                            'bg-blue-500/10 border-blue-500/20 text-blue-500'
                                        }`}
                                    >
                                        {gap.skill}
                                    </motion.span>
                                ))}
                            </div>
                            <p className="text-[10px] text-gray-600 mt-4 italic">*Focus on these to increase match score</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview