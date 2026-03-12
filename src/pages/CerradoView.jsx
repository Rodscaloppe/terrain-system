import { useState, useEffect } from "react";

const C = {
  sky1: "#1a0a2e", sky2: "#2d1b4e", sky3: "#e8722a", sky4: "#f4a63a", sky5: "#fce38a",
  ground1: "#5c3d1a", ground2: "#7a5231", ground3: "#96683e", ground4: "#b8884d",
  veg1: "#2d5016", veg2: "#3a6b1e", veg3: "#4d8226", veg4: "#6b9d3a", veg5: "#8aba52",
  dry: "#c4a25a", dryDark: "#8b7032", crack: "#4a3518",
  water: "#2980b9", waterLight: "#5dade2",
  panel: "#0f1520ee", panelSolid: "#0f1520", border: "#1c2840", text: "#e4e8f0",
  dim: "#7a8ba8", accent: "#22d3a7", warn: "#eab308", danger: "#f43f5e", rain: "#38bdf8",
  purple: "#a78bfa", green: "#34d399", orange: "#fb923c",
};
const mono = "'JetBrains Mono',monospace";

function Sun({ x, y }) {
  return (
    <g>
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7ae" stopOpacity="1" />
          <stop offset="40%" stopColor="#f4a63a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#e8722a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={x} cy={y} r="80" fill="url(#sunGlow)" />
      <circle cx={x} cy={y} r="28" fill="#fce38a" />
      <circle cx={x} cy={y} r="22" fill="#fff7ae" />
    </g>
  );
}

function CerradoTree({ x, y, scale = 1, variant = 0 }) {
  const s = scale;
  if (variant === 0) {
    return (
      <g transform={`translate(${x},${y}) scale(${s})`}>
        <rect x="-3" y="-45" width="6" height="45" fill="#5c3d1a" rx="2" />
        <rect x="-8" y="-55" width="4" height="18" fill="#5c3d1a" rx="1" transform="rotate(-30,-6,-45)" />
        <rect x="4" y="-50" width="4" height="15" fill="#5c3d1a" rx="1" transform="rotate(25,6,-42)" />
        <ellipse cx="0" cy="-58" rx="22" ry="16" fill={C.veg2} />
        <ellipse cx="-12" cy="-50" rx="14" ry="12" fill={C.veg3} />
        <ellipse cx="14" cy="-52" rx="12" ry="10" fill={C.veg4} />
        <ellipse cx="0" cy="-62" rx="15" ry="10" fill={C.veg5} opacity="0.5" />
      </g>
    );
  }
  if (variant === 1) {
    return (
      <g transform={`translate(${x},${y}) scale(${s})`}>
        <rect x="-4" y="-60" width="8" height="60" fill="#6b4c28" rx="3" />
        <rect x="-10" y="-50" width="5" height="20" fill="#6b4c28" rx="1.5" transform="rotate(-40,-7,-50)" />
        <ellipse cx="0" cy="-68" rx="28" ry="18" fill={C.veg1} />
        <ellipse cx="-8" cy="-72" rx="18" ry="12" fill={C.veg2} />
        <ellipse cx="10" cy="-65" rx="15" ry="11" fill={C.veg3} />
      </g>
    );
  }
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x="-2" y="-30" width="4" height="30" fill="#7a5231" rx="1.5" />
      <ellipse cx="0" cy="-35" rx="12" ry="10" fill={C.veg3} />
      <ellipse cx="0" cy="-38" rx="8" ry="7" fill={C.veg5} opacity="0.6" />
    </g>
  );
}

function Grass({ x, y, height = 15, color = C.veg4 }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {[-4, -1, 2, 5].map((dx, i) => (
        <line key={i} x1={dx} y1="0" x2={dx + (i % 2 === 0 ? -2 : 2)} y2={-height + i * 2} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      ))}
    </g>
  );
}

