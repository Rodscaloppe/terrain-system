import { useState, useEffect, useCallback } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const COLORS = {
  bg: "#0a0e17",
  panel: "#111827",
  panelLight: "#1a2235",
  border: "#1e2d4a",
  borderLight: "#2a3f66",
  accent: "#00d4aa",
  accentDim: "#00d4aa33",
  warning: "#f59e0b",
  warningDim: "#f59e0b22",
  danger: "#ef4444",
  dangerDim: "#ef444422",
  rain: "#3b82f6",
  rainDim: "#3b82f622",
  text: "#e2e8f0",
  textDim: "#64748b",
  textMuted: "#475569",
  green: "#10b981",
  purple: "#8b5cf6",
};

const microcontrollers = [
  {
    id: "mc-001",
    name: "Estação Vale",
    region: "Região Vale do Rio",
    lat: -15.7801,
    lng: -47.9292,
    status: "online",
    battery: 87,
    signal: 94,
    uptime: "47d 12h",
    firmware: "v3.2.1",
    sensors: {
      temp: 32.4,
      humidity: 42,
      pressure: 1013.2,
      soilMoisture: 28,
      soilTemp: 29.1,
      salinity: 2.3,
      windSpeed: 12.4,
      rainfall: 0,
    },
    history: [
      { month: "Out", temp: 28, humidity: 65, soil: 45, rain: 120 },
      { month: "Nov", temp: 30, humidity: 55, soil: 38, rain: 80 },
      { month: "Dez", temp: 33, humidity: 48, soil: 32, rain: 45 },
      { month: "Jan", temp: 35, humidity: 38, soil: 25, rain: 20 },
      { month: "Fev", temp: 34, humidity: 35, soil: 22, rain: 15 },
      { month: "Mar", temp: 32, humidity: 42, soil: 28, rain: 35 },
    ],
  },
  {
    id: "mc-002",
    name: "Estação Planalto",
    region: "Planalto Central",
    lat: -14.235,
    lng: -46.8754,
    status: "online",
    battery: 92,
    signal: 88,
    uptime: "52d 8h",
    firmware: "v3.2.1",
    sensors: {
      temp: 29.8,
      humidity: 58,
      pressure: 1015.7,
      soilMoisture: 41,
      soilTemp: 26.3,
      salinity: 1.8,
      windSpeed: 8.2,
      rainfall: 2.1,
    },
    history: [
      { month: "Out", temp: 26, humidity: 72, soil: 55, rain: 180 },
      { month: "Nov", temp: 28, humidity: 65, soil: 48, rain: 140 },
      { month: "Dez", temp: 29, humidity: 60, soil: 44, rain: 100 },
      { month: "Jan", temp: 31, humidity: 52, soil: 38, rain: 70 },
      { month: "Fev", temp: 30, humidity: 55, soil: 40, rain: 85 },
      { month: "Mar", temp: 29, humidity: 58, soil: 41, rain: 95 },
    ],
  },
  {
    id: "mc-003",
    name: "Estação Cerrado",
    region: "Cerrado Profundo",
    lat: -13.005,
    lng: -49.3312,
    status: "warning",
    battery: 34,
    signal: 71,
    uptime: "23d 5h",
    firmware: "v3.1.8",
    sensors: {
      temp: 36.1,
      humidity: 25,
      pressure: 1010.5,
      soilMoisture: 12,
      soilTemp: 33.8,
      salinity: 4.1,
      windSpeed: 18.7,
      rainfall: 0,
    },
    history: [
      { month: "Out", temp: 30, humidity: 55, soil: 35, rain: 90 },
      { month: "Nov", temp: 33, humidity: 40, soil: 25, rain: 40 },
      { month: "Dez", temp: 35, humidity: 30, soil: 18, rain: 15 },
      { month: "Jan", temp: 37, humidity: 22, soil: 12, rain: 5 },
      { month: "Fev", temp: 38, humidity: 20, soil: 10, rain: 0 },
      { month: "Mar", temp: 36, humidity: 25, soil: 12, rain: 8 },
    ],
  },
];

