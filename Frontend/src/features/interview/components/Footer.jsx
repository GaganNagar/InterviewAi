import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="mt-20 border-t border-white/5 py-10 text-center">
        <div className="mb-4 flex justify-center gap-8 text-sm text-gray-500">
          <a
            href="#"
            className="transition-colors hover:text-primary"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="transition-colors hover:text-primary"
          >
            Terms of Service
          </a>

          <a
            href="#"
            className="transition-colors hover:text-primary"
          >
            Help Center
          </a>
        </div>

        <p className="text-xs text-gray-600">
          &copy; 2026 AI Interview Strategist. Built by Gagan Nagar.
        </p>
      </footer>
    </div>
  )
}

export default Footer
