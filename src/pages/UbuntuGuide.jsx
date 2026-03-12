import { useState } from "react";

const C = {
  bg: "#080c14", panel: "#0f1520", panelLight: "#161e2e", border: "#1c2840",
  accent: "#22d3a7", accentDim: "#22d3a716", warn: "#eab308", warnDim: "#eab30816",
  danger: "#f43f5e", dangerDim: "#f43f5e16", rain: "#38bdf8", rainDim: "#38bdf816",
  text: "#e4e8f0", dim: "#7a8ba8", muted: "#4a5872", green: "#34d399",
  purple: "#a78bfa", purpleDim: "#a78bfa16", orange: "#fb923c",
};
const mono = "'JetBrains Mono',monospace";

const Code = ({ code, title, lang }) => (
  <div style={{ marginTop: title ? 8 : 0 }}>
    {title && (
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 9, color: C.muted, fontFamily: mono, textTransform: "uppercase", letterSpacing: 1 }}>{title}</span>
        {lang && <span style={{ fontSize: 8, padding: "1px 6px", borderRadius: 3, background: `${C.purple}22`, color: C.purple, fontFamily: mono }}>{lang}</span>}
      </div>
    )}
    <pre style={{ background: "#060a12", border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, margin: 0, overflow: "auto", fontSize: 11, lineHeight: 1.7, fontFamily: mono, color: "#c9d1d9" }}><code>{code}</code></pre>
  </div>
);

