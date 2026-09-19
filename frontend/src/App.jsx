import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import ProtectedRoute from './components/ProtectedRoute'

const Home          = lazy(() => import('./pages/Home'))
const Services      = lazy(() => import('./pages/Services'))
const Projects      = lazy(() => import('./pages/Projects'))
const Reviews       = lazy(() => import('./pages/Reviews'))
const About         = lazy(() => import('./pages/About'))
const Contact       = lazy(() => import('./pages/Contact'))
const Login         = lazy(() => import('./pages/Login'))
const Register      = lazy(() => import('./pages/Register'))
const Dashboard     = lazy(() => import('./pages/Dashboard'))
const ProjectPlanner = lazy(() => import('./pages/ProjectPlanner'))
const Payment       = lazy(() => import('./pages/Payment'))
const Admin         = lazy(() => import('./pages/Admin'))
const Confirmation  = lazy(() => import('./pages/Confirmation'))
const NotFound      = lazy(() => import('./pages/NotFound'))

const HIDE_NAV_FOOTER = ['/login', '/register', '/dashboard', '/admin', '/payment', '/confirmation']

export default function App() {
  const path = window.location.pathname
  const hideLayout = HIDE_NAV_FOOTER.some(p => path.startsWith(p))

  return (
    <>
      {!hideLayout && <Navbar />}
      <Suspense fallback={<Loader fullscreen />}>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/services"        element={<Services />} />
          <Route path="/projects"        element={<Projects />} />
          <Route path="/reviews"         element={<Reviews />} />
          <Route path="/about"           element={<About />} />
          <Route path="/contact"         element={<Contact />} />
          <Route path="/login"           element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/project-planner" element={<ProjectPlanner />} />
          <Route path="/dashboard"       element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin"           element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
          <Route path="/payment"         element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/confirmation"    element={<ProtectedRoute><Confirmation /></ProtectedRoute>} />
          <Route path="*"               element={<NotFound />} />
        </Routes>
      </Suspense>
      {!hideLayout && <Footer />}
    </>
  )
}
