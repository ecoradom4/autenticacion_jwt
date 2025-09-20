import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setError(null)
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password })
      const { token } = res.data
      localStorage.setItem('cine_token', token)
      nav('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <form 
        onSubmit={submit} 
        style={{
          background: '#fff',
          padding: 40,
          borderRadius: 12,
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          width: 320,
          textAlign: 'center'
        }}
      >
        <h2 style={{ marginBottom: 20, color: '#333' }}>🎬 Cine Connect</h2>
        <label style={{ display: 'block', textAlign: 'left', marginBottom: 5 }}>Email</label>
        <input 
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 15,
            borderRadius: 6,
            border: '1px solid #ccc'
          }}
        />
        <label style={{ display: 'block', textAlign: 'left', marginBottom: 5 }}>Password</label>
        <input 
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 20,
            borderRadius: 6,
            border: '1px solid #ccc'
          }}
        />
        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: 12,
            background: '#667eea',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Ingresar
        </button>
        {error && <div style={{ marginTop: 15, color: 'red' }}>{error}</div>}
      </form>
    </div>
  )
}