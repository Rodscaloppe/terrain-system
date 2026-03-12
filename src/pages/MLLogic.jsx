import { useState } from "react";

const C = {
  bg: "#0a0e17",
  panel: "#111827",
  panelLight: "#1a2235",
  border: "#1e2d4a",
  accent: "#00d4aa",
  accentDim: "#00d4aa22",
  warn: "#f59e0b",
  warnDim: "#f59e0b18",
  danger: "#ef4444",
  dangerDim: "#ef444418",
  rain: "#3b82f6",
  rainDim: "#3b82f618",
  text: "#e2e8f0",
  dim: "#64748b",
  muted: "#475569",
  green: "#10b981",
  greenDim: "#10b98118",
  purple: "#8b5cf6",
  purpleDim: "#8b5cf618",
  orange: "#f97316",
};

const mono = "'JetBrains Mono', monospace";

function Badge({ text, color }) {
  return (
    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4, backgroundColor: `${color}22`, color, fontFamily: mono, letterSpacing: 0.6 }}>
      {text}
    </span>
  );
}

function Panel({ title, icon, accent, children, style = {} }) {
  return (
    <div style={{ backgroundColor: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, position: "relative", overflow: "hidden", ...style }}>
      {accent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)` }} />}
      {title && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 16 }}>{icon}</span>
          <h3 style={{ margin: 0, fontSize: 12, fontWeight: 700, color: C.text, textTransform: "uppercase", letterSpacing: 1.2, fontFamily: mono }}>{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}

function CodeBlock({ code, lang = "python" }) {
  return (
    <pre style={{ backgroundColor: "#0d1117", border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, margin: "10px 0", overflow: "auto", fontSize: 11, lineHeight: 1.6, fontFamily: mono, color: "#c9d1d9" }}>
      <code>{code}</code>
    </pre>
  );
}

function StepCard({ number, title, description, color, tags = [], children }) {
  return (
    <div style={{ background: C.panelLight, borderRadius: 10, border: `1px solid ${C.border}`, padding: 16, marginBottom: 12, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", backgroundColor: color }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color, fontFamily: mono }}>
          {number}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{title}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          {tags.map((t, i) => <Badge key={i} text={t} color={color} />)}
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.6, marginBottom: children ? 10 : 0 }}>{description}</div>
      {children}
    </div>
  );
}

function FeatureTable({ features }) {
  return (
    <div style={{ overflow: "auto", borderRadius: 8, border: `1px solid ${C.border}` }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
        <thead>
          <tr style={{ backgroundColor: C.bg }}>
            {["Variável", "Fonte", "Tipo", "Importância", "Lag"].map((h) => (
              <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: C.dim, fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, borderBottom: `1px solid ${C.border}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
              <td style={{ padding: "7px 10px", color: C.text, fontWeight: 600 }}>{f.name}</td>
              <td style={{ padding: "7px 10px" }}><Badge text={f.source} color={f.sourceColor} /></td>
              <td style={{ padding: "7px 10px", color: C.dim }}>{f.type}</td>
              <td style={{ padding: "7px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 60, height: 4, backgroundColor: C.bg, borderRadius: 2 }}>
                    <div style={{ width: `${f.importance}%`, height: "100%", backgroundColor: f.importance > 70 ? C.danger : f.importance > 40 ? C.warn : C.accent, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 10, color: C.dim, fontFamily: mono }}>{f.importance}%</span>
                </div>
              </td>
              <td style={{ padding: "7px 10px", color: C.purple, fontFamily: mono, fontSize: 10 }}>{f.lag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const sections = [
  {
    id: "pipeline",
    label: "Pipeline ML",
    icon: "🔄",
  },
  {
    id: "features",
    label: "Features",
    icon: "📊",
  },
  {
    id: "models",
    label: "Modelos",
    icon: "🧠",
  },
  {
    id: "training",
    label: "Treinamento",
    icon: "⚡",
  },
  {
    id: "deploy",
    label: "Deploy",
    icon: "🚀",
  },
  {
    id: "code",
    label: "Código",
    icon: "💻",
  },
];

const features = [
  { name: "soil_moisture_avg", source: "SENSOR", sourceColor: C.accent, type: "Contínuo", importance: 92, lag: "0-24h" },
  { name: "soil_moisture_delta_7d", source: "DERIVADO", sourceColor: C.purple, type: "Contínuo", importance: 88, lag: "7d" },
  { name: "ndvi_index", source: "SATÉLITE", sourceColor: C.rain, type: "Contínuo", importance: 85, lag: "7d" },
  { name: "evapotranspiration", source: "SATÉLITE", sourceColor: C.rain, type: "Contínuo", importance: 83, lag: "7d" },
  { name: "temp_air_max", source: "SENSOR", sourceColor: C.accent, type: "Contínuo", importance: 78, lag: "0-24h" },
  { name: "humidity_relative_min", source: "SENSOR", sourceColor: C.accent, type: "Contínuo", importance: 76, lag: "0-24h" },
  { name: "pressure_trend_48h", source: "DERIVADO", sourceColor: C.purple, type: "Contínuo", importance: 74, lag: "48h" },
  { name: "rainfall_accum_30d", source: "SENSOR", sourceColor: C.accent, type: "Contínuo", importance: 72, lag: "30d" },
  { name: "soil_temp_gradient", source: "DERIVADO", sourceColor: C.purple, type: "Contínuo", importance: 68, lag: "24h" },
  { name: "wind_speed_avg", source: "SENSOR", sourceColor: C.accent, type: "Contínuo", importance: 55, lag: "0-24h" },
  { name: "cloud_cover_pct", source: "SATÉLITE", sourceColor: C.rain, type: "Contínuo", importance: 52, lag: "7d" },
  { name: "salinity_level", source: "SENSOR", sourceColor: C.accent, type: "Contínuo", importance: 48, lag: "0-24h" },
  { name: "day_of_year_sin", source: "TEMPORAL", sourceColor: C.warn, type: "Cíclico", importance: 65, lag: "—" },
  { name: "day_of_year_cos", source: "TEMPORAL", sourceColor: C.warn, type: "Cíclico", importance: 65, lag: "—" },
  { name: "season_encoded", source: "TEMPORAL", sourceColor: C.warn, type: "Categórico", importance: 60, lag: "—" },
  { name: "drought_streak_days", source: "DERIVADO", sourceColor: C.purple, type: "Contínuo", importance: 80, lag: "real-time" },
  { name: "spi_30d", source: "DERIVADO", sourceColor: C.purple, type: "Contínuo", importance: 86, lag: "30d" },
  { name: "albedo_surface", source: "SATÉLITE", sourceColor: C.rain, type: "Contínuo", importance: 45, lag: "7d" },
];

export default function MLLogicRecommendation() {
  const [activeSection, setActiveSection] = useState("pipeline");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.bg, color: C.text, fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&display=swap');
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, padding: "14px 20px", background: `linear-gradient(135deg, ${C.panel}, ${C.panelLight})`, borderRadius: 12, border: `1px solid ${C.border}` }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: `linear-gradient(135deg, ${C.purple}, ${C.rain})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🧠</div>
        <div>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 800, fontFamily: mono, background: `linear-gradient(135deg, ${C.purple}, ${C.rain})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: 0.5 }}>
            LÓGICA DE MACHINE LEARNING
          </h1>
          <p style={{ margin: 0, fontSize: 11, color: C.dim, letterSpacing: 0.5 }}>
            Arquitetura Recomendada — Previsão de Seca e Chuva com Dados de Sensores + Satélite
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: `1px solid ${activeSection === s.id ? C.purple : C.border}`,
              backgroundColor: activeSection === s.id ? C.purpleDim : "transparent",
              color: activeSection === s.id ? C.purple : C.dim,
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: mono,
              letterSpacing: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 6,
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            <span>{s.icon}</span> {s.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ animation: "fadeIn 0.3s ease" }}>

        {/* ========== PIPELINE ========== */}
        {activeSection === "pipeline" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Panel title="Arquitetura do Pipeline ML" icon="🔄" accent={C.purple}>
              <p style={{ fontSize: 12, color: C.dim, lineHeight: 1.7, margin: "0 0 16px" }}>
                A lógica recomendada segue um pipeline híbrido de 3 camadas: modelos clássicos para robustez, redes neurais para captura de padrões temporais, e um meta-learner para combinar ambos. Esse design equilibra interpretabilidade com performance preditiva.
              </p>

              {/* Architecture Flow */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { phase: "FASE 1", title: "Coleta & Ingestão", items: ["Sensores IoT (15 min)", "Satélite (semanal)", "Estações meteo (horário)"], color: C.accent, icon: "📡" },
                  { phase: "FASE 2", title: "Pré-Processamento", items: ["Limpeza de outliers (IQR + Z-score)", "Imputação de dados faltantes (KNN)", "Normalização (RobustScaler)"], color: C.rain, icon: "🔧" },
                  { phase: "FASE 3", title: "Feature Engineering", items: ["Features temporais (lags, rolling stats)", "Features derivadas (SPI, deltas)", "Encoding cíclico (sin/cos)"], color: C.warn, icon: "⚙️" },
                  { phase: "FASE 4", title: "Modelagem Ensemble", items: ["Random Forest (classificação base)", "XGBoost (gradiente boosting)", "LSTM (séries temporais)"], color: C.purple, icon: "🧠" },
                  { phase: "FASE 5", title: "Meta-Learning & Output", items: ["Stacking (Logistic Regression meta)", "Calibração de probabilidades (Platt)", "Alertas + API de previsões"], color: C.danger, icon: "🎯" },
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 30, flexShrink: 0 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 6, background: `${p.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{p.icon}</div>
                      {i < 4 && <div style={{ flex: 1, width: 2, background: `linear-gradient(${p.color}44, transparent)`, marginTop: 4 }} />}
                    </div>
                    <div style={{ flex: 1, background: C.bg, borderRadius: 8, padding: "10px 14px", border: `1px solid ${C.border}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <Badge text={p.phase} color={p.color} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{p.title}</span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {p.items.map((item, j) => (
                          <span key={j} style={{ fontSize: 10, color: C.dim, background: C.panelLight, padding: "3px 8px", borderRadius: 4 }}>{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Estratégia de Ensemble: Por que Híbrido?" icon="🏗" accent={C.warn}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  {
                    model: "Random Forest",
                    role: "Base Robusta",
                    pros: ["Resistente a overfitting", "Lida com features mistas", "Feature importance nativa", "Bom com dados faltantes"],
                    cons: ["Não captura sequências temporais", "Limites em extrapolação"],
                    color: C.green,
                  },
                  {
                    model: "XGBoost",
                    role: "Precisão Tabular",
                    pros: ["Estado da arte em dados tabulares", "Regularização L1/L2 embutida", "Rápido em produção", "Trata desbalanceamento"],
                    cons: ["Hiperparâmetros sensíveis", "Pode overfittar séries curtas"],
                    color: C.warn,
                  },
                  {
                    model: "LSTM",
                    role: "Padrões Temporais",
                    pros: ["Captura dependências longas", "Aprende sazonalidade complexa", "Memória de longo prazo", "Padrões não-lineares"],
                    cons: ["Requer mais dados", "Treinamento custoso", "Menos interpretável"],
                    color: C.purple,
                  },
                ].map((m, i) => (
                  <div key={i} style={{ background: C.bg, borderRadius: 8, border: `1px solid ${C.border}`, padding: 14, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: m.color }} />
                    <div style={{ fontSize: 13, fontWeight: 700, color: m.color, fontFamily: mono, marginBottom: 2 }}>{m.model}</div>
                    <div style={{ fontSize: 10, color: C.dim, marginBottom: 10 }}>{m.role}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.green, marginBottom: 4 }}>✓ Vantagens</div>
                    {m.pros.map((p, j) => (
                      <div key={j} style={{ fontSize: 10, color: C.dim, padding: "2px 0", paddingLeft: 10, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: C.green }}>›</span> {p}
                      </div>
                    ))}
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.danger, marginBottom: 4, marginTop: 8 }}>✗ Limitações</div>
                    {m.cons.map((c, j) => (
                      <div key={j} style={{ fontSize: 10, color: C.dim, padding: "2px 0", paddingLeft: 10, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: C.danger }}>›</span> {c}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, padding: "10px 14px", background: `${C.purple}11`, borderRadius: 8, border: `1px solid ${C.purple}33` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.purple, fontFamily: mono, marginBottom: 4 }}>💡 META-LEARNER (STACKING)</div>
                <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6 }}>
                  Uma Logistic Regression (ou LightGBM leve) recebe as probabilidades dos 3 modelos como input e aprende o peso ideal de cada um por região e estação do ano. Isso permite que o LSTM domine em períodos de transição sazonal, enquanto RF/XGBoost são mais confiáveis para condições estáveis.
                </div>
              </div>
            </Panel>
          </div>
        )}

        {/* ========== FEATURES ========== */}
        {activeSection === "features" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Panel title="Feature Engineering — 18 Variáveis Recomendadas" icon="📊" accent={C.accent}>
              <FeatureTable features={features} />
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                {[
                  { label: "SENSOR", color: C.accent, count: 7 },
                  { label: "SATÉLITE", color: C.rain, count: 4 },
                  { label: "DERIVADO", color: C.purple, count: 5 },
                  { label: "TEMPORAL", color: C.warn, count: 3 },
                ].map((g) => (
                  <div key={g.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Badge text={g.label} color={g.color} />
                    <span style={{ fontSize: 10, color: C.dim }}>{g.count} vars</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Lógica de Feature Engineering" icon="⚙️" accent={C.warn}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <StepCard number="A" title="Features Temporais (Lags)" description="Criar janelas deslizantes com estatísticas de cada sensor para capturar tendências." color={C.accent} tags={["CRÍTICO"]}>
                  <CodeBlock code={`# Rolling statistics para cada sensor
for col in sensor_columns:
    for window in [3, 7, 14, 30]:
        df[f'{col}_mean_{window}d'] = (
            df[col].rolling(window).mean()
        )
        df[f'{col}_std_{window}d'] = (
            df[col].rolling(window).std()
        )
        df[f'{col}_delta_{window}d'] = (
            df[col] - df[col].shift(window)
        )

# Taxa de variação (derivada discreta)
df[f'{col}_rate'] = df[col].diff() / dt`} />
                </StepCard>

                <StepCard number="B" title="SPI — Índice de Precipitação Padronizado" description="Métrica meteorológica padrão para quantificar anomalias de precipitação em diferentes escalas." color={C.rain} tags={["ESSENCIAL"]}>
                  <CodeBlock code={`from scipy.stats import gamma, norm

def calc_spi(precip_series, window=30):
    """SPI: compara chuva observada vs
    distribuição histórica (Gamma → Normal)"""
    rolling = precip_series.rolling(window).sum()
    
    # Ajusta distribuição Gamma
    params = gamma.fit(rolling.dropna(), floc=0)
    
    # Transforma para Normal padrão
    cdf_vals = gamma.cdf(rolling, *params)
    spi = norm.ppf(cdf_vals)
    return spi  # < -1.5 = seca severa

df['spi_30d'] = calc_spi(df['rainfall'], 30)
df['spi_90d'] = calc_spi(df['rainfall'], 90)`} />
                </StepCard>

                <StepCard number="C" title="Encoding Temporal Cíclico" description="Converte dia do ano em representação sin/cos para preservar continuidade (dez 31 → jan 1)." color={C.warn} tags={["TEMPORAL"]}>
                  <CodeBlock code={`import numpy as np

# Encoding cíclico — preserva proximidade
# (dia 365 fica próximo de dia 1)
df['day_sin'] = np.sin(
    2 * np.pi * df['day_of_year'] / 365
)
df['day_cos'] = np.cos(
    2 * np.pi * df['day_of_year'] / 365
)

# Mês cíclico
df['month_sin'] = np.sin(
    2 * np.pi * df['month'] / 12
)
df['month_cos'] = np.cos(
    2 * np.pi * df['month'] / 12
)`} />
                </StepCard>

                <StepCard number="D" title="Features de Interação Sensor-Satélite" description="Combinações não-lineares entre dados de campo e dados orbitais para capturar sinais compostos." color={C.purple} tags={["AVANÇADO"]}>
                  <CodeBlock code={`# Índice de stress hídrico composto
df['water_stress_idx'] = (
    (1 - df['soil_moisture']/100) *
    df['evapotranspiration'] *
    (1 - df['ndvi_index'])
)

# Razão solo/ar (indica desacoplamento)
df['soil_air_ratio'] = (
    df['soil_temp'] / df['temp_air']
)

# Déficit de pressão de vapor (VPD)
es = 0.6108 * np.exp(
    17.27*df['temp_air']/(df['temp_air']+237.3)
)
df['vpd'] = es * (1 - df['humidity']/100)

# Streak de dias sem chuva
df['dry_streak'] = (
    (df['rainfall'] == 0)
    .groupby((df['rainfall'] > 0).cumsum())
    .cumcount()
)`} />
                </StepCard>
              </div>
            </Panel>
          </div>
        )}

        {/* ========== MODELS ========== */}
        {activeSection === "models" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Panel title="Arquitetura dos Modelos" icon="🧠" accent={C.purple}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Random Forest + XGBoost */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.green, fontFamily: mono, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Camada 1 — Modelos Tabulares</div>

                  <StepCard number="RF" title="Random Forest Classifier" description="Classificação multiclasse: SECA_SEVERA, SECA_LEVE, NORMAL, CHUVA, CHUVA_FORTE" color={C.green} tags={["ROBUSTO"]}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {[
                        { p: "n_estimators", v: "500" },
                        { p: "max_depth", v: "12-18" },
                        { p: "min_samples_leaf", v: "20" },
                        { p: "class_weight", v: "balanced" },
                        { p: "max_features", v: "sqrt" },
                        { p: "bootstrap", v: "True" },
                      ].map((h) => (
                        <div key={h.p} style={{ background: C.bg, borderRadius: 4, padding: "4px 8px" }}>
                          <span style={{ fontSize: 9, color: C.dim }}>{h.p}: </span>
                          <span style={{ fontSize: 10, color: C.green, fontFamily: mono, fontWeight: 600 }}>{h.v}</span>
                        </div>
                      ))}
                    </div>
                  </StepCard>

                  <StepCard number="XG" title="XGBoost (Gradient Boosting)" description="Captura interações complexas entre features com regularização forte para evitar overfitting." color={C.warn} tags={["PRECISÃO"]}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {[
                        { p: "n_estimators", v: "800" },
                        { p: "max_depth", v: "6-8" },
                        { p: "learning_rate", v: "0.05" },
                        { p: "subsample", v: "0.8" },
                        { p: "colsample_bytree", v: "0.7" },
                        { p: "reg_alpha", v: "0.1" },
                        { p: "reg_lambda", v: "1.0" },
                        { p: "scale_pos_weight", v: "auto" },
                      ].map((h) => (
                        <div key={h.p} style={{ background: C.bg, borderRadius: 4, padding: "4px 8px" }}>
                          <span style={{ fontSize: 9, color: C.dim }}>{h.p}: </span>
                          <span style={{ fontSize: 10, color: C.warn, fontFamily: mono, fontWeight: 600 }}>{h.v}</span>
                        </div>
                      ))}
                    </div>
                  </StepCard>
                </div>

                {/* LSTM */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.purple, fontFamily: mono, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Camada 2 — Rede Neural Temporal</div>

                  <StepCard number="NN" title="Bidirectional LSTM + Attention" description="Rede recorrente bidirecional com mecanismo de atenção para pesar quais timesteps são mais relevantes." color={C.purple} tags={["DEEP LEARNING"]}>
                    <CodeBlock code={`Arquitetura LSTM:
┌─────────────────────────────────┐
│  Input: (batch, 30, 18)        │
│  30 dias × 18 features         │
├─────────────────────────────────┤
│  BiLSTM Layer 1 (128 units)    │
│  → Dropout(0.3)                │
├─────────────────────────────────┤
│  BiLSTM Layer 2 (64 units)     │
│  → Dropout(0.3)                │
├─────────────────────────────────┤
│  Attention Layer (self-attn)   │
│  → Weighted temporal context   │
├─────────────────────────────────┤
│  Dense(64) → ReLU → Drop(0.2) │
│  Dense(32) → ReLU              │
├─────────────────────────────────┤
│  Output: Dense(5) → Softmax    │
│  [SECA_SEV, SECA_L, NORM,     │
│   CHUVA, CHUVA_F]             │
└─────────────────────────────────┘`} />
                  </StepCard>

                  <div style={{ background: C.bg, borderRadius: 8, padding: 12, border: `1px solid ${C.border}`, marginTop: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.purple, fontFamily: mono, marginBottom: 6 }}>HIPERPARÂMETROS LSTM</div>
                    {[
                      { p: "Sequência", v: "30 dias (janela)" },
                      { p: "Horizonte", v: "7, 14, 21, 28 dias" },
                      { p: "Optimizer", v: "AdamW (lr=1e-3)" },
                      { p: "Scheduler", v: "CosineAnnealing" },
                      { p: "Loss", v: "Focal Loss (γ=2)" },
                      { p: "Batch", v: "64" },
                      { p: "Epochs", v: "100 (early stop)" },
                      { p: "Patience", v: "15 epochs" },
                    ].map((h) => (
                      <div key={h.p} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: 10, color: C.dim }}>{h.p}</span>
                        <span style={{ fontSize: 10, color: C.purple, fontFamily: mono }}>{h.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Meta-Learner */}
              <div style={{ marginTop: 16, padding: 14, background: `${C.danger}08`, borderRadius: 10, border: `1px solid ${C.danger}33` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.danger, fontFamily: mono, marginBottom: 8 }}>🎯 CAMADA 3 — META-LEARNER (STACKING)</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  <div style={{ background: C.bg, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.text, marginBottom: 6 }}>Input</div>
                    <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.5 }}>
                      15 probabilidades (5 classes × 3 modelos) + região + mês + métricas de confiança individual
                    </div>
                  </div>
                  <div style={{ background: C.bg, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.text, marginBottom: 6 }}>Modelo</div>
                    <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.5 }}>
                      Logistic Regression (C=1.0, multi_class='multinomial') ou LightGBM leve (max_depth=3, 50 trees)
                    </div>
                  </div>
                  <div style={{ background: C.bg, borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.text, marginBottom: 6 }}>Calibração</div>
                    <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.5 }}>
                      Platt Scaling (sigmoid) sobre as probabilidades finais para garantir calibração — P(seca=70%) realmente ocorre ~70% das vezes
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        )}

        {/* ========== TRAINING ========== */}
        {activeSection === "training" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Panel title="Estratégia de Treinamento" icon="⚡" accent={C.warn}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <StepCard number="1" title="Divisão Temporal dos Dados" description="NUNCA use random split em séries temporais. Use divisão cronológica para evitar data leakage." color={C.danger} tags={["CRÍTICO"]}>
                    <CodeBlock code={`# Divisão temporal estrita
# ❌ ERRADO: train_test_split(shuffle=True)
# ✅ CORRETO: divisão cronológica

train = df[df['date'] < '2024-06-01']
val   = df[(df['date'] >= '2024-06-01') 
         & (df['date'] < '2024-10-01')]
test  = df[df['date'] >= '2024-10-01']

# Proporção: ~60% train / 20% val / 20% test
# Gap de 7 dias entre sets (evita leakage)

# Cross-validation temporal
from sklearn.model_selection import TimeSeriesSplit
tscv = TimeSeriesSplit(n_splits=5, gap=7)`} />
                  </StepCard>

                  <StepCard number="2" title="Tratamento de Desbalanceamento" description="Eventos de seca severa são raros (~5-10%). Focal Loss + SMOTE temporal equilibram as classes." color={C.warn} tags={["IMPORTANTE"]}>
                    <CodeBlock code={`# Focal Loss — penaliza mais amostras fáceis
class FocalLoss(nn.Module):
    def __init__(self, gamma=2, alpha=None):
        super().__init__()
        self.gamma = gamma
        # alpha por classe: mais peso em seca
        self.alpha = alpha or torch.tensor(
            [3.0, 1.5, 1.0, 1.2, 2.0]
        )  # [seca_sev, seca_l, norm, chuva, chuva_f]
    
    def forward(self, pred, target):
        ce = F.cross_entropy(
            pred, target, reduction='none'
        )
        pt = torch.exp(-ce)
        focal = self.alpha[target] * \\
                (1-pt)**self.gamma * ce
        return focal.mean()

# Para RF/XGBoost: class_weight='balanced'
# + SMOTE apenas no treino (nunca val/test)`} />
                  </StepCard>
                </div>

                <div>
                  <StepCard number="3" title="Otimização de Hiperparâmetros" description="Optuna com pruning para busca eficiente no espaço de hiperparâmetros dos 3 modelos." color={C.purple} tags={["OPTUNA"]}>
                    <CodeBlock code={`import optuna

def objective(trial):
    # Hiperparâmetros do XGBoost
    params = {
        'max_depth': trial.suggest_int(
            'max_depth', 4, 10
        ),
        'learning_rate': trial.suggest_float(
            'lr', 1e-3, 0.3, log=True
        ),
        'subsample': trial.suggest_float(
            'subsample', 0.6, 1.0
        ),
        'colsample_bytree': trial.suggest_float(
            'colsample', 0.5, 1.0
        ),
        'reg_alpha': trial.suggest_float(
            'alpha', 1e-3, 10, log=True
        ),
    }
    
    model = XGBClassifier(**params)
    
    # TimeSeriesSplit CV
    scores = cross_val_score(
        model, X_train, y_train,
        cv=tscv, scoring='f1_weighted'
    )
    return scores.mean()

study = optuna.create_study(
    direction='maximize',
    pruner=optuna.pruners.MedianPruner()
)
study.optimize(objective, n_trials=200)`} />
                  </StepCard>

                  <StepCard number="4" title="Métricas de Avaliação" description="F1-Score ponderado como métrica principal + métricas específicas para eventos extremos." color={C.green} tags={["MÉTRICAS"]}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {[
                        { m: "F1 Weighted", v: "Métrica principal (global)", c: C.green },
                        { m: "Recall Seca", v: "> 85% (não perder evento)", c: C.danger },
                        { m: "Precision Chuva", v: "> 80% (evitar falso +)", c: C.rain },
                        { m: "Brier Score", v: "Calibração probabilística", c: C.purple },
                        { m: "AUC-ROC", v: "Por classe (one-vs-rest)", c: C.warn },
                        { m: "Lead Time", v: "Antecedência média (dias)", c: C.accent },
                      ].map((m) => (
                        <div key={m.m} style={{ background: C.bg, borderRadius: 6, padding: "8px 10px", border: `1px solid ${C.border}` }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: m.c, fontFamily: mono }}>{m.m}</div>
                          <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{m.v}</div>
                        </div>
                      ))}
                    </div>
                  </StepCard>
                </div>
              </div>
            </Panel>

            <Panel title="Monitoramento Pós-Deploy" icon="📡" accent={C.accent}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { title: "Data Drift", desc: "PSI (Population Stability Index) semanal em cada feature. Se PSI > 0.2, trigger de retreino automático.", color: C.danger, icon: "📉" },
                  { title: "Model Drift", desc: "Monitorar F1-score em janela deslizante de 30 dias. Queda > 5% dispara alerta e retreino programado.", color: C.warn, icon: "🔔" },
                  { title: "Retreino", desc: "Retreino incremental mensal com dados novos. Retreino completo trimestral. A/B test antes de promover novo modelo.", color: C.green, icon: "🔄" },
                ].map((m) => (
                  <div key={m.title} style={{ background: C.bg, borderRadius: 8, padding: 14, border: `1px solid ${C.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 16 }}>{m.icon}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: m.color }}>{m.title}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6 }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* ========== DEPLOY ========== */}
        {activeSection === "deploy" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Panel title="Arquitetura de Deploy" icon="🚀" accent={C.green}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <StepCard number="A" title="Edge Computing (Microcontrolador)" description="Modelo leve TinyML rodando diretamente no ESP32/STM32 para inferência local rápida e alertas sem internet." color={C.accent} tags={["EDGE", "ESP32"]}>
                  <CodeBlock code={`# Modelo para edge: Decision Tree podado
# ou RF com 10 árvores (cabe em 512KB)

# Converter para C com micromlgen
from micromlgen import port
clf_tiny = RandomForestClassifier(
    n_estimators=10, max_depth=6
)
clf_tiny.fit(X_train_reduced, y_train)

# Exportar para C header
c_code = port(clf_tiny)
with open('model.h', 'w') as f:
    f.write(c_code)

# No ESP32: inferência em ~5ms
# Alerta local se P(seca) > 60%`} />
                </StepCard>

                <StepCard number="B" title="Cloud Pipeline" description="Modelos completos (ensemble) rodam no servidor para previsões de alta precisão com todos os dados." color={C.rain} tags={["CLOUD", "API"]}>
                  <CodeBlock code={`# API FastAPI para inferência
from fastapi import FastAPI

app = FastAPI()

@app.post("/predict")
async def predict(data: SensorPayload):
    # 1. Feature engineering
    features = engineer_features(data)
    
    # 2. Ensemble prediction
    rf_probs = rf_model.predict_proba(features)
    xgb_probs = xgb_model.predict_proba(features)
    lstm_probs = lstm_predict(features_seq)
    
    # 3. Meta-learner
    meta_input = np.concatenate([
        rf_probs, xgb_probs, lstm_probs,
        region_encoded, month_encoded
    ])
    final = meta_model.predict_proba(meta_input)
    
    # 4. Calibração
    calibrated = calibrator.predict_proba(final)
    
    return {
        "predictions": format_predictions(
            calibrated
        ),
        "confidence": calc_confidence(
            rf_probs, xgb_probs, lstm_probs
        ),
        "alerts": generate_alerts(calibrated)
    }`} />
                </StepCard>
              </div>

              <div style={{ marginTop: 14, background: C.bg, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.text, fontFamily: mono, marginBottom: 10, textTransform: "uppercase" }}>Fluxo Edge ↔ Cloud</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  {[
                    { label: "Sensor lê dados", color: C.accent },
                    { label: "ESP32 infere local", color: C.warn },
                    { label: "Alerta rápido (< 1s)", color: C.danger },
                    { label: "Dados → LoRaWAN", color: C.purple },
                    { label: "Gateway → MQTT", color: C.rain },
                    { label: "Cloud processa ensemble", color: C.green },
                    { label: "Previsão 4 semanas", color: C.danger },
                    { label: "Dashboard + alertas", color: C.accent },
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ padding: "5px 10px", borderRadius: 6, background: `${s.color}18`, border: `1px solid ${s.color}33`, fontSize: 10, color: s.color, fontWeight: 600, whiteSpace: "nowrap" }}>
                        {s.label}
                      </div>
                      {i < 7 && <span style={{ color: C.muted, fontSize: 12 }}>→</span>}
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            <Panel title="Stack Tecnológico Recomendado" icon="🛠" accent={C.warn}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
                {[
                  { cat: "ML Framework", items: ["scikit-learn", "XGBoost", "PyTorch", "Optuna"], color: C.purple },
                  { cat: "Data Pipeline", items: ["Apache Airflow", "Pandas", "DVC (versionamento)", "PostgreSQL + TimescaleDB"], color: C.rain },
                  { cat: "Serving", items: ["FastAPI", "Docker", "ONNX Runtime", "Redis (cache)"], color: C.green },
                  { cat: "Edge / IoT", items: ["ESP32-S3", "micromlgen", "LoRaWAN", "MQTT (Mosquitto)"], color: C.warn },
                ].map((s) => (
                  <div key={s.cat} style={{ background: C.bg, borderRadius: 8, padding: 12, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: s.color, fontFamily: mono, marginBottom: 8, textTransform: "uppercase" }}>{s.cat}</div>
                    {s.items.map((item) => (
                      <div key={item} style={{ fontSize: 11, color: C.dim, padding: "3px 0", display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: s.color, flexShrink: 0 }} />
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* ========== CODE ========== */}
        {activeSection === "code" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Panel title="Implementação Completa — Pipeline de Treinamento" icon="💻" accent={C.accent}>
              <CodeBlock code={`"""
Pipeline ML Completo — Previsão de Seca/Chuva
Terrain Recognition System
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import TimeSeriesSplit
from sklearn.preprocessing import RobustScaler
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import classification_report, f1_score
from xgboost import XGBClassifier
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset

# ============================================================
# 1. CONFIGURAÇÃO
# ============================================================
CLASSES = ['SECA_SEVERA', 'SECA_LEVE', 'NORMAL', 'CHUVA', 'CHUVA_FORTE']
SEQ_LEN = 30        # 30 dias de histórico
HORIZONS = [7, 14, 21, 28]  # previsão em dias
SEED = 42

# ============================================================
# 2. FEATURE ENGINEERING
# ============================================================
def build_features(df):
    """Constrói 18+ features a partir dos dados brutos dos sensores."""
    sensor_cols = ['temp_air', 'humidity', 'pressure', 'soil_moisture',
                   'soil_temp', 'salinity', 'wind_speed', 'rainfall']
    
    # 2a. Rolling statistics (janelas deslizantes)
    for col in sensor_cols:
        for w in [3, 7, 14, 30]:
            df[f'{col}_mean_{w}d'] = df[col].rolling(w).mean()
            df[f'{col}_std_{w}d'] = df[col].rolling(w).std()
            df[f'{col}_delta_{w}d'] = df[col] - df[col].shift(w)
    
    # 2b. SPI (Standardized Precipitation Index)
    from scipy.stats import gamma, norm
    for window in [30, 90]:
        rolling_rain = df['rainfall'].rolling(window).sum()
        params = gamma.fit(rolling_rain.dropna(), floc=0)
        cdf = gamma.cdf(rolling_rain, *params)
        df[f'spi_{window}d'] = norm.ppf(cdf)
    
    # 2c. Features compostas (interação sensor × satélite)
    df['water_stress'] = ((1 - df['soil_moisture']/100)
                          * df['evapotranspiration']
                          * (1 - df['ndvi']))
    df['soil_air_ratio'] = df['soil_temp'] / df['temp_air']
    
    # VPD (Vapor Pressure Deficit)
    es = 0.6108 * np.exp(17.27*df['temp_air'] / (df['temp_air']+237.3))
    df['vpd'] = es * (1 - df['humidity']/100)
    
    # Streak de dias sem chuva
    df['dry_streak'] = ((df['rainfall']==0)
        .groupby((df['rainfall']>0).cumsum()).cumcount())
    
    # 2d. Encoding temporal cíclico
    doy = df.index.dayofyear
    df['day_sin'] = np.sin(2 * np.pi * doy / 365)
    df['day_cos'] = np.cos(2 * np.pi * doy / 365)
    
    return df.dropna()

# ============================================================
# 3. LABELS (TARGET)
# ============================================================
def create_labels(df, horizon=14):
    """Cria labels baseadas em condições futuras."""
    future_rain = df['rainfall'].rolling(horizon).sum().shift(-horizon)
    future_soil = df['soil_moisture'].shift(-horizon)
    
    conditions = [
        (future_rain < 5)  & (future_soil < 15),   # SECA_SEVERA
        (future_rain < 20) & (future_soil < 30),   # SECA_LEVE
        (future_rain >= 20) & (future_rain < 80),  # NORMAL
        (future_rain >= 80) & (future_rain < 150),  # CHUVA
        (future_rain >= 150),                        # CHUVA_FORTE
    ]
    df['target'] = np.select(conditions, range(5), default=2)
    return df.dropna()

# ============================================================
# 4. MODELO LSTM
# ============================================================
class BiLSTMAttention(nn.Module):
    def __init__(self, input_dim, hidden=128, n_classes=5):
        super().__init__()
        self.lstm1 = nn.LSTM(input_dim, hidden, batch_first=True, bidirectional=True)
        self.drop1 = nn.Dropout(0.3)
        self.lstm2 = nn.LSTM(hidden*2, 64, batch_first=True, bidirectional=True)
        self.drop2 = nn.Dropout(0.3)
        
        # Attention
        self.attn = nn.Sequential(
            nn.Linear(128, 64), nn.Tanh(), nn.Linear(64, 1)
        )
        
        self.fc = nn.Sequential(
            nn.Linear(128, 64), nn.ReLU(), nn.Dropout(0.2),
            nn.Linear(64, 32), nn.ReLU(),
            nn.Linear(32, n_classes)
        )
    
    def forward(self, x):
        out, _ = self.lstm1(x)
        out = self.drop1(out)
        out, _ = self.lstm2(out)
        out = self.drop2(out)
        
        # Self-attention: quais timesteps importam mais?
        weights = self.attn(out).squeeze(-1)
        weights = torch.softmax(weights, dim=1)
        context = torch.bmm(weights.unsqueeze(1), out).squeeze(1)
        
        return self.fc(context)

# ============================================================
# 5. PIPELINE COMPLETO
# ============================================================
def train_ensemble(df, horizon=14):
    df = build_features(df)
    df = create_labels(df, horizon)
    
    feature_cols = [c for c in df.columns 
                    if c not in ['target', 'date', 'rainfall']]
    
    # Divisão temporal
    split1 = int(len(df) * 0.6)
    split2 = int(len(df) * 0.8)
    train, val, test = df[:split1], df[split1:split2], df[split2:]
    
    scaler = RobustScaler()
    X_train = scaler.fit_transform(train[feature_cols])
    X_val = scaler.transform(val[feature_cols])
    X_test = scaler.transform(test[feature_cols])
    
    y_train, y_val, y_test = train['target'], val['target'], test['target']
    
    # --- Random Forest ---
    rf = RandomForestClassifier(
        n_estimators=500, max_depth=15,
        min_samples_leaf=20, class_weight='balanced',
        random_state=SEED, n_jobs=-1
    )
    rf.fit(X_train, y_train)
    
    # --- XGBoost ---
    xgb = XGBClassifier(
        n_estimators=800, max_depth=7,
        learning_rate=0.05, subsample=0.8,
        colsample_bytree=0.7, reg_alpha=0.1,
        reg_lambda=1.0, random_state=SEED
    )
    xgb.fit(X_train, y_train, 
            eval_set=[(X_val, y_val)],
            verbose=False)
    
    # --- LSTM (sequências) ---
    # [preparação de sequências e treinamento PyTorch]
    
    # --- Meta-Learner ---
    rf_probs = rf.predict_proba(X_val)
    xgb_probs = xgb.predict_proba(X_val)
    # lstm_probs = ... (inferência no val set)
    
    meta_X = np.hstack([rf_probs, xgb_probs])  # + lstm_probs
    meta = LogisticRegression(C=1.0, multi_class='multinomial')
    meta.fit(meta_X, y_val)
    
    # Calibração final
    calibrated = CalibratedClassifierCV(meta, method='sigmoid', cv=3)
    calibrated.fit(meta_X, y_val)
    
    # Avaliação
    test_meta_X = np.hstack([
        rf.predict_proba(X_test),
        xgb.predict_proba(X_test)
    ])
    y_pred = calibrated.predict(test_meta_X)
    print(classification_report(y_test, y_pred, target_names=CLASSES))
    
    return {
        'rf': rf, 'xgb': xgb, 'meta': calibrated,
        'scaler': scaler, 'feature_cols': feature_cols
    }`} />
            </Panel>

            <Panel title="Resumo de Decisões-Chave" icon="📋" accent={C.danger}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[
                  { q: "Por que ensemble e não modelo único?", a: "Cada modelo captura padrões diferentes. RF é robusto a ruído, XGBoost encontra interações complexas, LSTM aprende dinâmica temporal. O meta-learner aprende quando confiar em cada um.", color: C.purple },
                  { q: "Por que Focal Loss no LSTM?", a: "Seca severa é ~5% dos dados. Cross-entropy padrão ignoraria eventos raros. Focal Loss foca nas amostras difíceis com γ=2, aumentando recall de eventos extremos.", color: C.danger },
                  { q: "Por que SPI como feature?", a: "É o padrão meteorológico usado pela WMO. Normaliza precipitação pela distribuição local, permitindo comparar regiões com regimes de chuva diferentes (Cerrado vs Vale).", color: C.rain },
                  { q: "Por que edge + cloud?", a: "Edge dá alertas em < 1s sem internet (crucial para áreas rurais). Cloud processa o ensemble completo com dados de satélite para previsões de alta precisão.", color: C.accent },
                  { q: "Por que TimeSeriesSplit?", a: "Random split em dados temporais causa data leakage — o modelo 'vê o futuro' no treino. Divisão cronológica garante avaliação realista de performance preditiva.", color: C.warn },
                  { q: "Quando retreinar?", a: "Monitorar PSI > 0.2 (data drift) e F1 drop > 5% (model drift). Retreino incremental mensal, completo trimestral. Sempre com A/B test antes de promover.", color: C.green },
                ].map((d) => (
                  <div key={d.q} style={{ background: C.bg, borderRadius: 8, padding: 12, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: d.color, marginBottom: 6 }}>{d.q}</div>
                    <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.6 }}>{d.a}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}
      </div>
    </div>
  );
}
