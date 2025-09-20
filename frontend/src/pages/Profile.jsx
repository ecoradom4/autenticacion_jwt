import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

  if (loading) return <div>Cargando perfil...</div>
  if (error) return <div>{error}</div>

  return (
    <div style={{ padding: 20 }}>
      <h2>Perfil del Usuario</h2>
      {user ? (
        <div
          style={{
            marginTop: 20,
            padding: 20,
            border: '1px solid #ccc',
            borderRadius: 8,
            maxWidth: 400,
          }}
        >
          <p><b>ID:</b> {user.id}</p>
          <p><b>Nombre:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Creado en:</b> {new Date(user.createdAt).toLocaleString()}</p>
        </div>
      ) : (
        <div>No hay usuario autenticado</div>
      )}
    </div>
  )
}
