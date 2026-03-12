import { useState } from 'react'
import TerrainSystem from './pages/TerrainSystem'
import MLLogic from './pages/MLLogic'
import ImplGuide from './pages/ImplGuide'
import UbuntuGuide from './pages/UbuntuGuide'
import CerradoView from './pages/CerradoView'

const pages = [
  { id: 'cerrado', label: '🌾 Cerrado Ilustrativo', component: CerradoView },
  { id: 'terrain', label: '📡 Dashboard Sensores', component: TerrainSystem },
  { id: 'ml', label: '🧠 Lógica ML', component: MLLogic },
  { id: 'impl', label: '🛠 Implementação', component: ImplGuide },
  { id: 'ubuntu', label: '🐧 Guia Ubuntu', component: UbuntuGuide },
]

function App() {
  const [activePage, setActivePage] = useState('cerrado')
  const ActiveComponent = pages.find(p => p.id === activePage)?.component || CerradoView

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#080c14' }}>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '10px 16px',
        backgroundColor: '#0f1520ee',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1c2840',
      }}>
        <span style={{
          fontSize: 14,
          fontWeight: 800,
          fontFamily: "'JetBrains Mono', monospace",
          background: 'linear-gradient(135deg, #22d3a7, #38bdf8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginRight: 12,
        }}>
          TERRAIN RECON
        </span>
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePage(p.id)}
            style={{
              padding: '7px 14px',
              borderRadius: 7,
              border: `1px solid ${activePage === p.id ? '#22d3a7' : '#1c2840'}`,
              backgroundColor: activePage === p.id ? '#22d3a716' : 'transparent',
              color: activePage === p.id ? '#22d3a7' : '#7a8ba8',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {p.label}
          </button>
        ))}
      </nav>
      <ActiveComponent />
    </div>
  )
}

export default App
