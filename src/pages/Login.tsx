import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { signin } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signin(email, password)
      navigate('/', { replace: true })
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left (form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12">
        <Link to="/" className="flex items-center text-sm text-indigo-300 hover:text-indigo-500 mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Landing Page
        </Link>

        <div className="max-w-md w-full mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900">Sign In</h1>
            <p className="mt-1 text-sm text-indigo-400">
              Enter your email and password to sign in!
            </p>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center py-3 bg-indigo-50 border border-indigo-100 rounded-full text-sm text-gray-700 hover:bg-indigo-100"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>

          <div className="flex items-center">
            <div className="flex-grow h-px bg-indigo-100" />
            <span className="px-2 text-sm text-indigo-200">or</span>
            <div className="flex-grow h-px bg-indigo-100" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-sm text-red-500">{error}</p>}

            <div>
              <label className="block text-sm font-medium text-indigo-700">Email*</label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-3 text-indigo-300" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="mail@simmmple.com"
                  className="w-full pl-10 pr-4 py-3 border border-indigo-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-indigo-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-700">Password*</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 text-indigo-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Min. 8 characters"
                  className="w-full pl-10 pr-10 py-3 border border-indigo-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-indigo-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-3 text-indigo-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-indigo-600">
                <input
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={e => setKeepLoggedIn(e.target.checked)}
                  className="h-4 w-4 text-purple-600 border-indigo-200 rounded"
                />
                <span className="ml-2">Keep me logged in</span>
              </label>
              <Link to="/forgot-password" className="text-purple-600 hover:underline">
                Forget password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white text-sm font-medium rounded-full ${
                loading ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-indigo-600">
            Not registered yet?{' '}
            <Link to="/register" className="font-semibold text-purple-600 hover:underline">
              Create an Account
            </Link>
          </p>

          <div className="text-center text-xs text-indigo-200 pt-6">
            © 2025 AerieX. All Rights Reserved.
          </div>

          <nav className="flex justify-center space-x-6 text-xs text-indigo-200 pt-4">
            <Link to="/marketplace" className="hover:underline">
              Marketplace
            </Link>
            <Link to="/license" className="hover:underline">
              License
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Use
            </Link>
            <Link to="/blog" className="hover:underline">
              Blog
            </Link>
          </nav>
        </div>
      </div>

      {/* Right (illustration) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/src/assets/Image.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
      </div>
    </div>
  )
}
