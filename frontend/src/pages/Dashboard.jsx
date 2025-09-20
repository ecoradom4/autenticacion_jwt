import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export default function Dashboard(){
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem('cine_token')
    if (!token) return
    axios.get(`${API}/auth/me`, { headers: { Authorization: 'Bearer ' + token } })
      .then(r=>setUser(r.data.user))
      .catch(()=>{})
  },[])

  const handleLogout = () => {
    localStorage.removeItem('cine_token')
    navigate('/login')
  }

  return (
    <div style={{padding:40, fontFamily:'sans-serif', background:'#ecf0f1', height:'100vh'}}>
      <div style={{
        maxWidth:500, margin:'0 auto', background:'#fff',
        padding:30, borderRadius:12, boxShadow:'0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{color:'#34495e'}}>📊 Dashboard</h2>
        {user ? (
          <div style={{marginTop:20}}>
            <div style={{fontSize:18, marginBottom:20}}>Bienvenido, <b>{user.name || user.email}</b></div>
            <Link 
              to="/profile"
              style={{
                display:'inline-block',
                padding:'10px 20px',
                background:'#3498db',
                color:'#fff',
                borderRadius:8,
                marginRight:10,
                textDecoration:'none'
              }}
            >
              Ver Perfil
            </Link>
            <button 
              onClick={handleLogout} 
              style={{
                padding:'10px 20px',
                background:'#e74c3c',
                color:'white',
                border:'none',
                borderRadius:8,
                cursor:'pointer'
              }}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div>No hay sesión activa</div>
        )}
      </div>
    </div>
  )
}