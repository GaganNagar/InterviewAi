import { RouterProvider } from "react-router"
import { router } from "./app.routes.jsx"
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/interview.context.jsx"
import { AnimatePresence } from "framer-motion" // Optional: for global animations

function App() {
  return (
    <AuthProvider>
      <InterviewProvider>
        {/* AnimatePresence helps in smooth exiting/entering of components */}
        <AnimatePresence mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App