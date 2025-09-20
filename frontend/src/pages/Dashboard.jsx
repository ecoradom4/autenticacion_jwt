import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
    <div style={{padding:20}}>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <div>Welcome, {user.name || user.email}</div>
          <button 
            onClick={handleLogout} 
            style={{marginTop: 20, padding: '10px 20px', background: 'red', color: 'white', border: 'none', borderRadius: 5}}
          >
            Cerrar sesión
          </button>
          <Link to="/profile" style={{ display: 'block', marginTop: 20 }}>
            Ver Perfil
          </Link>
        </div>
      ) : (
        <div>Not logged in</div>
      )}
    </div>

    
  )
}