function SensorStation({ x, y, label, id, active, onClick, data }) {
  return (
    <g style={{ cursor: "pointer" }} onClick={onClick}>
      {/* Base/mastro */}
      <rect x={x - 2} y={y - 55} width="4" height="55" fill="#888" rx="1" />
      {/* Painel solar */}
      <rect x={x - 14} y={y - 62} width="28" height="12" fill="#1a3a5c" rx="2" stroke="#2a5a8c" strokeWidth="1" transform={`rotate(-15,${x},${y - 56})`} />
      <line x1={x - 10} y1={y - 58} x2={x + 10} y2={y - 58} stroke="#2a5a8c" strokeWidth="0.5" transform={`rotate(-15,${x},${y - 56})`} />
      <line x1={x - 10} y1={y - 54} x2={x + 10} y2={y - 54} stroke="#2a5a8c" strokeWidth="0.5" transform={`rotate(-15,${x},${y - 56})`} />
      {/* Caixa de sensores */}
      <rect x={x - 8} y={y - 42} width="16" height="12" fill="#ddd" rx="2" stroke="#999" strokeWidth="0.8" />
      <circle cx={x - 3} cy={y - 36} r="2" fill={active ? C.accent : "#666"} />
      <circle cx={x + 3} cy={y - 36} r="1.5" fill={C.rain} opacity="0.7" />
      {/* Antena */}
      <line x1={x + 8} y1={y - 45} x2={x + 14} y2={y - 60} stroke="#888" strokeWidth="1.5" />
      <circle cx={x + 14} cy={y - 62} r="2.5" fill="none" stroke={active ? C.accent : "#666"} strokeWidth="1" />
      {/* Sonda de solo */}
      <line x1={x - 5} y1={y} x2={x - 5} y2={y + 15} stroke="#666" strokeWidth="2" strokeDasharray="3 2" />
      <circle cx={x - 5} cy={y + 17} r="3" fill={C.warn} opacity="0.8" />
      {/* Pluviômetro */}
      <path d={`M${x + 6},${y - 48} L${x + 10},${y - 48} L${x + 9},${y - 40} L${x + 7},${y - 40} Z`} fill="#aaa" stroke="#888" strokeWidth="0.5" />
      {/* Pulso de sinal */}
      {active && (
        <>
          <circle cx={x + 14} cy={y - 62} r="8" fill="none" stroke={C.accent} strokeWidth="0.5" opacity="0.4">
            <animate attributeName="r" from="5" to="20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx={x + 14} cy={y - 62} r="8" fill="none" stroke={C.accent} strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" from="5" to="20" dur="2s" begin="0.7s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin="0.7s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      {/* Label */}
      <rect x={x - 38} y={y - 80} width="76" height="18" rx="4" fill={C.panelSolid} stroke={active ? C.accent : C.border} strokeWidth="1" />
      <text x={x} y={y - 68} textAnchor="middle" fill={active ? C.accent : C.dim} fontSize="8" fontFamily={mono} fontWeight="700">{label}</text>
    </g>
  );
}

function Satellite({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-4" y="-3" width="8" height="6" fill="#ccc" rx="1" stroke="#999" strokeWidth="0.5" />
      <rect x="-18" y="-2" width="14" height="4" fill="#2a5a8c" rx="1" />
      <rect x="4" y="-2" width="14" height="4" fill="#2a5a8c" rx="1" />
      <line x1="-18" y1="0" x2="18" y2="0" stroke="#666" strokeWidth="0.3" />
      {/* Signal cone */}
      <path d="M-2,3 L-30,50 L30,50 L2,3 Z" fill={C.rain} opacity="0.06" />
      <line x1="0" y1="3" x2="-20" y2="40" stroke={C.rain} strokeWidth="0.3" opacity="0.3" strokeDasharray="4 3" />
      <line x1="0" y1="3" x2="20" y2="40" stroke={C.rain} strokeWidth="0.3" opacity="0.3" strokeDasharray="4 3" />
    </g>
  );
}

function Tractor({ x, y }) {
  return (
    <g transform={`translate(${x},${y}) scale(0.7)`}>
      <rect x="0" y="-18" width="30" height="14" fill="#cc3333" rx="3" />
      <rect x="-12" y="-16" width="14" height="10" fill="#222" rx="2" />
      <rect x="2" y="-24" width="14" height="8" fill="#3399cc" rx="2" opacity="0.8" />
      <circle cx="-5" cy="0" r="8" fill="#333" stroke="#555" strokeWidth="2" />
      <circle cx="22" cy="0" r="10" fill="#333" stroke="#555" strokeWidth="2.5" />
      <circle cx="-5" cy="0" r="3" fill="#777" />
      <circle cx="22" cy="0" r="4" fill="#777" />
      <rect x="30" y="-8" width="25" height="3" fill="#888" rx="1" />
    </g>
  );
}

function DataOverlay({ x, y, data, color }) {
  if (!data) return null;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-50" y="-55" width="100" height="52" rx="6" fill={C.panelSolid} stroke={color} strokeWidth="1" opacity="0.95" />
      <text x="0" y="-40" textAnchor="middle" fill={color} fontSize="7" fontFamily={mono} fontWeight="700">{data.name}</text>
      {data.items.map((item, i) => (
        <g key={i}>
          <text x="-42" y={-28 + i * 11} fill={C.dim} fontSize="7" fontFamily={mono}>{item.label}</text>
          <text x="42" y={-28 + i * 11} textAnchor="end" fill={item.color || C.text} fontSize="7.5" fontFamily={mono} fontWeight="700">{item.value}</text>
        </g>
      ))}
    </g>
  );
}

function CrackedSoil({ x, y, width, height }) {
  return (
    <g opacity="0.4">
      <line x1={x} y1={y} x2={x + width * 0.3} y2={y + height * 0.6} stroke={C.crack} strokeWidth="1.5" />
      <line x1={x + width * 0.3} y1={y + height * 0.6} x2={x + width * 0.15} y2={y + height} stroke={C.crack} strokeWidth="1" />
      <line x1={x + width * 0.3} y1={y + height * 0.6} x2={x + width * 0.5} y2={y + height * 0.9} stroke={C.crack} strokeWidth="1.2" />
      <line x1={x + width * 0.5} y1={y + height * 0.1} x2={x + width * 0.7} y2={y + height * 0.5} stroke={C.crack} strokeWidth="1" />
      <line x1={x + width * 0.7} y1={y + height * 0.5} x2={x + width * 0.9} y2={y + height * 0.3} stroke={C.crack} strokeWidth="0.8" />
      <line x1={x + width * 0.7} y1={y + height * 0.5} x2={x + width * 0.85} y2={y + height * 0.85} stroke={C.crack} strokeWidth="1" />
    </g>
  );
}

function Bird({ x, y, delay = 0 }) {
  return (
    <g opacity="0.4">
      <path d={`M${x},${y} Q${x - 5},${y - 4} ${x - 10},${y} M${x},${y} Q${x + 5},${y - 4} ${x + 10},${y}`} fill="none" stroke="#333" strokeWidth="1">
        <animateTransform attributeName="transform" type="translate" values="0,0;80,-5;160,-10" dur="12s" begin={`${delay}s`} repeatCount="indefinite" />
      </path>
    </g>
  );
}

const stationData = [
  {
    name: "EST. VALE",
    items: [
      { label: "Temp", value: "32.4°C", color: C.danger },
      { label: "Umid Solo", value: "28%", color: C.warn },
      { label: "Chuva 30d", value: "35mm", color: C.rain },
    ],
  },
  {
    name: "EST. PLANALTO",
    items: [
      { label: "Temp", value: "29.8°C", color: C.orange },
      { label: "Umid Solo", value: "41%", color: C.green },
      { label: "Chuva 30d", value: "95mm", color: C.rain },
    ],
  },
  {
    name: "EST. CERRADO",
    items: [
      { label: "Temp", value: "36.1°C", color: C.danger },
      { label: "Umid Solo", value: "12%", color: C.danger },
      { label: "Chuva 30d", value: "8mm", color: C.warn },
    ],
  },
];

export default function CerradoVisualization() {
  const [selectedStation, setSelectedStation] = useState(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setTime((t) => t + 1), 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#080c14", fontFamily: "'Segoe UI',system-ui,sans-serif", color: C.text, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
      `}</style>

      {/* Header */}
      <div style={{ padding: "12px 20px", background: C.panelSolid, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>🌾</span>
          <div>
            <h1 style={{ margin: 0, fontSize: 15, fontWeight: 800, fontFamily: mono, background: `linear-gradient(135deg,${C.warn},${C.orange})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              SISTEMA DE RECONHECIMENTO — CERRADO
            </h1>
            <p style={{ margin: 0, fontSize: 10, color: C.dim }}>Visualização ilustrativa do sistema IoT + ML implantado para agronomia</p>
          </div>
        </div>
        <div style={{ fontSize: 10, color: C.dim, fontFamily: mono }}>
          Clique nas estações para ver dados
        </div>
      </div>

      {/* Main Landscape SVG */}
      <svg viewBox="0 0 1200 700" style={{ width: "100%", height: "auto", display: "block" }}>
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.sky1} />
            <stop offset="30%" stopColor={C.sky2} />
            <stop offset="60%" stopColor={C.sky3} />
            <stop offset="80%" stopColor={C.sky4} />
            <stop offset="100%" stopColor={C.sky5} />
          </linearGradient>
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.ground4} />
            <stop offset="40%" stopColor={C.ground3} />
            <stop offset="100%" stopColor={C.ground1} />
          </linearGradient>
          <linearGradient id="dryGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={C.dry} />
            <stop offset="100%" stopColor={C.dryDark} />
          </linearGradient>
          <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.veg3} />
            <stop offset="100%" stopColor={C.veg1} />
          </linearGradient>
          <pattern id="soilTexture" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.5" fill={C.crack} opacity="0.3" />
            <circle cx="6" cy="5" r="0.4" fill={C.crack} opacity="0.2" />
          </pattern>
        </defs>

        {/* Sky */}
        <rect width="1200" height="700" fill="url(#skyGrad)" />

        {/* Stars (upper sky) */}
        {[
          [80, 40], [200, 25], [350, 55], [500, 30], [680, 45], [820, 20], [950, 50], [1100, 35],
          [150, 70], [420, 15], [750, 60], [1050, 40], [300, 80], [600, 50], [900, 30],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={Math.random() * 1.2 + 0.3} fill="#fff" opacity={0.3 + Math.random() * 0.4} />
        ))}

        {/* Sun */}
        <Sun x={950} y={200} />

        {/* Distant hills */}
        <path d="M0,320 Q150,260 300,300 Q450,270 600,310 Q750,250 900,290 Q1050,270 1200,310 L1200,400 L0,400 Z" fill="#3a2a1a" opacity="0.5" />
        <path d="M0,340 Q200,290 400,330 Q600,300 800,340 Q1000,310 1200,350 L1200,420 L0,420 Z" fill="#4a3522" opacity="0.6" />

        {/* Ground / terrain */}
        <path d="M0,380 Q300,360 600,375 Q900,360 1200,380 L1200,700 L0,700 Z" fill="url(#groundGrad)" />
        <rect x="0" y="380" width="1200" height="320" fill="url(#soilTexture)" />

        {/* Planted field rows (soybean/corn) — left area */}
        <g opacity="0.9">
          {Array.from({ length: 18 }).map((_, i) => (
            <g key={i}>
              <line x1={60} y1={400 + i * 14} x2={350} y2={400 + i * 14} stroke={C.veg2} strokeWidth="4" opacity="0.5" />
              {Array.from({ length: 15 }).map((_, j) => (
                <ellipse key={j} cx={80 + j * 19} cy={398 + i * 14} rx={4 + Math.random() * 3} ry={3 + Math.random() * 2} fill={i < 6 ? C.veg4 : i < 12 ? C.veg3 : C.dry} opacity={0.7 + Math.random() * 0.3} />
              ))}
            </g>
          ))}
          <text x="200" y="660" textAnchor="middle" fill={C.dim} fontSize="10" fontFamily={mono} opacity="0.6">PLANTAÇÃO DE SOJA — 120 ha</text>
        </g>

        {/* Dry/stressed area — right area (drought zone) */}
        <g>
          <rect x="750" y="400" width="400" height="250" fill={C.dryDark} opacity="0.3" rx="10" />
          <CrackedSoil x={780} y={420} width={100} height={80} />
          <CrackedSoil x={900} y={440} width={120} height={90} />
          <CrackedSoil x={850} y={530} width={80} height={60} />
          <CrackedSoil x={960} y={480} width={100} height={70} />
          {/* Stressed plants */}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <line x1={780 + i * 35} y1={430 + (i % 3) * 40} x2={780 + i * 35 + (i % 2 ? 3 : -3)} y2={415 + (i % 3) * 40} stroke={C.dry} strokeWidth="1.5" opacity="0.6" />
              <ellipse cx={780 + i * 35} cy={413 + (i % 3) * 40} rx="5" ry="3" fill={C.dry} opacity="0.5" />
            </g>
          ))}
          <text x="950" y="660" textAnchor="middle" fill={C.danger} fontSize="10" fontFamily={mono} opacity="0.7">⚠ ZONA DE SECA SEVERA</text>
          <rect x="880" y="665" width="140" height="16" rx="4" fill={`${C.danger}22`} stroke={`${C.danger}44`} strokeWidth="0.5" />
          <text x="950" y="676" textAnchor="middle" fill={C.danger} fontSize="8" fontFamily={mono}>SOLO: 12% UMIDADE</text>
        </g>

        {/* Middle transition area */}
        <g opacity="0.8">
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <line x1={420 + i * 40} y1={410 + (i % 3) * 35} x2={420 + i * 40} y2={395 + (i % 3) * 35} stroke={i < 4 ? C.veg3 : C.dry} strokeWidth="1.5" />
              <ellipse cx={420 + i * 40} cy={393 + (i % 3) * 35} rx="6" ry="4" fill={i < 4 ? C.veg4 : C.dry} opacity="0.7" />
            </g>
          ))}
        </g>

        {/* Cerrado native trees */}
        <CerradoTree x={100} y={380} scale={1.1} variant={1} />
        <CerradoTree x={380} y={375} scale={0.9} variant={0} />
        <CerradoTree x={520} y={385} scale={0.7} variant={2} />
        <CerradoTree x={660} y={378} scale={1.0} variant={1} />
        <CerradoTree x={1050} y={382} scale={0.6} variant={2} />
        <CerradoTree x={1140} y={388} scale={0.8} variant={0} />
        <CerradoTree x={450} y={395} scale={0.5} variant={2} />

        {/* Grass patches */}
        {[130, 250, 340, 480, 570, 700, 810, 1000, 1100].map((gx, i) => (
          <Grass key={i} x={gx} y={385 + (i % 3) * 5} height={10 + (i % 4) * 3} color={i > 5 ? C.dry : C.veg4} />
        ))}

        {/* Small water body / river */}
        <path d="M0,500 Q80,490 160,505 Q240,480 300,500 Q340,495 360,510" fill="none" stroke={C.water} strokeWidth="8" opacity="0.3" />
        <path d="M0,502 Q80,492 160,507 Q240,482 300,502 Q340,497 360,512" fill="none" stroke={C.waterLight} strokeWidth="3" opacity="0.2" />
        <text x="180" y="525" textAnchor="middle" fill={C.water} fontSize="8" fontFamily={mono} opacity="0.4">Rio intermitente</text>

        {/* Tractor */}
        <Tractor x={300} y={450} />

        {/* Birds */}
        <Bird x={100} y={150} delay={0} />
        <Bird x={400} y={120} delay={3} />
        <Bird x={700} y={140} delay={6} />

        {/* ======= SATELLITE ======= */}
        <Satellite x={600} y={60} />
        <text x={600} y={85} textAnchor="middle" fill={C.rain} fontSize="8" fontFamily={mono} opacity="0.6">SENTINEL-2 / NDVI</text>

        {/* Satellite scan lines */}
        <line x1="520" y1="100" x2="200" y2="400" stroke={C.rain} strokeWidth="0.4" opacity="0.15" strokeDasharray="6 4" />
        <line x1="680" y1="100" x2="1000" y2="400" stroke={C.rain} strokeWidth="0.4" opacity="0.15" strokeDasharray="6 4" />

        {/* ======= SENSOR STATIONS ======= */}
        <SensorStation x={200} y={430} label="EST. VALE" id={0} active={true} onClick={() => setSelectedStation(selectedStation === 0 ? null : 0)} />
        <SensorStation x={550} y={420} label="EST. PLANALTO" id={1} active={true} onClick={() => setSelectedStation(selectedStation === 1 ? null : 1)} />
        <SensorStation x={900} y={425} label="EST. CERRADO" id={2} active={true} onClick={() => setSelectedStation(selectedStation === 2 ? null : 2)} />

        {/* LoRa signal arcs between stations */}
        <path d="M214,375 Q380,340 536,375" fill="none" stroke={C.accent} strokeWidth="0.8" opacity="0.2" strokeDasharray="5 3">
          <animate attributeName="strokeDashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M564,375 Q730,340 886,375" fill="none" stroke={C.accent} strokeWidth="0.8" opacity="0.2" strokeDasharray="5 3">
          <animate attributeName="strokeDashoffset" from="0" to="-16" dur="2s" repeatCount="indefinite" />
        </path>
        <text x="380" y="348" textAnchor="middle" fill={C.accent} fontSize="7" fontFamily={mono} opacity="0.35">LoRaWAN 915MHz</text>
        <text x="730" y="348" textAnchor="middle" fill={C.accent} fontSize="7" fontFamily={mono} opacity="0.35">LoRaWAN 915MHz</text>

        {/* Gateway tower */}
        <g transform="translate(550,360)">
          <rect x="-3" y="-30" width="6" height="30" fill="#777" rx="1" />
          <rect x="-10" y="-35" width="20" height="8" fill="#555" rx="2" />
          <circle cx="0" cy="-31" r="2" fill={C.accent} />
          <line x1="-8" y1="-40" x2="0" y2="-50" stroke="#888" strokeWidth="1" />
          <line x1="8" y1="-40" x2="0" y2="-50" stroke="#888" strokeWidth="1" />
          <circle cx="0" cy="-52" r="3" fill="none" stroke={C.accent} strokeWidth="0.8" />
          <text x="0" y="-58" textAnchor="middle" fill={C.accent} fontSize="7" fontFamily={mono} opacity="0.5">GATEWAY</text>
        </g>

        {/* Data overlays on click */}
        {selectedStation !== null && (
          <DataOverlay x={selectedStation === 0 ? 200 : selectedStation === 1 ? 550 : 900} y={selectedStation === 0 ? 340 : selectedStation === 1 ? 330 : 335} data={stationData[selectedStation]} color={selectedStation === 2 ? C.danger : selectedStation === 1 ? C.green : C.warn} />
        )}

        {/* Legend panel */}
        <g transform="translate(20, 420)">
          <rect x="0" y="0" width="160" height="165" rx="8" fill={C.panelSolid} stroke={C.border} strokeWidth="1" opacity="0.92" />
          <text x="12" y="18" fill={C.text} fontSize="9" fontFamily={mono} fontWeight="700">LEGENDA</text>
          {[
            { icon: "🟢", label: "Plantação saudável", y: 36 },
            { icon: "🟡", label: "Vegetação estressada", y: 52 },
            { icon: "🔴", label: "Solo seco / rachado", y: 68 },
            { icon: "📡", label: "Estação de sensores", y: 84 },
            { icon: "🛰", label: "Monitoramento satélite", y: 100 },
            { icon: "📶", label: "Rede LoRaWAN", y: 116 },
            { icon: "🚜", label: "Maquinário agrícola", y: 132 },
            { icon: "💧", label: "Recurso hídrico", y: 148 },
          ].map((item) => (
            <g key={item.label}>
              <text x="16" y={item.y} fontSize="11">{item.icon}</text>
              <text x="34" y={item.y} fill={C.dim} fontSize="8" fontFamily={mono}>{item.label}</text>
            </g>
          ))}
        </g>

        {/* ML prediction overlay */}
        <g transform="translate(20, 600)">
          <rect x="0" y="0" width="280" height="55" rx="8" fill={C.panelSolid} stroke={`${C.danger}44`} strokeWidth="1" opacity="0.92" />
          <text x="12" y="16" fill={C.danger} fontSize="9" fontFamily={mono} fontWeight="700">🧠 PREVISÃO ML — PRÓXIMAS 4 SEMANAS</text>
          <text x="12" y="30" fill={C.dim} fontSize="8" fontFamily={mono}>Seca severa no Cerrado: <tspan fill={C.danger} fontWeight="700">74% probabilidade</tspan></text>
          <text x="12" y="42" fill={C.dim} fontSize="8" fontFamily={mono}>Confiança do ensemble: <tspan fill={C.purple} fontWeight="700">82%</tspan> | Horizonte: <tspan fill={C.rain}>28 dias</tspan></text>
        </g>

        {/* NDVI legend */}
        <g transform="translate(1020, 420)">
          <rect x="0" y="0" width="150" height="95" rx="8" fill={C.panelSolid} stroke={C.border} strokeWidth="1" opacity="0.92" />
          <text x="12" y="16" fill={C.text} fontSize="9" fontFamily={mono} fontWeight="700">NDVI SATÉLITE</text>
          <rect x="12" y="26" width="126" height="10" rx="2" fill="url(#ndviGrad)" />
          <defs>
            <linearGradient id="ndviGrad">
              <stop offset="0%" stopColor={C.danger} />
              <stop offset="25%" stopColor={C.warn} />
              <stop offset="50%" stopColor={C.dry} />
              <stop offset="75%" stopColor={C.veg4} />
              <stop offset="100%" stopColor={C.veg1} />
            </linearGradient>
          </defs>
          <text x="12" y="48" fill={C.dim} fontSize="7" fontFamily={mono}>0.0</text>
          <text x="68" y="48" textAnchor="middle" fill={C.dim} fontSize="7" fontFamily={mono}>0.5</text>
          <text x="138" y="48" textAnchor="end" fill={C.dim} fontSize="7" fontFamily={mono}>1.0</text>
          <text x="12" y="62" fill={C.dim} fontSize="7" fontFamily={mono}>Vale: <tspan fill={C.warn}>0.52</tspan></text>
          <text x="12" y="74" fill={C.dim} fontSize="7" fontFamily={mono}>Planalto: <tspan fill={C.veg4}>0.68</tspan></text>
          <text x="12" y="86" fill={C.dim} fontSize="7" fontFamily={mono}>Cerrado: <tspan fill={C.danger}>0.21</tspan></text>
        </g>

        {/* Cloud wisps */}
        <ellipse cx="150" cy="130" rx="60" ry="15" fill="#fff" opacity="0.04" />
        <ellipse cx="170" cy="125" rx="40" ry="12" fill="#fff" opacity="0.05" />
        <ellipse cx="800" cy="100" rx="70" ry="14" fill="#fff" opacity="0.03" />

      </svg>

      {/* Bottom info panel */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, padding: "12px 20px", background: C.panelSolid, borderTop: `1px solid ${C.border}` }}>
        {[
          { icon: "🌾", title: "Área Monitorada", value: "850 hectares", sub: "3 estações cobrindo Vale, Planalto e Cerrado", color: C.accent },
          { icon: "📡", title: "Sensores Ativos", value: "24 sensores", sub: "8 por estação × 3 estações — leitura a cada 15min", color: C.rain },
          { icon: "🧠", title: "Modelo ML", value: "RF + XGBoost + LSTM", sub: "Previsão de 7 a 28 dias com 89.3% de acurácia", color: C.purple },
          { icon: "⚠️", title: "Alerta Ativo", value: "Seca Severa — Cerrado", sub: "Solo a 12%, NDVI 0.21 — irrigação de emergência recomendada", color: C.danger },
        ].map((item, i) => (
          <div key={i} style={{ padding: "10px 14px", background: "#0a0e18", borderRadius: 8, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 10, color: C.dim, fontFamily: mono, textTransform: "uppercase", letterSpacing: 0.8 }}>{item.title}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: item.color, fontFamily: mono, marginBottom: 4 }}>{item.value}</div>
            <div style={{ fontSize: 9, color: C.muted, lineHeight: 1.4 }}>{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
