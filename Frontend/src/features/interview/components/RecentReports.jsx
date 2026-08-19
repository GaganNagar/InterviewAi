import React from 'react'

const RecentReports = ({ reports }) => {
  return (  
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
  )
}

export default RecentReports