const mlPredictions = [
  { week: "Sem 1", drought: 35, rain: 45, normal: 20, confidence: 88 },
  { week: "Sem 2", drought: 52, rain: 28, normal: 20, confidence: 85 },
  { week: "Sem 3", drought: 68, rain: 15, normal: 17, confidence: 82 },
  { week: "Sem 4", drought: 74, rain: 12, normal: 14, confidence: 78 },
];

const satelliteData = [
  { name: "NDVI", value: 0.42, max: 1, status: "Moderado", color: COLORS.warning },
  { name: "Evapotranspiração", value: 6.8, max: 10, unit: "mm/d", status: "Alto", color: COLORS.danger },
  { name: "Cobertura Nuvens", value: 18, max: 100, unit: "%", status: "Baixo", color: COLORS.rain },
  { name: "Albedo", value: 0.28, max: 1, status: "Normal", color: COLORS.accent },
];

const radarData = [
  { metric: "Temp", A: 85, B: 72, C: 95 },
  { metric: "Umidade", A: 42, B: 58, C: 25 },
  { metric: "Pressão", A: 65, B: 70, C: 55 },
  { metric: "Solo", A: 28, B: 41, C: 12 },
  { metric: "Vento", A: 50, B: 35, C: 75 },
  { metric: "Chuva", A: 15, B: 40, C: 5 },
];

const alerts = [
  { level: "ALTA", msg: "Seca severa prevista — Cerrado (3 semanas)", color: COLORS.danger, days: 21 },
  { level: "MÉDIA", msg: "Umidade do solo crítica — Estação Vale (<30%)", color: COLORS.warning, days: 0 },
  { level: "MÉDIA", msg: "Bateria baixa — Estação Cerrado (34%)", color: COLORS.warning, days: 0 },
  { level: "BAIXA", msg: "Probabilidade de chuva — Planalto (Sem 1)", color: COLORS.rain, days: 7 },
];

function Pulse({ color = COLORS.accent, size = 8 }) {
  return (
    <span style={{ position: "relative", display: "inline-block", width: size, height: size }}>
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          backgroundColor: color,
          animation: "pulse 2s ease-in-out infinite",
        }}
      />
      <span
        style={{
          position: "absolute",
          inset: -3,
          borderRadius: "50%",
          border: `1px solid ${color}`,
          opacity: 0.4,
          animation: "pulse-ring 2s ease-in-out infinite",
        }}
      />
    </span>
  );
}

function GaugeBar({ value, max = 100, color, label, unit = "", height = 6 }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: COLORS.textDim }}>{label}</span>
        <span style={{ fontSize: 11, color, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
          {value}{unit}
        </span>
      </div>
      <div style={{ height, backgroundColor: COLORS.bg, borderRadius: height / 2, overflow: "hidden" }}>
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: height / 2,
            transition: "width 0.8s ease",
            boxShadow: `0 0 8px ${color}44`,
          }}
        />
      </div>
    </div>
  );
}