const Panel = ({ title, icon, accent, tag, children }) => (
  <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, position: "relative", overflow: "hidden" }}>
    {accent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${accent},transparent)` }} />}
    {title && (
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 15 }}>{icon}</span>
        <h3 style={{ margin: 0, fontSize: 12, fontWeight: 700, color: C.text, textTransform: "uppercase", letterSpacing: 1.1, fontFamily: mono }}>{title}</h3>
        {tag && <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: `${accent}22`, color: accent, fontFamily: mono }}>{tag}</span>}
      </div>
    )}
    {children}
  </div>
);

const Step = ({ n, title, desc, color, children }) => (
  <div style={{ background: C.panelLight, borderRadius: 10, border: `1px solid ${C.border}`, padding: 16, position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", backgroundColor: color }} />
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color, fontFamily: mono }}>{n}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{title}</div>
    </div>
    {desc && <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6, marginBottom: children ? 10 : 0 }}>{desc}</div>}
    {children}
  </div>
);

const methods = [
  { id: "vite", label: "Vite (Recomendado)", icon: "⚡" },
  { id: "cra", label: "Create React App", icon: "⚛️" },
  { id: "next", label: "Next.js", icon: "▲" },
  { id: "quick", label: "Sem Instalar Nada", icon: "🚀" },
];

export default function UbuntuJSXGuide() {
  const [active, setActive] = useState("vite");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI',system-ui,sans-serif", padding: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, padding: "12px 18px", background: C.panel, borderRadius: 12, border: `1px solid ${C.border}` }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg,${C.orange},${C.warn})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🐧</div>
        <div>
          <h1 style={{ margin: 0, fontSize: 16, fontWeight: 800, fontFamily: mono, background: `linear-gradient(135deg,${C.orange},${C.warn})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RODAR .JSX NO UBUNTU</h1>
          <p style={{ margin: 0, fontSize: 10, color: C.dim }}>Guia completo — do zero ao projeto rodando no navegador</p>
        </div>
      </div>

      {/* Pré-requisito: Node.js */}
      <Panel title="Pré-Requisito: Instalar Node.js" icon="📦" accent={C.green} tag="OBRIGATÓRIO">
        <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6, marginBottom: 10 }}>
          Todos os métodos abaixo precisam do Node.js instalado. Se você já tem, pule este passo. Caso contrário, abra o Terminal (<strong style={{ color: C.text }}>Ctrl + Alt + T</strong>) e rode:
        </div>
        <Code title="Opção A — via NVM (recomendado)" lang="bash" code={`# 1. Instalar NVM (gerenciador de versões do Node)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# 2. Fechar e reabrir o terminal, depois rodar:
nvm install --lts

# 3. Verificar instalação
node -v    # deve mostrar v22.x.x ou superior
npm -v     # deve mostrar 10.x.x ou superior`} />
        <Code title="Opção B — via apt (mais simples)" lang="bash" code={`# Instalar Node.js 22 direto do repositório NodeSource
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar
node -v
npm -v`} />
      </Panel>

      {/* Method selector */}
      <div style={{ display: "flex", gap: 6, margin: "16px 0", overflowX: "auto" }}>
        {methods.map((m) => (
          <button key={m.id} onClick={() => setActive(m.id)} style={{
            padding: "8px 16px", borderRadius: 8,
            border: `1px solid ${active === m.id ? C.accent : C.border}`,
            background: active === m.id ? C.accentDim : "transparent",
            color: active === m.id ? C.accent : C.dim,
            cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: mono,
            whiteSpace: "nowrap", transition: "all .2s", display: "flex", alignItems: "center", gap: 6,
          }}>
            <span>{m.icon}</span>{m.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeIn .3s ease" }}>

        {/* ==================== VITE ==================== */}
        {active === "vite" && (<>
          <Panel title="Método 1 — Vite + React" icon="⚡" accent={C.accent} tag="RECOMENDADO">
            <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6, marginBottom: 14 }}>
              O Vite é o bundler mais rápido e moderno. Cria um projeto React completo em segundos, com hot reload instantâneo. Este é o método ideal para rodar os 3 arquivos .jsx que criamos.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Step n="1" title="Criar o projeto" color={C.accent}>
                <Code lang="bash" code={`# Abrir Terminal (Ctrl + Alt + T)
# Navegar para onde quer criar o projeto
cd ~/Documentos

# Criar projeto Vite com React
npm create vite@latest terrain-system -- --template react

# Entrar na pasta
cd terrain-system

# Instalar dependências
npm install`} />
              </Step>

              <Step n="2" title="Instalar bibliotecas usadas nos dashboards" color={C.rain}>
                <Code lang="bash" code={`# Recharts (gráficos) + Lucide (ícones)
npm install recharts lucide-react`} />
              </Step>

              <Step n="3" title="Copiar seu arquivo .jsx para o projeto" color={C.warn}>
                <Code lang="bash" code={`# Copiar o arquivo do dashboard para a pasta src/
# (ajuste o caminho de onde está seu arquivo baixado)

cp ~/Downloads/terrain-recognition-system.jsx src/TerrainSystem.jsx
cp ~/Downloads/ml-logic-recommendation.jsx src/MLLogic.jsx
cp ~/Downloads/implementation-guide.jsx src/ImplGuide.jsx`} />
              </Step>

              <Step n="4" title="Editar o App.jsx para carregar seu componente" color={C.purple} desc="Abra o arquivo src/App.jsx em qualquer editor de texto e substitua todo o conteúdo por:">
                <Code lang="jsx" code={`// src/App.jsx
// Escolha qual dashboard quer ver (descomente a linha):

import TerrainSystem from './TerrainSystem'
// import MLLogic from './MLLogic'
// import ImplGuide from './ImplGuide'

function App() {
  return <TerrainSystem />
  // return <MLLogic />
  // return <ImplGuide />
}

export default App`} />
                <div style={{ marginTop: 8, fontSize: 10, color: C.dim, lineHeight: 1.5, padding: "8px 12px", background: `${C.warn}08`, borderRadius: 6, border: `1px solid ${C.warn}22` }}>
                  <strong style={{ color: C.warn }}>Dica:</strong> Para trocar de dashboard, comente/descomente as linhas de import e return. Só pode ter um ativo por vez.
                </div>
              </Step>

              <Step n="5" title="Rodar o projeto!" color={C.green}>
                <Code lang="bash" code={`# Iniciar o servidor de desenvolvimento
npm run dev`} />
                <div style={{ marginTop: 10, padding: "12px 16px", background: `${C.green}11`, borderRadius: 8, border: `1px solid ${C.green}33` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.green, fontFamily: mono, marginBottom: 4 }}>✅ PRONTO!</div>
                  <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6 }}>
                    O terminal vai mostrar algo como:<br />
                    <code style={{ color: C.accent, fontFamily: mono }}>Local: http://localhost:5173/</code><br /><br />
                    Abra esse link no navegador (Firefox ou Chrome). O dashboard vai aparecer! Qualquer alteração no código atualiza automaticamente no navegador.
                  </div>
                </div>
              </Step>

              <Step n="6" title="Parar o servidor" color={C.danger}>
                <Code lang="bash" code={`# No terminal onde o servidor está rodando:
# Pressione Ctrl + C para parar

# Para rodar novamente depois:
cd ~/Documentos/terrain-system
npm run dev`} />
              </Step>
            </div>
          </Panel>

          <Panel title="Resumo Completo — Copiar e Colar" icon="📋" accent={C.orange} tag="TUDO DE UMA VEZ">
            <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.5, marginBottom: 8 }}>
              Se preferir, cole tudo de uma vez no terminal:
            </div>
            <Code lang="bash" code={`# === SETUP COMPLETO (copie tudo e cole no terminal) ===

cd ~/Documentos
npm create vite@latest terrain-system -- --template react
cd terrain-system
npm install
npm install recharts lucide-react

# Copiar os dashboards baixados (ajuste os caminhos)
cp ~/Downloads/terrain-recognition-system.jsx src/TerrainSystem.jsx
cp ~/Downloads/ml-logic-recommendation.jsx src/MLLogic.jsx
cp ~/Downloads/implementation-guide.jsx src/ImplGuide.jsx

# Substituir App.jsx
cat > src/App.jsx << 'EOF'
import TerrainSystem from './TerrainSystem'

function App() {
  return <TerrainSystem />
}

export default App
EOF

# Rodar!
npm run dev`} />
          </Panel>
        </>)}

        {/* ==================== CRA ==================== */}
        {active === "cra" && (<>
          <Panel title="Método 2 — Create React App" icon="⚛️" accent={C.rain} tag="CLÁSSICO">
            <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6, marginBottom: 14 }}>
              O CRA é o método mais antigo e mais conhecido. É mais lento que o Vite, mas ainda funciona bem. Use se já tiver familiaridade com ele.
            </div>

            <Code lang="bash" code={`# Criar projeto
npx create-react-app terrain-system
cd terrain-system

# Instalar bibliotecas extras
npm install recharts lucide-react

# Copiar seus arquivos .jsx
cp ~/Downloads/terrain-recognition-system.jsx src/TerrainSystem.jsx
cp ~/Downloads/ml-logic-recommendation.jsx src/MLLogic.jsx
cp ~/Downloads/implementation-guide.jsx src/ImplGuide.jsx

# Editar src/App.js (note: .js, não .jsx no CRA)
cat > src/App.js << 'EOF'
import TerrainSystem from './TerrainSystem'

function App() {
  return <TerrainSystem />
}

export default App
EOF

# Rodar
npm start`} />
            <div style={{ marginTop: 10, padding: "10px 14px", background: `${C.rain}11`, borderRadius: 8, border: `1px solid ${C.rain}33` }}>
              <div style={{ fontSize: 11, color: C.dim }}>
                Abre em <code style={{ color: C.rain, fontFamily: mono }}>http://localhost:3000</code> (porta 3000, não 5173).
              </div>
            </div>
          </Panel>
        </>)}

        {/* ==================== NEXT ==================== */}
        {active === "next" && (<>
          <Panel title="Método 3 — Next.js" icon="▲" accent={C.purple} tag="FULLSTACK">
            <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6, marginBottom: 14 }}>
              Next.js é um framework React completo com server-side rendering. Use se planeja expandir o projeto para um app completo com API integrada.
            </div>

            <Code lang="bash" code={`# Criar projeto Next.js
npx create-next-app@latest terrain-system
# Quando perguntar:
#   TypeScript? → No
#   ESLint? → Yes
#   Tailwind? → Yes  (os dashboards usam Tailwind)
#   src/ directory? → Yes
#   App Router? → Yes

cd terrain-system

# Instalar bibliotecas
npm install recharts lucide-react

# Copiar seus arquivos
cp ~/Downloads/terrain-recognition-system.jsx src/app/TerrainSystem.jsx
cp ~/Downloads/ml-logic-recommendation.jsx src/app/MLLogic.jsx
cp ~/Downloads/implementation-guide.jsx src/app/ImplGuide.jsx`} />

            <Code title="Editar src/app/page.js" lang="jsx" code={`// src/app/page.js
'use client'   // ← IMPORTANTE no Next.js App Router!

import TerrainSystem from './TerrainSystem'

export default function Home() {
  return <TerrainSystem />
}`} />

            <Code title="Rodar" lang="bash" code={`npm run dev
# Abre em http://localhost:3000`} />
          </Panel>
        </>)}

        {/* ==================== QUICK ==================== */}
        {active === "quick" && (<>
          <Panel title="Método 4 — Sem Instalar Nada (Online)" icon="🚀" accent={C.orange} tag="MAIS RÁPIDO">
            <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6, marginBottom: 14 }}>
              Se você não quer instalar nada no computador, use um editor online. Basta colar o código e funciona instantaneamente.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Step n="A" title="StackBlitz (Melhor opção online)" color={C.orange} desc="Editor completo no navegador com preview ao vivo.">
                <Code lang="texto" code={`1. Abra:  https://stackblitz.com/fork/react
2. Espere carregar (cria um projeto React automaticamente)
3. Na aba esquerda, clique em "src/App.jsx"
4. Apague todo o conteúdo
5. Cole o código completo de um dos dashboards .jsx
6. No topo do arquivo, ADICIONE:  import { useState, useEffect, useCallback } from "react";
7. No final do arquivo, TROQUE "export default" pelo nome do componente
8. Na sidebar, clique em "Terminal" e rode:  npm install recharts lucide-react
9. O preview atualiza automaticamente!`} />
              </Step>

              <Step n="B" title="CodeSandbox" color={C.rain}>
                <Code lang="texto" code={`1. Abra:  https://codesandbox.io/s/react-new
2. Na sidebar, abra "src/App.js"
3. Cole o código do dashboard
4. Adicione "recharts" nas dependências (sidebar → Dependencies → Add)
5. Preview automático!`} />
              </Step>

              <Step n="C" title="Abrir os .jsx direto aqui no Claude" color={C.accent} desc="Os arquivos .jsx que eu criei já renderizam diretamente aqui na interface do Claude! Basta clicar nos artefatos gerados nas mensagens anteriores. Não precisa instalar nada para visualizar.">
              </Step>
            </div>
          </Panel>
        </>)}

        {/* ==================== DICAS GERAIS ==================== */}
        <Panel title="Dicas e Problemas Comuns" icon="💡" accent={C.warn} tag="TROUBLESHOOTING">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              {
                q: "Erro: 'npm' command not found",
                a: "O Node.js não está instalado. Volte ao passo de pré-requisitos e instale via NVM ou apt.",
                color: C.danger,
              },
              {
                q: "Erro: Cannot find module 'recharts'",
                a: "Faltou instalar a dependência. Rode: npm install recharts lucide-react",
                color: C.warn,
              },
              {
                q: "Página em branco, sem erro visível",
                a: "Abra o DevTools do navegador (F12 → Console) para ver erros. Geralmente é import incorreto no App.jsx.",
                color: C.orange,
              },
              {
                q: "Porta 5173 já em uso",
                a: "Outro processo está usando a porta. Mate com: kill -9 $(lsof -ti:5173)  ou o Vite vai sugerir outra porta automaticamente.",
                color: C.purple,
              },
              {
                q: "Como editar os arquivos .jsx?",
                a: "Use qualquer editor: VS Code (mais popular — instale com: sudo snap install code --classic), Sublime Text, nano, ou até o gedit do Ubuntu.",
                color: C.rain,
              },
              {
                q: "Como gerar build para produção?",
                a: "Rode: npm run build — isso gera a pasta dist/ com arquivos estáticos que você pode hospedar em qualquer servidor web.",
                color: C.green,
              },
            ].map((d, i) => (
              <div key={i} style={{ background: C.bg, borderRadius: 8, padding: 12, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: d.color, marginBottom: 6 }}>{d.q}</div>
                <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.6 }}>{d.a}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Estrutura Final do Projeto" icon="📂" accent={C.accent}>
          <Code lang="texto" code={`terrain-system/
├── node_modules/          ← dependências (gerado pelo npm)
├── public/                ← arquivos estáticos
├── src/
│   ├── App.jsx            ← ponto de entrada (editar aqui)
│   ├── main.jsx           ← não mexer
│   ├── TerrainSystem.jsx  ← Dashboard de sensores
│   ├── MLLogic.jsx        ← Lógica de ML
│   └── ImplGuide.jsx      ← Guia de implementação
├── index.html
├── package.json           ← lista de dependências
└── vite.config.js         ← configuração do Vite

Para trocar de dashboard:
  1. Abra src/App.jsx
  2. Mude o import e o return para o componente desejado
  3. Salve — o navegador atualiza sozinho`} />
        </Panel>

      </div>
    </div>
  );
}
