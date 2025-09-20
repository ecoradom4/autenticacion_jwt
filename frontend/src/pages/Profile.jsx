import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('cine_token')
    if (!token) {
      navigate('/login')
      return
    }

    axios
      .get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user)
        setLoading(false)
      })
      .catch((err) => {
        setError('No se pudo obtener el usuario')
        setLoading(false)
        if (err.response?.status === 401) {
          localStorage.removeItem('cine_token')
          navigate('/login')
        }
      })
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('cine_token')
    navigate('/login')
  }

  if (loading) return <div style={{padding:40}}>Cargando perfil...</div>
  if (error) return <div style={{padding:40, color:'red'}}>{error}</div>

  return (
    <div style={{padding:40, background:'#fdfdfd', height:'100vh'}}>
      <div style={{
        maxWidth:500, margin:'0 auto', background:'#fff',
        padding:30, borderRadius:12, boxShadow:'0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{color:'#2c3e50'}}>👤 Perfil</h2>
        {user ? (
          <div style={{marginTop:20, fontSize:16}}>
            <p><b>ID:</b> {user.id}</p>
            <p><b>Nombre:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
          </div>
        ) : (
          <div>No hay usuario autenticado</div>
        )}

        <div style={{marginTop:30}}>
          <Link 
            to="/dashboard" 
            style={{
              padding:'10px 20px',
              background:'#3498db',
              color:'#fff',
              borderRadius:8,
              textDecoration:'none',
              marginRight:10
            }}
          >
            ← Volver al Dashboard
          </Link>
          <button 
            onClick={handleLogout}
            style={{
              padding:'10px 20px',
              background:'#e74c3c',
              color:'#fff',
              border:'none',
              borderRadius:8,
              cursor:'pointer'
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}