function Panel({ children, title, icon, style = {}, accent }) {
  return (
    <div
      style={{
        backgroundColor: COLORS.panel,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        padding: 16,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {accent && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, ${accent}, transparent)`,
          }}
        />
      )}
      {title && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          {icon && <span style={{ fontSize: 16 }}>{icon}</span>}
          <h3
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.text,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}

function MCNode({ mc, selected, onClick }) {
  const isWarning = mc.status === "warning";
  const dotColor = isWarning ? COLORS.warning : COLORS.accent;
  return (
    <button
      onClick={onClick}
      style={{
        background: selected
          ? `linear-gradient(135deg, ${COLORS.panelLight}, ${COLORS.panel})`
          : COLORS.panel,
        border: `1px solid ${selected ? COLORS.accent : COLORS.border}`,
        borderRadius: 10,
        padding: "12px 14px",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        transition: "all 0.3s ease",
        boxShadow: selected ? `0 0 20px ${COLORS.accentDim}` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {selected && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 3,
            height: "100%",
            backgroundColor: COLORS.accent,
          }}
        />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Pulse color={dotColor} />
          <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{mc.name}</span>
        </div>
        <span
          style={{
            fontSize: 9,
            padding: "2px 7px",
            borderRadius: 4,
            backgroundColor: isWarning ? COLORS.warningDim : COLORS.accentDim,
            color: dotColor,
            fontWeight: 700,
            textTransform: "uppercase",
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: 0.8,
          }}
        >
          {mc.status}
        </span>
      </div>
      <div style={{ fontSize: 10, color: COLORS.textDim, marginBottom: 8 }}>{mc.region}</div>
      <div style={{ display: "flex", gap: 12 }}>
        <MiniStat label="BAT" value={`${mc.battery}%`} color={mc.battery < 50 ? COLORS.warning : COLORS.accent} />
        <MiniStat label="SIG" value={`${mc.signal}%`} color={COLORS.rain} />
        <MiniStat label="UP" value={mc.uptime} color={COLORS.textDim} />
      </div>
    </button>
  );
}

function MiniStat({ label, value, color }) {
  return (
    <div>
      <div style={{ fontSize: 9, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
      <div style={{ fontSize: 11, color, fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{value}</div>
    </div>
  );
}

function SensorGrid({ sensors }) {
  const items = [
    { key: "temp", label: "Temperatura", value: sensors.temp, unit: "°C", icon: "🌡", color: COLORS.danger, max: 50 },
    { key: "humidity", label: "Umidade Ar", value: sensors.humidity, unit: "%", icon: "💧", color: COLORS.rain, max: 100 },
    { key: "pressure", label: "Pressão", value: sensors.pressure, unit: "hPa", icon: "⏲", color: COLORS.purple, max: 1050 },
    { key: "soilMoisture", label: "Umidade Solo", value: sensors.soilMoisture, unit: "%", icon: "🌱", color: COLORS.green, max: 100 },
    { key: "soilTemp", label: "Temp Solo", value: sensors.soilTemp, unit: "°C", icon: "🌍", color: COLORS.warning, max: 50 },
    { key: "salinity", label: "Salinidade", value: sensors.salinity, unit: "dS/m", icon: "🧪", color: COLORS.accent, max: 8 },
    { key: "windSpeed", label: "Vento", value: sensors.windSpeed, unit: "km/h", icon: "🌬", color: COLORS.textDim, max: 60 },
    { key: "rainfall", label: "Chuva", value: sensors.rainfall, unit: "mm", icon: "🌧", color: COLORS.rain, max: 50 },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {items.map((s) => (
        <div
          key={s.key}
          style={{
            background: COLORS.bg,
            borderRadius: 8,
            padding: "10px 12px",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 14 }}>{s.icon}</span>
            <span style={{ fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: 0.5 }}>
              {s.label}
            </span>
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: COLORS.text,
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 6,
            }}
          >
            {s.value}
            <span style={{ fontSize: 11, color: COLORS.textDim, fontWeight: 400, marginLeft: 3 }}>{s.unit}</span>
          </div>
          <GaugeBar value={s.value} max={s.max} color={s.color} label="" height={4} />
        </div>
      ))}
    </div>
  );
}

function ArchitectureFlow() {
  const steps = [
    { icon: "📡", label: "Sensores", sub: "IoT Field", color: COLORS.accent },
    { icon: "⚡", label: "LoRaWAN", sub: "Transmissão", color: COLORS.warning },
    { icon: "🖥", label: "Gateway", sub: "MQTT Broker", color: COLORS.purple },
    { icon: "☁️", label: "Cloud", sub: "Processamento", color: COLORS.rain },
    { icon: "🧠", label: "ML Engine", sub: "RF + LSTM", color: COLORS.danger },
    { icon: "📊", label: "Dashboard", sub: "Previsões", color: COLORS.green },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, overflowX: "auto", padding: "4px 0" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px 10px",
              background: COLORS.bg,
              borderRadius: 8,
              border: `1px solid ${s.color}33`,
              minWidth: 72,
            }}
          >
            <span style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>
              {s.label}
            </span>
            <span style={{ fontSize: 8, color: COLORS.textMuted }}>{s.sub}</span>
          </div>
          {i < steps.length - 1 && (
            <svg width="20" height="12" viewBox="0 0 20 12" style={{ flexShrink: 0 }}>
              <line x1="0" y1="6" x2="14" y2="6" stroke={COLORS.textMuted} strokeWidth="1.5" strokeDasharray="3 2" />
              <polygon points="14,2 20,6 14,10" fill={COLORS.textMuted} />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export default function TerrainRecognitionSystem() {
  const [selectedMC, setSelectedMC] = useState(0);
  const [tab, setTab] = useState("sensors");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const iv = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(iv);
  }, []);

  const mc = microcontrollers[selectedMC];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: COLORS.bg,
        color: COLORS.text,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: 20,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=Space+Grotesk:wght@400;600;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(.85)} }
        @keyframes pulse-ring { 0%{opacity:.4;transform:scale(1)} 100%{opacity:0;transform:scale(2)} }
        @keyframes scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          padding: "14px 20px",
          background: `linear-gradient(135deg, ${COLORS.panel}, ${COLORS.panelLight})`,
          borderRadius: 12,
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.rain})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            🛰
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 800,
                fontFamily: "'JetBrains Mono', monospace",
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.rain})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: 0.5,
              }}
            >
              TERRAIN RECON SYSTEM
            </h1>
            <p style={{ margin: 0, fontSize: 11, color: COLORS.textDim, letterSpacing: 0.5 }}>
              Microcontroladores + Sensores + Machine Learning — Previsão Seca/Chuva
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent }}>
              {time.toLocaleTimeString("pt-BR")}
            </div>
            <div style={{ fontSize: 10, color: COLORS.textDim }}>{time.toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Pulse color={COLORS.accent} size={8} />
            <span style={{ fontSize: 10, color: COLORS.accent, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
        {alerts.map((a, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 8,
              backgroundColor: `${a.color}11`,
              border: `1px solid ${a.color}33`,
              minWidth: 200,
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 800,
                color: a.color,
                backgroundColor: `${a.color}22`,
                padding: "2px 6px",
                borderRadius: 3,
                fontFamily: "'JetBrains Mono', monospace",
                whiteSpace: "nowrap",
              }}
            >
              {a.level}
            </span>
            <span style={{ fontSize: 11, color: COLORS.text, lineHeight: 1.3 }}>{a.msg}</span>
            {a.days > 0 && (
              <span style={{ fontSize: 10, color: a.color, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap", marginLeft: "auto" }}>
                {a.days}d
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 300px", gap: 16 }}>
        {/* Left — MC List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Panel title="Estações" icon="📡" accent={COLORS.accent}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {microcontrollers.map((m, i) => (
                <MCNode key={m.id} mc={m} selected={selectedMC === i} onClick={() => setSelectedMC(i)} />
              ))}
            </div>
          </Panel>

          <Panel title="Arquitetura" icon="🔗" accent={COLORS.purple}>
            <ArchitectureFlow />
            <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[
                { l: "Protocolo", v: "LoRaWAN" },
                { l: "Broker", v: "MQTT v5" },
                { l: "Intervalo", v: "15 min" },
                { l: "Backup", v: "4G LTE" },
              ].map((d) => (
                <div key={d.l} style={{ background: COLORS.bg, borderRadius: 6, padding: "6px 8px" }}>
                  <div style={{ fontSize: 9, color: COLORS.textMuted, textTransform: "uppercase" }}>{d.l}</div>
                  <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                    {d.v}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Center — Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* MC Detail Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              background: COLORS.panel,
              borderRadius: 10,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Pulse color={mc.status === "warning" ? COLORS.warning : COLORS.accent} size={10} />
                <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>{mc.name}</span>
              </div>
              <span style={{ fontSize: 11, color: COLORS.textDim }}>
                {mc.region} • GPS: {mc.lat.toFixed(4)}, {mc.lng.toFixed(4)} • FW: {mc.firmware}
              </span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["sensors", "history", "radar"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    border: `1px solid ${tab === t ? COLORS.accent : COLORS.border}`,
                    backgroundColor: tab === t ? COLORS.accentDim : "transparent",
                    color: tab === t ? COLORS.accent : COLORS.textDim,
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: 0.5,
                  }}
                >
                  {t === "sensors" ? "Sensores" : t === "history" ? "Histórico" : "Radar"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {tab === "sensors" && (
              <Panel title={`Sensores — ${mc.name}`} icon="📊" accent={COLORS.accent}>
                <SensorGrid sensors={mc.sensors} />
              </Panel>
            )}
            {tab === "history" && (
              <Panel title={`Histórico 6 Meses — ${mc.name}`} icon="📈" accent={COLORS.rain}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 10, color: COLORS.textDim, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>
                      Temperatura & Umidade
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={mc.history}>
                        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: COLORS.textDim }} />
                        <YAxis tick={{ fontSize: 10, fill: COLORS.textDim }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: COLORS.panel,
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: 8,
                            fontSize: 11,
                          }}
                        />
                        <Line type="monotone" dataKey="temp" stroke={COLORS.danger} strokeWidth={2} dot={{ r: 3 }} name="Temp °C" />
                        <Line type="monotone" dataKey="humidity" stroke={COLORS.rain} strokeWidth={2} dot={{ r: 3 }} name="Umid %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: COLORS.textDim, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>
                      Solo & Precipitação
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart data={mc.history}>
                        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: COLORS.textDim }} />
                        <YAxis tick={{ fontSize: 10, fill: COLORS.textDim }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: COLORS.panel,
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: 8,
                            fontSize: 11,
                          }}
                        />
                        <Area type="monotone" dataKey="rain" stroke={COLORS.rain} fill={COLORS.rainDim} strokeWidth={2} name="Chuva mm" />
                        <Area type="monotone" dataKey="soil" stroke={COLORS.green} fill={`${COLORS.green}22`} strokeWidth={2} name="Solo %" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Panel>
            )}
            {tab === "radar" && (
              <Panel title="Comparativo — 3 Estações" icon="🎯" accent={COLORS.purple}>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke={COLORS.border} />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: COLORS.textDim }} />
                    <PolarRadiusAxis tick={{ fontSize: 9, fill: COLORS.textMuted }} />
                    <Radar name="Vale" dataKey="A" stroke={COLORS.accent} fill={COLORS.accent} fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="Planalto" dataKey="B" stroke={COLORS.rain} fill={COLORS.rain} fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="Cerrado" dataKey="C" stroke={COLORS.danger} fill={COLORS.danger} fillOpacity={0.15} strokeWidth={2} />
                    <Tooltip contentStyle={{ backgroundColor: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 11 }} />
                  </RadarChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 6 }}>
                  {[
                    { name: "Vale", color: COLORS.accent },
                    { name: "Planalto", color: COLORS.rain },
                    { name: "Cerrado", color: COLORS.danger },
                  ].map((l) => (
                    <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: l.color, display: "inline-block" }} />
                      <span style={{ fontSize: 11, color: COLORS.textDim }}>{l.name}</span>
                    </div>
                  ))}
                </div>
              </Panel>
            )}
          </div>

          {/* ML Predictions */}
          <Panel title="Machine Learning — Previsões" icon="🧠" accent={COLORS.danger}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <div style={{ fontSize: 10, color: COLORS.textDim, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>
                  Probabilidade (4 Semanas)
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={mlPredictions} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fill: COLORS.textDim }} />
                    <YAxis tick={{ fontSize: 10, fill: COLORS.textDim }} unit="%" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: COLORS.panel,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 8,
                        fontSize: 11,
                      }}
                    />
                    <Bar dataKey="drought" fill={COLORS.danger} name="Seca" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rain" fill={COLORS.rain} name="Chuva" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="normal" fill={COLORS.accent} name="Normal" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <div style={{ fontSize: 10, color: COLORS.textDim, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>
                  Confiança do Modelo
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={mlPredictions}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fill: COLORS.textDim }} />
                    <YAxis tick={{ fontSize: 10, fill: COLORS.textDim }} domain={[60, 100]} unit="%" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: COLORS.panel,
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 8,
                        fontSize: 11,
                      }}
                    />
                    <Area type="monotone" dataKey="confidence" stroke={COLORS.purple} fill={`${COLORS.purple}22`} strokeWidth={2} name="Confiança %" />
                  </AreaChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  {[
                    { l: "Modelo", v: "Random Forest + LSTM" },
                    { l: "Features", v: "24 variáveis" },
                    { l: "Acurácia", v: "89.3%" },
                  ].map((d) => (
                    <div key={d.l} style={{ flex: 1, background: COLORS.bg, borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
                      <div style={{ fontSize: 8, color: COLORS.textMuted, textTransform: "uppercase" }}>{d.l}</div>
                      <div style={{ fontSize: 10, color: COLORS.purple, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                        {d.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* Right — Satellite + Summary */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Panel title="Dados de Satélite" icon="🛰" accent={COLORS.rain}>
            {satelliteData.map((s) => (
              <div
                key={s.name}
                style={{
                  marginBottom: 12,
                  padding: "10px 12px",
                  background: COLORS.bg,
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.text }}>{s.name}</span>
                  <span
                    style={{
                      fontSize: 9,
                      padding: "2px 6px",
                      borderRadius: 3,
                      backgroundColor: `${s.color}22`,
                      color: s.color,
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {s.status}
                  </span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>
                  {s.value}
                  {s.unit && <span style={{ fontSize: 11, color: COLORS.textDim, fontWeight: 400, marginLeft: 3 }}>{s.unit}</span>}
                </div>
                <GaugeBar value={s.value} max={s.max} color={s.color} label="" height={4} />
              </div>
            ))}
            <div style={{ fontSize: 9, color: COLORS.textMuted, textAlign: "center", marginTop: 4 }}>
              Atualização semanal • Última: 10/Mar/2026
            </div>
          </Panel>

          <Panel title="Resumo Regional" icon="🗺" accent={COLORS.warning}>
            {microcontrollers.map((m, i) => {
              const risk = m.sensors.soilMoisture < 20 ? "CRÍTICO" : m.sensors.soilMoisture < 35 ? "ALERTA" : "ESTÁVEL";
              const riskColor = risk === "CRÍTICO" ? COLORS.danger : risk === "ALERTA" ? COLORS.warning : COLORS.accent;
              return (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    background: COLORS.bg,
                    borderRadius: 8,
                    border: `1px solid ${COLORS.border}`,
                    marginBottom: 8,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onClick={() => setSelectedMC(i)}
                >
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.text }}>{m.name}</div>
                    <div style={{ fontSize: 10, color: COLORS.textDim }}>
                      Solo: {m.sensors.soilMoisture}% | Temp: {m.sensors.temp}°C
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 9,
                      padding: "3px 8px",
                      borderRadius: 4,
                      backgroundColor: `${riskColor}22`,
                      color: riskColor,
                      fontWeight: 800,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: 0.8,
                    }}
                  >
                    {risk}
                  </span>
                </div>
              );
            })}
            <div
              style={{
                marginTop: 10,
                padding: "10px 12px",
                background: `${COLORS.danger}11`,
                borderRadius: 8,
                border: `1px solid ${COLORS.danger}33`,
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.danger, marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>
                ⚠ PREVISÃO DOMINANTE
              </div>
              <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.4 }}>
                Tendência de <strong style={{ color: COLORS.danger }}>seca severa</strong> nas próximas 3-4 semanas para a região do Cerrado.
                Probabilidade: <strong style={{ color: COLORS.danger }}>74%</strong>
              </div>
              <div style={{ fontSize: 10, color: COLORS.textDim, marginTop: 6 }}>
                Recomendação: Ativar protocolos de irrigação de emergência.
              </div>
            </div>
          </Panel>

          <Panel title="Status Sistema" icon="⚙" accent={COLORS.textDim}>
            {[
              { l: "Estações Online", v: "2/3", c: COLORS.warning },
              { l: "Latência Média", v: "142ms", c: COLORS.accent },
              { l: "Dados Hoje", v: "12.4k pts", c: COLORS.rain },
              { l: "ML Retreino", v: "2d 8h", c: COLORS.purple },
              { l: "API Status", v: "Operacional", c: COLORS.green },
            ].map((s) => (
              <div
                key={s.l}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "7px 0",
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <span style={{ fontSize: 11, color: COLORS.textDim }}>{s.l}</span>
                <span style={{ fontSize: 11, color: s.c, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{s.v}</span>
              </div>
            ))}
          </Panel>
        </div>
      </div>
    </div>
  );
}
