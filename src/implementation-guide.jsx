import { useState } from "react";

const C = {
  bg: "#080c14", panel: "#0f1520", panelLight: "#161e2e", border: "#1c2840",
  accent: "#22d3a7", accentDim: "#22d3a716", warn: "#eab308", warnDim: "#eab30816",
  danger: "#f43f5e", dangerDim: "#f43f5e16", rain: "#38bdf8", rainDim: "#38bdf816",
  text: "#e4e8f0", dim: "#7a8ba8", muted: "#4a5872", green: "#34d399", greenDim: "#34d39916",
  purple: "#a78bfa", purpleDim: "#a78bfa16", orange: "#fb923c",
};
const mono = "'JetBrains Mono',monospace";

const Badge = ({ t, c }) => (
  <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: `${c}22`, color: c, fontFamily: mono, letterSpacing: 0.6 }}>{t}</span>
);

const Code = ({ code, title }) => (
  <div style={{ marginTop: 8 }}>
    {title && <div style={{ fontSize: 9, color: C.muted, fontFamily: mono, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{title}</div>}
    <pre style={{ background: "#060a12", border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, margin: 0, overflow: "auto", fontSize: 10.5, lineHeight: 1.65, fontFamily: mono, color: "#c9d1d9", maxHeight: 500 }}><code>{code}</code></pre>
  </div>
);

const Panel = ({ title, icon, accent, tag, children, style = {} }) => (
  <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, position: "relative", overflow: "hidden", ...style }}>
    {accent && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${accent},transparent)` }} />}
    {title && (
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 15 }}>{icon}</span>
        <h3 style={{ margin: 0, fontSize: 12, fontWeight: 700, color: C.text, textTransform: "uppercase", letterSpacing: 1.1, fontFamily: mono }}>{title}</h3>
        {tag && <Badge t={tag} c={accent} />}
      </div>
    )}
    {children}
  </div>
);

const InfoBox = ({ icon, title, items, color }) => (
  <div style={{ background: C.bg, borderRadius: 8, padding: 12, border: `1px solid ${C.border}` }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{ fontSize: 11, fontWeight: 700, color, fontFamily: mono }}>{title}</span>
    </div>
    {items.map((it, i) => (
      <div key={i} style={{ fontSize: 10, color: C.dim, padding: "3px 0", display: "flex", alignItems: "flex-start", gap: 6, lineHeight: 1.5 }}>
        <span style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color, flexShrink: 0, marginTop: 5 }} />
        <span>{it}</span>
      </div>
    ))}
  </div>
);

const steps = [
  { id: "hw", label: "1. Hardware", icon: "🔧" },
  { id: "fw", label: "2. Firmware", icon: "⚡" },
  { id: "gate", label: "3. Gateway", icon: "📡" },
  { id: "db", label: "4. Banco", icon: "🗄" },
  { id: "feat", label: "5. Features", icon: "⚙️" },
  { id: "train", label: "6. Treino ML", icon: "🧠" },
  { id: "api", label: "7. API", icon: "🚀" },
  { id: "edge", label: "8. Edge ML", icon: "📟" },
  { id: "dash", label: "9. Dashboard", icon: "📊" },
  { id: "ops", label: "10. MLOps", icon: "🔄" },
];

export default function ImplementationGuide() {
  const [active, setActive] = useState("hw");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Segoe UI',system-ui,sans-serif", padding: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, padding: "12px 18px", background: C.panel, borderRadius: 12, border: `1px solid ${C.border}` }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg,${C.accent},${C.rain})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🛠</div>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 16, fontWeight: 800, fontFamily: mono, background: `linear-gradient(135deg,${C.accent},${C.rain})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>GUIA DE IMPLEMENTAÇÃO COMPLETO</h1>
          <p style={{ margin: 0, fontSize: 10, color: C.dim }}>10 etapas do hardware ao deploy — código real para cada camada</p>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[C.accent, C.rain, C.purple, C.warn, C.danger].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c, opacity: 0.6 }} />
          ))}
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {steps.map((s, i) => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            padding: "7px 12px", borderRadius: 7, border: `1px solid ${active === s.id ? C.accent : C.border}`,
            background: active === s.id ? C.accentDim : "transparent", color: active === s.id ? C.accent : C.dim,
            cursor: "pointer", fontSize: 10, fontWeight: 700, fontFamily: mono, whiteSpace: "nowrap", transition: "all .2s", display: "flex", alignItems: "center", gap: 5,
          }}>
            <span>{s.icon}</span>{s.label}
          </button>
        ))}
      </div>

      <div style={{ animation: "fadeIn .3s ease" }}>

        {/* ==================== HARDWARE ==================== */}
        {active === "hw" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel title="Lista de Materiais (BOM) — Por Estação" icon="🔧" accent={C.accent} tag="HARDWARE">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                <InfoBox icon="🧮" title="MICROCONTROLADOR" color={C.accent} items={[
                  "ESP32-S3-WROOM-1 (8MB Flash, 2MB PSRAM)",
                  "WiFi + BLE 5.0 integrado",
                  "240 MHz dual-core, ideal para TinyML",
                  "Consumo: ~80mA ativo, ~10μA deep sleep",
                  "Custo: ~R$35-50 por unidade",
                ]} />
                <InfoBox icon="📡" title="COMUNICAÇÃO" color={C.rain} items={[
                  "Módulo LoRa SX1276 (433/868/915 MHz)",
                  "Alcance: 2-15 km (linha de visada)",
                  "SIM800L (backup 4G/GPRS)",
                  "Antena LoRa omnidirecional 3dBi",
                  "Custo: ~R$45-65 (LoRa + SIM)",
                ]} />
                <InfoBox icon="🔋" title="ALIMENTAÇÃO" color={C.green} items={[
                  "Painel solar 6V 3.5W",
                  "Bateria LiPo 3.7V 6000mAh",
                  "Módulo TP4056 (carga solar)",
                  "Regulador HT7333 (3.3V LDO)",
                  "Autonomia: ~30 dias sem sol",
                ]} />
              </div>

              <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <InfoBox icon="🌡" title="SENSORES — ATMOSFÉRICOS" color={C.warn} items={[
                  "BME280: Temperatura + Umidade + Pressão (I2C, ±1°C, ±3%RH, ±1hPa) — R$25",
                  "Anemômetro Davis 6410: Velocidade do vento — R$180",
                  "Pluviômetro basculante: Precipitação (0.2mm/pulso) — R$120",
                  "BH1750: Luminosidade (lux) — R$12",
                ]} />
                <InfoBox icon="🌱" title="SENSORES — SOLO" color={C.purple} items={[
                  "Capacitivo v1.2: Umidade do solo (analógico, sem corrosão) — R$15",
                  "DS18B20 (waterproof): Temperatura do solo (1-Wire, ±0.5°C) — R$18",
                  "TDS Meter v1.0: Salinidade/condutividade (analógico) — R$20",
                  "Sonda tensiômetro: Tensão de água no solo (opcional) — R$80",
                ]} />
              </div>

              <div style={{ marginTop: 14, fontSize: 11, color: C.dim, lineHeight: 1.5, padding: "10px 14px", background: `${C.accent}08`, borderRadius: 8, border: `1px solid ${C.accent}22` }}>
                <strong style={{ color: C.accent }}>Custo total por estação:</strong> ~R$550-700 (com caixa IP65 e mastro). Para 3 estações: ~R$1.800-2.200. Isso cobre toda a coleta de dados em campo.
              </div>
            </Panel>

            <Panel title="Esquema de Conexões — ESP32-S3" icon="🔌" accent={C.warn} tag="WIRING">
              <Code title="Pinagem do ESP32-S3" code={`┌──────────────────────────────────────────────────┐
│                   ESP32-S3                        │
│                                                    │
│  3V3 ──────┬──── BME280 VCC                       │
│            ├──── Capacitivo Solo VCC               │
│            ├──── BH1750 VCC                        │
│            └──── DS18B20 VCC (+ R 4.7kΩ pull-up)  │
│                                                    │
│  GND ──────┬──── Todos os GNDs                    │
│            └──── TDS GND                           │
│                                                    │
│  GPIO21 (SDA) ──┬── BME280 SDA                    │
│                  └── BH1750 SDA                    │
│  GPIO22 (SCL) ──┬── BME280 SCL                    │
│                  └── BH1750 SCL                    │
│                                                    │
│  GPIO4  ────────── DS18B20 DATA (1-Wire)          │
│  GPIO34 (ADC1_6) ── Capacitivo Solo (analógico)   │
│  GPIO35 (ADC1_7) ── TDS Meter (analógico)         │
│  GPIO15 ────────── Pluviômetro (interrupt)         │
│  GPIO16 ────────── Anemômetro (interrupt/pulso)    │
│                                                    │
│  GPIO5  (SCK)  ──── LoRa SX1276 SCK              │
│  GPIO18 (MISO) ──── LoRa SX1276 MISO             │
│  GPIO19 (MOSI) ──── LoRa SX1276 MOSI             │
│  GPIO23 (CS)   ──── LoRa SX1276 NSS              │
│  GPIO26 (RST)  ──── LoRa SX1276 RST              │
│  GPIO27 (DIO0) ──── LoRa SX1276 DIO0             │
│                                                    │
│  GPIO17 (TX) ────── SIM800L RX (backup 4G)        │
│  GPIO16 (RX) ────── SIM800L TX                     │
│                                                    │
│  GPIO36 (ADC) ───── Divisor tensão bateria        │
│                     (100kΩ + 100kΩ → mede Vbat)   │
└──────────────────────────────────────────────────┘

⚠️ NOTAS:
• I2C: BME280 e BH1750 compartilham barramento (endereços diferentes)
• ADC: Usar ADC1 apenas (ADC2 conflita com WiFi)
• Pluviômetro: Usar interrupt com debounce de 200ms
• LoRa: SPI dedicado (não compartilhar com outros devices)
• Bateria: Divisor resistivo para ler Vbat no ADC (max 3.3V)
• Caixa IP65 com prensa-cabos para sensores externos`} />
            </Panel>
          </div>
        )}

        {/* ==================== FIRMWARE ==================== */}
        {active === "fw" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel title="Firmware ESP32 — Arduino/PlatformIO" icon="⚡" accent={C.warn} tag="C++">
              <Code title="platformio.ini" code={`[env:esp32s3]
platform = espressif32
board = esp32-s3-devkitc-1
framework = arduino
monitor_speed = 115200
lib_deps =
    adafruit/Adafruit BME280 Library@^2.2.2
    paulstoffregen/OneWire@^2.3.7
    milesburton/DallasTemperature@^3.11.0
    claws/BH1750@^1.3.0
    sandeepmistry/LoRa@^0.8.0
    bblanchon/ArduinoJson@^6.21.0
    256dpi/MQTT@^2.5.1
build_flags = -DCORE_DEBUG_LEVEL=3`} />

              <Code title="src/main.cpp — Firmware Completo" code={`#include <Wire.h>
#include <Adafruit_BME280.h>
#include <DallasTemperature.h>
#include <BH1750.h>
#include <LoRa.h>
#include <ArduinoJson.h>
#include <esp_sleep.h>

// ============ CONFIGURAÇÃO DE PINOS ============
#define PIN_SOIL_MOISTURE   34   // ADC analógico
#define PIN_TDS             35   // ADC analógico
#define PIN_DS18B20         4    // 1-Wire
#define PIN_RAIN_GAUGE      15   // Interrupt
#define PIN_ANEMOMETER      16   // Interrupt
#define PIN_BATTERY         36   // ADC
#define LORA_CS             23
#define LORA_RST            26
#define LORA_DIO0           27

// ============ CONSTANTES ============
#define STATION_ID          "mc-001"
#define SEND_INTERVAL_MS    900000   // 15 minutos
#define SLEEP_DURATION_US   840000000 // 14 min deep sleep
#define LORA_FREQUENCY      915E6    // Brasil: 915 MHz
#define SOIL_DRY            3200     // Calibrar para seu solo
#define SOIL_WET            1400     // Calibrar para seu solo

// ============ OBJETOS GLOBAIS ============
Adafruit_BME280 bme;
OneWire oneWire(PIN_DS18B20);
DallasTemperature ds18b20(&oneWire);
BH1750 lightMeter;

volatile uint16_t rainPulses = 0;
volatile uint16_t windPulses = 0;
unsigned long lastSend = 0;

// ============ INTERRUPTS ============
void IRAM_ATTR rainISR() { rainPulses++; }
void IRAM_ATTR windISR() { windPulses++; }

// ============ STRUCT DE DADOS ============
struct SensorData {
    float tempAir;
    float humidity;
    float pressure;
    float soilMoisture;    // % (0-100)
    float soilTemp;
    float salinity;        // TDS ppm
    float windSpeed;       // km/h
    float rainfall;        // mm
    float lux;
    float batteryVolts;
    int   batteryPercent;
    int   rssi;            // sinal LoRa
};

// ============ SETUP ============
void setup() {
    Serial.begin(115200);
    Wire.begin(21, 22);  // SDA=21, SCL=22
    
    // Inicializar sensores
    if (!bme.begin(0x76)) {
        Serial.println("ERRO: BME280 não encontrado!");
    }
    bme.setSampling(
        Adafruit_BME280::MODE_FORCED,
        Adafruit_BME280::SAMPLING_X4,   // temp
        Adafruit_BME280::SAMPLING_X4,   // pressure
        Adafruit_BME280::SAMPLING_X4,   // humidity
        Adafruit_BME280::FILTER_X4,
        Adafruit_BME280::STANDBY_MS_500
    );
    
    ds18b20.begin();
    ds18b20.setResolution(12);  // 0.0625°C
    
    lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE);
    
    // Interrupts para pluviômetro e anemômetro
    pinMode(PIN_RAIN_GAUGE, INPUT_PULLUP);
    pinMode(PIN_ANEMOMETER, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(PIN_RAIN_GAUGE), rainISR, FALLING);
    attachInterrupt(digitalPinToInterrupt(PIN_ANEMOMETER), windISR, FALLING);
    
    // LoRa
    LoRa.setPins(LORA_CS, LORA_RST, LORA_DIO0);
    if (!LoRa.begin(LORA_FREQUENCY)) {
        Serial.println("ERRO: LoRa falhou!");
    }
    LoRa.setSpreadingFactor(10);  // SF10: alcance vs velocidade
    LoRa.setSignalBandwidth(125E3);
    LoRa.setTxPower(20);          // max power
    
    Serial.println("=== Estação " STATION_ID " inicializada ===");
}

// ============ LEITURA DOS SENSORES ============
SensorData readAllSensors() {
    SensorData data;
    
    // BME280 (forçar leitura)
    bme.takeForcedMeasurement();
    data.tempAir  = bme.readTemperature();
    data.humidity = bme.readHumidity();
    data.pressure = bme.readPressure() / 100.0;  // Pa → hPa
    
    // DS18B20 (temperatura do solo)
    ds18b20.requestTemperatures();
    data.soilTemp = ds18b20.getTempCByIndex(0);
    
    // Umidade do solo (capacitivo → %)
    int soilRaw = analogRead(PIN_SOIL_MOISTURE);
    data.soilMoisture = map(
        constrain(soilRaw, SOIL_WET, SOIL_DRY),
        SOIL_DRY, SOIL_WET, 0, 100
    );
    
    // TDS / Salinidade
    int tdsRaw = analogRead(PIN_TDS);
    float tdsVoltage = tdsRaw * 3.3 / 4095.0;
    data.salinity = (133.42 * pow(tdsVoltage, 3)
                   - 255.86 * pow(tdsVoltage, 2)
                   + 857.39 * tdsVoltage) * 0.5;
    
    // Pluviômetro (0.2mm por pulso)
    noInterrupts();
    data.rainfall = rainPulses * 0.2;
    rainPulses = 0;
    interrupts();
    
    // Anemômetro (pulsos → km/h)
    noInterrupts();
    uint16_t wp = windPulses;
    windPulses = 0;
    interrupts();
    // Fator depende do modelo (calibrar!)
    data.windSpeed = wp * 2.4 / (SEND_INTERVAL_MS / 1000.0);
    
    // Luminosidade
    data.lux = lightMeter.readLightLevel();
    
    // Bateria (divisor resistivo 1:1)
    int batRaw = analogRead(PIN_BATTERY);
    data.batteryVolts = (batRaw / 4095.0) * 3.3 * 2.0;
    data.batteryPercent = constrain(
        map(data.batteryVolts * 100, 320, 420, 0, 100),
        0, 100
    );
    
    data.rssi = LoRa.packetRssi();
    
    return data;
}

// ============ ENVIAR VIA LORA ============
void sendLoRa(SensorData &d) {
    StaticJsonDocument<512> doc;
    doc["id"]   = STATION_ID;
    doc["ts"]   = millis();  // substituir por RTC real
    doc["ta"]   = round2(d.tempAir);
    doc["hu"]   = round2(d.humidity);
    doc["pr"]   = round2(d.pressure);
    doc["sm"]   = round2(d.soilMoisture);
    doc["st"]   = round2(d.soilTemp);
    doc["sa"]   = round2(d.salinity);
    doc["ws"]   = round2(d.windSpeed);
    doc["rf"]   = round2(d.rainfall);
    doc["lx"]   = (int)d.lux;
    doc["bv"]   = round2(d.batteryVolts);
    doc["bp"]   = d.batteryPercent;
    
    char buffer[512];
    size_t len = serializeJson(doc, buffer);
    
    LoRa.beginPacket();
    LoRa.print(buffer);
    LoRa.endPacket();
    
    Serial.printf("LoRa TX (%d bytes): %s\\n", len, buffer);
}

float round2(float v) { return round(v * 100) / 100.0; }

// ============ LOOP PRINCIPAL ============
void loop() {
    unsigned long now = millis();
    
    if (now - lastSend >= SEND_INTERVAL_MS || lastSend == 0) {
        lastSend = now;
        
        // Ler todos os sensores
        SensorData data = readAllSensors();
        
        // Enviar via LoRa
        sendLoRa(data);
        
        // Log serial
        Serial.printf(
            "T:%.1f H:%.0f P:%.1f SM:%.0f ST:%.1f "
            "WS:%.1f RF:%.1f BAT:%d%%\\n",
            data.tempAir, data.humidity, data.pressure,
            data.soilMoisture, data.soilTemp,
            data.windSpeed, data.rainfall,
            data.batteryPercent
        );
        
        // Deep sleep para economizar bateria
        // (acordar 1 min antes do próximo envio)
        Serial.println("Entrando em deep sleep...");
        esp_sleep_enable_timer_wakeup(SLEEP_DURATION_US);
        esp_deep_sleep_start();
    }
}`} />
            </Panel>
          </div>
        )}

        {/* ==================== GATEWAY ==================== */}
        {active === "gate" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel title="Gateway LoRa → MQTT (Raspberry Pi)" icon="📡" accent={C.rain} tag="PYTHON">
              <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6, marginBottom: 12 }}>
                O Gateway recebe pacotes LoRa de todas as estações e republica via MQTT para o servidor cloud. Roda em um Raspberry Pi 4 com módulo LoRa HAT.
              </div>
              <Code title="gateway/requirements.txt" code={`paho-mqtt==1.6.1
pyserial==3.5
RPi.GPIO==0.7.1
spidev==3.6
python-dotenv==1.0.0`} />

              <Code title="gateway/lora_gateway.py" code={`"""
Gateway LoRa → MQTT
Recebe dados das estações de campo e republica no broker MQTT
Hardware: Raspberry Pi 4 + Dragino LoRa HAT (SX1276)
"""

import json
import time
import logging
from datetime import datetime, timezone
import paho.mqtt.client as mqtt
from SX127x.LoRa import LoRa
from SX127x.board_config import BOARD

logging.basicConfig(level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s')
log = logging.getLogger(__name__)

# ============ CONFIGURAÇÃO ============
MQTT_BROKER   = "seu-servidor.com"  # ou IP local
MQTT_PORT     = 1883
MQTT_USER     = "gateway"
MQTT_PASS     = "senha_segura"
MQTT_TOPIC    = "terrain/sensors/{station_id}"
LORA_FREQ     = 915.0   # MHz (Brasil)
LORA_SF       = 10       # Spreading Factor (match firmware)
LORA_BW       = 125000   # Bandwidth

# ============ MQTT CLIENT ============
mqtt_client = mqtt.Client(client_id="lora-gateway-01")
mqtt_client.username_pw_set(MQTT_USER, MQTT_PASS)
mqtt_client.on_connect = lambda c, u, f, rc: (
    log.info(f"MQTT conectado (rc={rc})"))
mqtt_client.on_disconnect = lambda c, u, rc: (
    log.warning(f"MQTT desconectado (rc={rc})"))

def connect_mqtt():
    while True:
        try:
            mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
            mqtt_client.loop_start()
            return
        except Exception as e:
            log.error(f"MQTT erro: {e}. Retry em 10s...")
            time.sleep(10)

# ============ LORA RECEIVER ============
class LoRaReceiver(LoRa):
    def __init__(self):
        super().__init__(verbose=False)
        self.set_mode(MODE.SLEEP)
        self.set_freq(LORA_FREQ)
        self.set_spreading_factor(LORA_SF)
        self.set_bw(LORA_BW)
        self.set_rx_crc(True)
        self.set_pa_config(pa_select=1, max_power=20)
        self.set_agc_auto_on(True)
        self.packet_count = 0

    def on_rx_done(self):
        """Callback quando pacote LoRa é recebido."""
        self.clear_irq_flags(RxDone=1)
        payload = self.read_payload(nocheck=True)
        raw = bytes(payload).decode('utf-8', errors='ignore')
        rssi = self.get_pkt_rssi_value()
        snr = self.get_pkt_snr_value()
        
        log.info(f"LoRa RX (RSSI:{rssi} SNR:{snr}): {raw}")
        
        try:
            data = json.loads(raw)
            station_id = data.get("id", "unknown")
            
            # Enriquecer com metadados do gateway
            data["gateway_ts"] = datetime.now(timezone.utc).isoformat()
            data["rssi"] = rssi
            data["snr"] = snr
            data["gateway_id"] = "gw-001"
            
            # Publicar no MQTT
            topic = MQTT_TOPIC.format(station_id=station_id)
            mqtt_client.publish(
                topic,
                json.dumps(data),
                qos=1,  # at-least-once delivery
                retain=True
            )
            
            self.packet_count += 1
            log.info(f"MQTT PUB → {topic} (total: {self.packet_count})")
            
        except json.JSONDecodeError as e:
            log.error(f"JSON inválido: {e}")
        except Exception as e:
            log.error(f"Erro processamento: {e}")
        
        # Voltar a receber
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)

# ============ MAIN ============
if __name__ == "__main__":
    BOARD.setup()
    
    connect_mqtt()
    log.info("MQTT conectado")
    
    lora = LoRaReceiver()
    lora.set_mode(MODE.RXCONT)
    log.info(f"LoRa escutando em {LORA_FREQ} MHz (SF{LORA_SF})")
    
    try:
        while True:
            time.sleep(0.5)
    except KeyboardInterrupt:
        lora.set_mode(MODE.SLEEP)
        mqtt_client.loop_stop()
        BOARD.teardown()
        log.info("Gateway encerrado")`} />
            </Panel>
          </div>
        )}

        {/* ==================== BANCO DE DADOS ==================== */}
        {active === "db" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel title="Banco de Dados — TimescaleDB (PostgreSQL)" icon="🗄" accent={C.purple} tag="SQL">
              <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6, marginBottom: 10 }}>
                TimescaleDB é uma extensão PostgreSQL otimizada para séries temporais. Compressão automática, particionamento por tempo, e queries SQL padrão.
              </div>
              <Code title="docker-compose.yml" code={`version: '3.8'
services:
  timescaledb:
    image: timescale/timescaledb:latest-pg15
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: terrain_recon
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: senha_segura_aqui
    volumes:
      - timescale_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  mosquitto:
    image: eclipse-mosquitto:2
    ports:
      - "1883:1883"
      - "9001:9001"
    volumes:
      - ./mosquitto.conf:/mosquitto/config/mosquitto.conf

  mqtt_ingester:
    build: ./ingester
    depends_on:
      - timescaledb
      - mosquitto
    environment:
      DB_URL: postgresql://admin:senha_segura_aqui@timescaledb/terrain_recon
      MQTT_BROKER: mosquitto

volumes:
  timescale_data:`} />

              <Code title="init.sql — Schema do Banco" code={`-- Ativar TimescaleDB
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Tabela principal de leituras dos sensores
CREATE TABLE sensor_readings (
    time            TIMESTAMPTZ     NOT NULL,
    station_id      TEXT            NOT NULL,
    temp_air        DOUBLE PRECISION,
    humidity        DOUBLE PRECISION,
    pressure        DOUBLE PRECISION,
    soil_moisture   DOUBLE PRECISION,
    soil_temp       DOUBLE PRECISION,
    salinity        DOUBLE PRECISION,
    wind_speed      DOUBLE PRECISION,
    rainfall        DOUBLE PRECISION,
    lux             DOUBLE PRECISION,
    battery_volts   DOUBLE PRECISION,
    battery_pct     INTEGER,
    rssi            INTEGER,
    snr             DOUBLE PRECISION
);

-- Converter para hypertable (particionamento por tempo)
SELECT create_hypertable('sensor_readings', 'time',
    chunk_time_interval => INTERVAL '7 days');

-- Índices para queries rápidas
CREATE INDEX idx_station_time ON sensor_readings (station_id, time DESC);

-- Dados de satélite (atualização semanal)
CREATE TABLE satellite_data (
    time            TIMESTAMPTZ     NOT NULL,
    station_id      TEXT            NOT NULL,
    ndvi            DOUBLE PRECISION,
    evapotranspiration DOUBLE PRECISION,
    cloud_cover     DOUBLE PRECISION,
    albedo          DOUBLE PRECISION,
    source          TEXT DEFAULT 'sentinel-2'
);
SELECT create_hypertable('satellite_data', 'time',
    chunk_time_interval => INTERVAL '30 days');

-- Previsões do modelo ML
CREATE TABLE ml_predictions (
    time            TIMESTAMPTZ     NOT NULL,
    station_id      TEXT            NOT NULL,
    horizon_days    INTEGER         NOT NULL,
    prob_drought_severe  DOUBLE PRECISION,
    prob_drought_mild    DOUBLE PRECISION,
    prob_normal          DOUBLE PRECISION,
    prob_rain            DOUBLE PRECISION,
    prob_rain_heavy      DOUBLE PRECISION,
    confidence      DOUBLE PRECISION,
    model_version   TEXT
);
SELECT create_hypertable('ml_predictions', 'time');

-- Alertas gerados
CREATE TABLE alerts (
    id              SERIAL PRIMARY KEY,
    time            TIMESTAMPTZ DEFAULT NOW(),
    station_id      TEXT NOT NULL,
    level           TEXT NOT NULL,  -- ALTA, MÉDIA, BAIXA
    message         TEXT NOT NULL,
    prediction_ref  TIMESTAMPTZ,
    acknowledged    BOOLEAN DEFAULT FALSE
);

-- Compressão automática (dados > 30 dias)
ALTER TABLE sensor_readings SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'station_id'
);
SELECT add_compression_policy('sensor_readings', INTERVAL '30 days');

-- View útil: médias horárias por estação
CREATE VIEW hourly_averages AS
SELECT
    time_bucket('1 hour', time) AS hour,
    station_id,
    AVG(temp_air) AS avg_temp,
    AVG(humidity) AS avg_humidity,
    AVG(soil_moisture) AS avg_soil_moisture,
    SUM(rainfall) AS total_rainfall,
    AVG(wind_speed) AS avg_wind_speed,
    MIN(battery_pct) AS min_battery
FROM sensor_readings
GROUP BY hour, station_id
ORDER BY hour DESC;`} />

              <Code title="ingester/mqtt_to_db.py — MQTT → TimescaleDB" code={`"""Serviço que consome MQTT e grava no TimescaleDB."""

import json
import psycopg2
from psycopg2.extras import execute_values
from datetime import datetime, timezone
import paho.mqtt.client as mqtt
import os, logging

log = logging.getLogger(__name__)
DB_URL = os.getenv("DB_URL")
MQTT_BROKER = os.getenv("MQTT_BROKER", "localhost")

conn = psycopg2.connect(DB_URL)
conn.autocommit = True

def on_message(client, userdata, msg):
    try:
        data = json.loads(msg.payload)
        ts = datetime.now(timezone.utc)
        
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO sensor_readings 
                (time, station_id, temp_air, humidity, pressure,
                 soil_moisture, soil_temp, salinity, wind_speed,
                 rainfall, lux, battery_volts, battery_pct, 
                 rssi, snr)
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """, (
                ts, data['id'], data.get('ta'), data.get('hu'),
                data.get('pr'), data.get('sm'), data.get('st'),
                data.get('sa'), data.get('ws'), data.get('rf'),
                data.get('lx'), data.get('bv'), data.get('bp'),
                data.get('rssi'), data.get('snr')
            ))
        log.info(f"DB INSERT: {data['id']} @ {ts}")
    except Exception as e:
        log.error(f"Erro insert: {e}")

client = mqtt.Client()
client.connect(MQTT_BROKER, 1883)
client.subscribe("terrain/sensors/#")
client.on_message = on_message
client.loop_forever()`} />
            </Panel>
          </div>
        )}

        {/* ==================== FEATURES ==================== */}
        {active === "feat" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel title="Feature Engineering — Pipeline Completo" icon="⚙️" accent={C.warn} tag="PYTHON">
              <Code title="ml/feature_engineering.py" code={`"""
Feature Engineering Pipeline
Transforma dados brutos dos sensores + satélite em features para ML.
"""

import numpy as np
import pandas as pd
from scipy.stats import gamma, norm
from sklearn.preprocessing import RobustScaler
import logging

log = logging.getLogger(__name__)

class FeatureEngineer:
    """Pipeline de features para previsão seca/chuva."""
    
    SENSOR_COLS = [
        'temp_air', 'humidity', 'pressure', 'soil_moisture',
        'soil_temp', 'salinity', 'wind_speed', 'rainfall'
    ]
    WINDOWS = [3, 7, 14, 30]
    
    def __init__(self):
        self.scaler = RobustScaler()
        self.fitted = False
    
    def build(self, df: pd.DataFrame) -> pd.DataFrame:
        """Pipeline completo de feature engineering."""
        df = df.copy()
        df = df.sort_values('time').set_index('time')
        
        # 1. Rolling statistics
        df = self._rolling_features(df)
        
        # 2. SPI (Standardized Precipitation Index)
        df = self._compute_spi(df)
        
        # 3. Features compostas
        df = self._composite_features(df)
        
        # 4. Encoding temporal
        df = self._temporal_encoding(df)
        
        # 5. Features de satélite (merge)
        # (se disponível — join por station + semana)
        
        # 6. Limpar NaN das rolling windows
        df = df.dropna()
        
        log.info(f"Features geradas: {df.shape[1]} colunas, "
                 f"{df.shape[0]} amostras")
        return df
    
    def _rolling_features(self, df):
        """Médias, desvios e deltas em janelas deslizantes."""
        for col in self.SENSOR_COLS:
            if col not in df.columns:
                continue
            for w in self.WINDOWS:
                roll = df[col].rolling(w, min_periods=1)
                df[f'{col}_mean_{w}d'] = roll.mean()
                df[f'{col}_std_{w}d'] = roll.std()
                df[f'{col}_min_{w}d'] = roll.min()
                df[f'{col}_max_{w}d'] = roll.max()
                # Delta: valor atual vs média da janela
                df[f'{col}_delta_{w}d'] = df[col] - df[f'{col}_mean_{w}d']
                # Taxa de variação
                df[f'{col}_rate_{w}d'] = df[col].diff(w) / w
        return df
    
    def _compute_spi(self, df):
        """Standardized Precipitation Index (SPI-30 e SPI-90)."""
        for window in [30, 90]:
            col_name = f'spi_{window}d'
            rolling_rain = df['rainfall'].rolling(window).sum()
            
            valid = rolling_rain.dropna()
            if len(valid) < 30:
                df[col_name] = 0
                continue
            
            try:
                # Ajusta Gamma e transforma para Normal
                params = gamma.fit(valid[valid > 0], floc=0)
                cdf_vals = gamma.cdf(rolling_rain, *params)
                # Clamp para evitar infinitos
                cdf_vals = np.clip(cdf_vals, 0.001, 0.999)
                df[col_name] = norm.ppf(cdf_vals)
            except Exception:
                df[col_name] = 0
                log.warning(f"SPI-{window} falhou, usando 0")
        return df
    
    def _composite_features(self, df):
        """Features de interação entre sensores."""
        
        # Water Stress Index
        sm_norm = df['soil_moisture'] / 100.0
        df['water_stress_idx'] = (1 - sm_norm) * (
            df.get('evapotranspiration', 5) / 10.0
        )
        
        # Soil-Air Temperature Ratio
        df['soil_air_ratio'] = np.where(
            df['temp_air'] > 0,
            df['soil_temp'] / df['temp_air'],
            1.0
        )
        
        # VPD (Vapor Pressure Deficit) — kPa
        es = 0.6108 * np.exp(
            17.27 * df['temp_air'] / (df['temp_air'] + 237.3)
        )
        df['vpd'] = es * (1 - df['humidity'] / 100.0)
        
        # Dry streak (dias consecutivos sem chuva)
        rain_flag = (df['rainfall'] > 0.2).astype(int)
        groups = rain_flag.cumsum()
        df['dry_streak'] = (
            (rain_flag == 0)
            .groupby(groups)
            .cumcount()
        )
        
        # Thermal amplitude diária
        df['temp_amplitude'] = (
            df['temp_air_max_1d'] - df['temp_air_min_1d']
            if 'temp_air_max_1d' in df.columns
            else df['temp_air'].rolling(24).max() - df['temp_air'].rolling(24).min()
        )
        
        return df
    
    def _temporal_encoding(self, df):
        """Encoding cíclico para manter continuidade temporal."""
        doy = df.index.dayofyear
        df['day_sin'] = np.sin(2 * np.pi * doy / 365.25)
        df['day_cos'] = np.cos(2 * np.pi * doy / 365.25)
        
        month = df.index.month
        df['month_sin'] = np.sin(2 * np.pi * month / 12)
        df['month_cos'] = np.cos(2 * np.pi * month / 12)
        
        # Estação (categórico)
        df['season'] = pd.cut(
            month, bins=[0, 3, 6, 9, 12],
            labels=[0, 1, 2, 3]  # verão, outono, inverno, primavera
        ).astype(int)
        
        return df
    
    def create_target(self, df, horizon=14):
        """Cria variável target baseada em condições futuras."""
        future_rain = df['rainfall'].rolling(horizon).sum().shift(-horizon)
        future_soil = df['soil_moisture'].shift(-horizon)
        
        conditions = [
            (future_rain < 5) & (future_soil < 15),
            (future_rain < 20) & (future_soil < 30),
            (future_rain >= 20) & (future_rain < 80),
            (future_rain >= 80) & (future_rain < 150),
            (future_rain >= 150),
        ]
        labels = [0, 1, 2, 3, 4]
        # 0=SECA_SEVERA, 1=SECA_LEVE, 2=NORMAL, 3=CHUVA, 4=CHUVA_FORTE
        
        df['target'] = np.select(conditions, labels, default=2)
        return df.dropna(subset=['target'])
    
    def fit_scaler(self, X_train):
        """Fit RobustScaler nos dados de treino."""
        self.scaler.fit(X_train)
        self.fitted = True
        return self.scaler.transform(X_train)
    
    def transform(self, X):
        """Aplica scaler já treinado."""
        assert self.fitted, "Scaler não foi treinado!"
        return self.scaler.transform(X)`} />
            </Panel>
          </div>
        )}

        {/* ==================== TREINO ML ==================== */}
        {active === "train" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel title="Treinamento do Ensemble — Pipeline Completo" icon="🧠" accent={C.purple} tag="PYTORCH + SKLEARN">
              <Code title="ml/train_ensemble.py" code={`"""
Pipeline de Treinamento — Ensemble (RF + XGBoost + LSTM)
Execução: python train_ensemble.py --horizon 14 --station all
"""

import argparse
import numpy as np
import pandas as pd
import joblib
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import classification_report, f1_score
from sklearn.model_selection import TimeSeriesSplit
from xgboost import XGBClassifier
import optuna
import logging, os, json
from datetime import datetime
from feature_engineering import FeatureEngineer

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

CLASSES = ['SECA_SEVERA','SECA_LEVE','NORMAL','CHUVA','CHUVA_FORTE']
SEQ_LEN = 30
SEED = 42
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# ============================================================
# 1. MODELO LSTM
# ============================================================
class BiLSTMAttention(nn.Module):
    def __init__(self, input_dim, hidden=128, n_classes=5, dropout=0.3):
        super().__init__()
        self.lstm1 = nn.LSTM(input_dim, hidden, batch_first=True,
                             bidirectional=True, dropout=dropout)
        self.lstm2 = nn.LSTM(hidden*2, 64, batch_first=True,
                             bidirectional=True, dropout=dropout)
        self.attn_w = nn.Sequential(
            nn.Linear(128, 64), nn.Tanh(), nn.Linear(64, 1))
        self.head = nn.Sequential(
            nn.Linear(128, 64), nn.ReLU(), nn.Dropout(0.2),
            nn.Linear(64, 32), nn.ReLU(), nn.Linear(32, n_classes))
    
    def forward(self, x):
        o, _ = self.lstm1(x)
        o, _ = self.lstm2(o)
        w = torch.softmax(self.attn_w(o).squeeze(-1), dim=1)
        ctx = torch.bmm(w.unsqueeze(1), o).squeeze(1)
        return self.head(ctx)

class FocalLoss(nn.Module):
    def __init__(self, gamma=2.0, alpha=None):
        super().__init__()
        self.gamma = gamma
        self.alpha = alpha  # tensor de pesos por classe
    
    def forward(self, pred, target):
        ce = nn.functional.cross_entropy(pred, target, 
                                          weight=self.alpha,
                                          reduction='none')
        pt = torch.exp(-ce)
        return ((1 - pt) ** self.gamma * ce).mean()

# ============================================================
# 2. CRIAR SEQUÊNCIAS PARA LSTM
# ============================================================
def create_sequences(X, y, seq_len=30):
    Xs, ys = [], []
    for i in range(seq_len, len(X)):
        Xs.append(X[i-seq_len:i])
        ys.append(y[i])
    return np.array(Xs), np.array(ys)

# ============================================================
# 3. TREINAR LSTM
# ============================================================
def train_lstm(X_train_seq, y_train_seq, X_val_seq, y_val_seq,
               input_dim, n_epochs=100, patience=15):
    
    # Class weights (inversamente proporcional à frequência)
    counts = np.bincount(y_train_seq, minlength=5).astype(float)
    weights = (1.0 / counts) * len(y_train_seq) / 5
    alpha = torch.FloatTensor(weights).to(DEVICE)
    
    # DataLoaders
    train_ds = TensorDataset(
        torch.FloatTensor(X_train_seq),
        torch.LongTensor(y_train_seq))
    val_ds = TensorDataset(
        torch.FloatTensor(X_val_seq),
        torch.LongTensor(y_val_seq))
    train_dl = DataLoader(train_ds, batch_size=64, shuffle=True)
    val_dl = DataLoader(val_ds, batch_size=128)
    
    model = BiLSTMAttention(input_dim).to(DEVICE)
    criterion = FocalLoss(gamma=2.0, alpha=alpha)
    optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3,
                                   weight_decay=1e-4)
    scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(
        optimizer, T_max=n_epochs)
    
    best_f1, patience_counter, best_state = 0, 0, None
    
    for epoch in range(n_epochs):
        # Train
        model.train()
        for xb, yb in train_dl:
            xb, yb = xb.to(DEVICE), yb.to(DEVICE)
            optimizer.zero_grad()
            loss = criterion(model(xb), yb)
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            optimizer.step()
        scheduler.step()
        
        # Validate
        model.eval()
        preds, trues = [], []
        with torch.no_grad():
            for xb, yb in val_dl:
                out = model(xb.to(DEVICE))
                preds.extend(out.argmax(1).cpu().numpy())
                trues.extend(yb.numpy())
        
        f1 = f1_score(trues, preds, average='weighted')
        if f1 > best_f1:
            best_f1 = f1
            best_state = model.state_dict().copy()
            patience_counter = 0
        else:
            patience_counter += 1
        
        if epoch % 10 == 0:
            log.info(f"Epoch {epoch}: F1={f1:.4f} (best={best_f1:.4f})")
        
        if patience_counter >= patience:
            log.info(f"Early stopping at epoch {epoch}")
            break
    
    model.load_state_dict(best_state)
    return model

# ============================================================
# 4. PIPELINE PRINCIPAL
# ============================================================
def main(horizon=14):
    log.info(f"=== Treinando ensemble (horizon={horizon}d) ===")
    
    # 4a. Carregar dados do banco
    from db_utils import load_sensor_data  # sua função de carga
    df = load_sensor_data(stations='all', days=730)  # 2 anos
    log.info(f"Dados carregados: {len(df)} registros")
    
    # 4b. Feature Engineering
    fe = FeatureEngineer()
    df = fe.build(df)
    df = fe.create_target(df, horizon=horizon)
    
    feature_cols = [c for c in df.columns 
                    if c not in ['target', 'station_id']]
    X = df[feature_cols].values
    y = df['target'].values.astype(int)
    
    # 4c. Divisão temporal (60/20/20)
    n = len(X)
    s1, s2 = int(n * 0.6), int(n * 0.8)
    X_train, y_train = X[:s1], y[:s1]
    X_val, y_val = X[s1:s2], y[s1:s2]
    X_test, y_test = X[s2:], y[s2:]
    
    # 4d. Normalização
    X_train_s = fe.fit_scaler(X_train)
    X_val_s = fe.transform(X_val)
    X_test_s = fe.transform(X_test)
    
    log.info(f"Split: train={len(X_train)}, val={len(X_val)}, "
             f"test={len(X_test)}")
    log.info(f"Features: {len(feature_cols)}")
    
    # ==========================================
    # 4e. TREINAR RANDOM FOREST
    # ==========================================
    log.info("Treinando Random Forest...")
    rf = RandomForestClassifier(
        n_estimators=500, max_depth=15,
        min_samples_leaf=20, class_weight='balanced',
        random_state=SEED, n_jobs=-1)
    rf.fit(X_train_s, y_train)
    rf_val_f1 = f1_score(y_val, rf.predict(X_val_s), average='weighted')
    log.info(f"RF val F1: {rf_val_f1:.4f}")
    
    # ==========================================
    # 4f. TREINAR XGBOOST (com Optuna)
    # ==========================================
    log.info("Otimizando XGBoost com Optuna...")
    def xgb_objective(trial):
        params = {
            'n_estimators': trial.suggest_int('n_est', 200, 1000),
            'max_depth': trial.suggest_int('depth', 4, 10),
            'learning_rate': trial.suggest_float('lr', 0.01, 0.3, log=True),
            'subsample': trial.suggest_float('sub', 0.6, 1.0),
            'colsample_bytree': trial.suggest_float('col', 0.5, 1.0),
            'reg_alpha': trial.suggest_float('a', 1e-3, 10, log=True),
            'reg_lambda': trial.suggest_float('l', 1e-3, 10, log=True),
        }
        m = XGBClassifier(**params, random_state=SEED, use_label_encoder=False,
                          eval_metric='mlogloss')
        m.fit(X_train_s, y_train, eval_set=[(X_val_s, y_val)],
              verbose=False)
        return f1_score(y_val, m.predict(X_val_s), average='weighted')
    
    study = optuna.create_study(direction='maximize')
    study.optimize(xgb_objective, n_trials=100, show_progress_bar=True)
    
    xgb = XGBClassifier(**study.best_params, random_state=SEED,
                         use_label_encoder=False, eval_metric='mlogloss')
    xgb.fit(X_train_s, y_train)
    xgb_val_f1 = f1_score(y_val, xgb.predict(X_val_s), average='weighted')
    log.info(f"XGB val F1: {xgb_val_f1:.4f} (best params: {study.best_params})")
    
    # ==========================================
    # 4g. TREINAR LSTM
    # ==========================================
    log.info("Treinando BiLSTM + Attention...")
    X_tr_seq, y_tr_seq = create_sequences(X_train_s, y_train, SEQ_LEN)
    X_va_seq, y_va_seq = create_sequences(X_val_s, y_val, SEQ_LEN)
    X_te_seq, y_te_seq = create_sequences(X_test_s, y_test, SEQ_LEN)
    
    lstm_model = train_lstm(X_tr_seq, y_tr_seq, X_va_seq, y_va_seq,
                            input_dim=len(feature_cols))
    
    # ==========================================
    # 4h. META-LEARNER (STACKING)
    # ==========================================
    log.info("Treinando Meta-Learner...")
    rf_probs_val = rf.predict_proba(X_val_s)
    xgb_probs_val = xgb.predict_proba(X_val_s)
    
    # LSTM probs no validation set
    lstm_model.eval()
    with torch.no_grad():
        lstm_out = lstm_model(torch.FloatTensor(X_va_seq).to(DEVICE))
        lstm_probs_val_seq = torch.softmax(lstm_out, 1).cpu().numpy()
    # Alinhar tamanhos (LSTM tem SEQ_LEN a menos)
    offset = len(rf_probs_val) - len(lstm_probs_val_seq)
    
    meta_X = np.hstack([
        rf_probs_val[offset:],
        xgb_probs_val[offset:],
        lstm_probs_val_seq
    ])
    meta_y = y_val[offset:]
    
    meta = LogisticRegression(C=1.0, multi_class='multinomial',
                               max_iter=1000, random_state=SEED)
    meta.fit(meta_X, meta_y)
    
    # Calibração Platt
    calibrated = CalibratedClassifierCV(meta, method='sigmoid', cv=3)
    calibrated.fit(meta_X, meta_y)
    
    # ==========================================
    # 4i. AVALIAÇÃO FINAL NO TEST SET
    # ==========================================
    log.info("\\n" + "="*50)
    log.info("AVALIAÇÃO NO TEST SET")
    log.info("="*50)
    
    rf_probs_test = rf.predict_proba(X_test_s)
    xgb_probs_test = xgb.predict_proba(X_test_s)
    with torch.no_grad():
        lstm_out_test = lstm_model(torch.FloatTensor(X_te_seq).to(DEVICE))
        lstm_probs_test = torch.softmax(lstm_out_test, 1).cpu().numpy()
    
    offset_t = len(rf_probs_test) - len(lstm_probs_test)
    meta_X_test = np.hstack([
        rf_probs_test[offset_t:],
        xgb_probs_test[offset_t:],
        lstm_probs_test
    ])
    y_test_aligned = y_test[offset_t:]
    
    y_pred = calibrated.predict(meta_X_test)
    y_proba = calibrated.predict_proba(meta_X_test)
    
    report = classification_report(y_test_aligned, y_pred,
                                    target_names=CLASSES)
    log.info(f"\\n{report}")
    
    final_f1 = f1_score(y_test_aligned, y_pred, average='weighted')
    log.info(f"F1 Weighted Final: {final_f1:.4f}")
    
    # ==========================================
    # 4j. SALVAR ARTEFATOS
    # ==========================================
    version = datetime.now().strftime("%Y%m%d_%H%M")
    out_dir = f"models/ensemble_{version}"
    os.makedirs(out_dir, exist_ok=True)
    
    joblib.dump(rf, f"{out_dir}/rf.pkl")
    joblib.dump(xgb, f"{out_dir}/xgb.pkl")
    joblib.dump(calibrated, f"{out_dir}/meta_calibrated.pkl")
    joblib.dump(fe.scaler, f"{out_dir}/scaler.pkl")
    torch.save(lstm_model.state_dict(), f"{out_dir}/lstm.pt")
    
    meta_info = {
        "version": version, "horizon": horizon,
        "features": feature_cols, "seq_len": SEQ_LEN,
        "f1_test": round(final_f1, 4),
        "f1_rf": round(rf_val_f1, 4),
        "f1_xgb": round(xgb_val_f1, 4),
        "xgb_best_params": study.best_params,
        "train_size": len(X_train), "test_size": len(X_test),
    }
    with open(f"{out_dir}/meta.json", "w") as f:
        json.dump(meta_info, f, indent=2)
    
    log.info(f"Modelo salvo em: {out_dir}/")
    return meta_info

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--horizon", type=int, default=14)
    args = parser.parse_args()
    main(horizon=args.horizon)`} />
            </Panel>
          </div>
        )}

        {/* ==================== API ==================== */}
        {active === "api" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel title="API de Previsões — FastAPI" icon="🚀" accent={C.green} tag="DEPLOY">
              <Code title="api/main.py" code={`"""
API de Previsões — Terrain Recognition System
Execução: uvicorn main:app --host 0.0.0.0 --port 8000
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
import joblib
import torch
import json
from datetime import datetime, timezone
from feature_engineering import FeatureEngineer
from train_ensemble import BiLSTMAttention

app = FastAPI(title="Terrain Recon ML API", version="1.0")

# ============ CARREGAR MODELOS ============
MODEL_DIR = "models/ensemble_latest"

with open(f"{MODEL_DIR}/meta.json") as f:
    meta = json.load(f)

rf = joblib.load(f"{MODEL_DIR}/rf.pkl")
xgb = joblib.load(f"{MODEL_DIR}/xgb.pkl")
calibrated = joblib.load(f"{MODEL_DIR}/meta_calibrated.pkl")
scaler = joblib.load(f"{MODEL_DIR}/scaler.pkl")

n_features = len(meta['features'])
lstm = BiLSTMAttention(input_dim=n_features)
lstm.load_state_dict(torch.load(f"{MODEL_DIR}/lstm.pt",
                                 map_location='cpu'))
lstm.eval()

fe = FeatureEngineer()
fe.scaler = scaler
fe.fitted = True

CLASSES = ['SECA_SEVERA','SECA_LEVE','NORMAL','CHUVA','CHUVA_FORTE']

# ============ SCHEMAS ============
class SensorInput(BaseModel):
    station_id: str
    temp_air: float
    humidity: float
    pressure: float
    soil_moisture: float
    soil_temp: float
    salinity: float
    wind_speed: float
    rainfall: float
    
class PredictionOutput(BaseModel):
    station_id: str
    timestamp: str
    horizon_days: int
    predictions: dict  # classe → probabilidade
    predicted_class: str
    confidence: float
    alerts: List[dict]
    model_version: str

# ============ ENDPOINTS ============
@app.get("/health")
def health():
    return {"status": "ok", "model": meta["version"],
            "f1_test": meta["f1_test"]}

@app.post("/predict", response_model=PredictionOutput)
async def predict(data: SensorInput, horizon: int = 14):
    try:
        # 1. Buscar histórico recente do banco (30 dias)
        from db_utils import get_recent_data
        history = get_recent_data(data.station_id, days=30)
        
        # Adicionar leitura atual
        current = {col: getattr(data, col) 
                   for col in meta['features'] 
                   if hasattr(data, col)}
        history = history.append(current, ignore_index=True)
        
        # 2. Feature engineering
        featured = fe.build(history)
        X = fe.transform(featured[meta['features']].values[-1:])
        
        # 3. Ensemble prediction
        rf_probs = rf.predict_proba(X)
        xgb_probs = xgb.predict_proba(X)
        
        # LSTM (precisa de sequência)
        X_seq = fe.transform(
            featured[meta['features']].values[-30:]
        )
        X_tensor = torch.FloatTensor(X_seq).unsqueeze(0)
        with torch.no_grad():
            lstm_out = lstm(X_tensor)
            lstm_probs = torch.softmax(lstm_out, 1).numpy()
        
        # 4. Meta-learner
        meta_input = np.hstack([rf_probs, xgb_probs, lstm_probs])
        final_probs = calibrated.predict_proba(meta_input)[0]
        predicted_idx = final_probs.argmax()
        
        # 5. Calcular confiança (agreement entre modelos)
        all_preds = [rf_probs[0].argmax(), 
                     xgb_probs[0].argmax(),
                     lstm_probs[0].argmax()]
        agreement = all_preds.count(predicted_idx) / 3.0
        confidence = float(final_probs[predicted_idx] * agreement)
        
        # 6. Gerar alertas
        alerts = []
        if final_probs[0] > 0.4:  # SECA_SEVERA
            alerts.append({
                "level": "ALTA",
                "message": f"Seca severa prevista ({final_probs[0]*100:.0f}%)",
                "action": "Ativar irrigação de emergência"
            })
        if final_probs[0] + final_probs[1] > 0.6:  # Qualquer seca
            alerts.append({
                "level": "MÉDIA",
                "message": "Tendência de seca nas próximas semanas",
                "action": "Monitorar reservas de água"
            })
        if data.soil_moisture < 15:
            alerts.append({
                "level": "ALTA",
                "message": f"Solo criticamente seco ({data.soil_moisture}%)",
                "action": "Irrigação imediata recomendada"
            })
        
        return PredictionOutput(
            station_id=data.station_id,
            timestamp=datetime.now(timezone.utc).isoformat(),
            horizon_days=horizon,
            predictions={CLASSES[i]: round(float(final_probs[i]), 4)
                        for i in range(5)},
            predicted_class=CLASSES[predicted_idx],
            confidence=round(confidence, 4),
            alerts=alerts,
            model_version=meta["version"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stations/{station_id}/history")
async def station_history(station_id: str, days: int = 30):
    from db_utils import get_predictions_history
    return get_predictions_history(station_id, days)`} />

              <Code title="Dockerfile" code={`FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`} />
            </Panel>
          </div>
        )}

        {/* ==================== EDGE ML ==================== */}
        {active === "edge" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel title="TinyML — Modelo no ESP32" icon="📟" accent={C.orange} tag="EDGE AI">
              <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6, marginBottom: 10 }}>
                Um Decision Tree podado roda direto no ESP32 para alertas locais em menos de 1 segundo, sem precisar de internet. Use a biblioteca <strong style={{ color: C.orange }}>micromlgen</strong> para converter sklearn → C.
              </div>

              <Code title="ml/export_tinyml.py — Exportar para ESP32" code={`"""
Exportar modelo leve para rodar no ESP32.
Decision Tree podado: cabe em ~50KB de Flash.
"""

from sklearn.tree import DecisionTreeClassifier
from micromlgen import port
import joblib
import numpy as np

# 1. Treinar modelo leve (subset de features)
EDGE_FEATURES = [
    'temp_air', 'humidity', 'pressure', 'soil_moisture',
    'soil_temp', 'wind_speed', 'rainfall',
    'soil_moisture_mean_7d', 'soil_moisture_delta_7d',
    'dry_streak', 'vpd'
]  # 11 features (cabe no ESP32)

# Carregar dados já processados
X_train = ...  # apenas as 11 features
y_train = ...  # simplificar para 3 classes

# Simplificar target: SECA (0,1) → 0, NORMAL (2) → 1, CHUVA (3,4) → 2
y_simple = np.where(y_train <= 1, 0,
           np.where(y_train == 2, 1, 2))

clf = DecisionTreeClassifier(
    max_depth=8,           # limitar profundidade
    min_samples_leaf=50,   # evitar overfitting
    random_state=42
)
clf.fit(X_train, y_simple)

# 2. Exportar para C
c_code = port(clf, classmap={0: 'SECA', 1: 'NORMAL', 2: 'CHUVA'})

with open('esp32_model/model.h', 'w') as f:
    f.write(c_code)

print(f"Modelo exportado! Acurácia treino: {clf.score(X_train, y_simple):.3f}")
print(f"Profundidade real: {clf.get_depth()}")
print(f"Nós: {clf.tree_.node_count}")`} />

              <Code title="esp32_model/tinyml_inference.ino — Inferência no ESP32" code={`// Inferência ML local no ESP32
// Inclui o modelo gerado pelo micromlgen
#include "model.h"

// Features que o modelo espera (mesma ordem do treino)
float features[11];
Eloquent::ML::Port::DecisionTree clf;

String classifyCondition() {
    // Preencher features com dados dos sensores
    features[0]  = currentData.tempAir;
    features[1]  = currentData.humidity;
    features[2]  = currentData.pressure;
    features[3]  = currentData.soilMoisture;
    features[4]  = currentData.soilTemp;
    features[5]  = currentData.windSpeed;
    features[6]  = currentData.rainfall;
    features[7]  = soilMoistureMean7d;    // buffer circular
    features[8]  = soilMoistureDelta7d;   // calculado localmente
    features[9]  = dryStreakDays;          // contador local
    features[10] = calculateVPD();        // fórmula local
    
    // Inferência: ~2-5ms no ESP32
    int prediction = clf.predict(features);
    
    // Classes: 0=SECA, 1=NORMAL, 2=CHUVA
    String result;
    switch(prediction) {
        case 0:  result = "SECA";   break;
        case 1:  result = "NORMAL"; break;
        case 2:  result = "CHUVA";  break;
        default: result = "UNKNOWN";
    }
    
    // ALERTA LOCAL (sem internet!)
    if (prediction == 0 && currentData.soilMoisture < 20) {
        triggerLocalAlarm();  // LED vermelho + buzzer
        Serial.println("⚠️ ALERTA LOCAL: SECA DETECTADA!");
    }
    
    return result;
}

float calculateVPD() {
    float es = 0.6108 * exp(
        17.27 * currentData.tempAir / 
        (currentData.tempAir + 237.3)
    );
    return es * (1.0 - currentData.humidity / 100.0);
}

// Buffer circular para média móvel de 7 dias
#define BUFFER_SIZE 672  // 7 dias × 96 leituras/dia (15 min)
float soilBuffer[BUFFER_SIZE];
int bufferIdx = 0;

void updateBuffers() {
    soilBuffer[bufferIdx % BUFFER_SIZE] = currentData.soilMoisture;
    bufferIdx++;
    
    // Média 7 dias
    float sum = 0;
    int count = min(bufferIdx, BUFFER_SIZE);
    for (int i = 0; i < count; i++) sum += soilBuffer[i];
    soilMoistureMean7d = sum / count;
    
    // Delta 7 dias
    if (bufferIdx >= BUFFER_SIZE) {
        int oldIdx = (bufferIdx - BUFFER_SIZE) % BUFFER_SIZE;
        soilMoistureDelta7d = currentData.soilMoisture - soilBuffer[oldIdx];
    }
}`} />
            </Panel>
          </div>
        )}

        {/* ==================== DASHBOARD ==================== */}
        {active === "dash" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel title="Dashboard — Integração com API" icon="📊" accent={C.rain} tag="FRONTEND">
              <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6, marginBottom: 10 }}>
                O dashboard (já criado no primeiro artefato) consome a API de previsões. Abaixo está a lógica de integração para substituir os dados mockados por dados reais.
              </div>
              <Code title="dashboard/api-client.js — Hook de Dados Reais" code={`/**
 * Hook React para consumir a API de previsões.
 * Substituir dados mockados do dashboard original.
 */

const API_BASE = 'https://api.seu-dominio.com';

// Hook: buscar dados de todas as estações
export function useStationsData(refreshInterval = 60000) {
  const [stations, setStations] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchAll() {
      try {
        // 1. Buscar leituras atuais de todas as estações
        const res = await fetch(API_BASE + '/stations');
        const stationsList = await res.json();
        setStations(stationsList);
        
        // 2. Buscar previsões para cada estação
        const preds = {};
        for (const st of stationsList) {
          const predRes = await fetch(
            API_BASE + '/predict', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                station_id: st.id,
                temp_air: st.sensors.temp_air,
                humidity: st.sensors.humidity,
                pressure: st.sensors.pressure,
                soil_moisture: st.sensors.soil_moisture,
                soil_temp: st.sensors.soil_temp,
                salinity: st.sensors.salinity,
                wind_speed: st.sensors.wind_speed,
                rainfall: st.sensors.rainfall,
              })
            }
          );
          preds[st.id] = await predRes.json();
        }
        setPredictions(preds);
        
      } catch (err) {
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAll();
    const interval = setInterval(fetchAll, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);
  
  return { stations, predictions, loading };
}

// Hook: histórico de uma estação específica
export function useStationHistory(stationId, days = 180) {
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    fetch(API_BASE + '/stations/' + stationId + '/history?days=' + days)
      .then(r => r.json())
      .then(setHistory)
      .catch(console.error);
  }, [stationId, days]);
  
  return history;
}

// WebSocket para dados real-time
export function useRealtimeData(stationId) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const ws = new WebSocket(
      'wss://api.seu-dominio.com/ws/' + stationId
    );
    ws.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };
    return () => ws.close();
  }, [stationId]);
  
  return data;
}`} />
            </Panel>
          </div>
        )}

        {/* ==================== MLOPS ==================== */}
        {active === "ops" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Panel title="MLOps — Automação e Monitoramento" icon="🔄" accent={C.danger} tag="PRODUÇÃO">
              <Code title="ops/airflow_dag.py — Pipeline Automatizado" code={`"""
Airflow DAG: Pipeline automático de retreino e monitoramento.
Executa diariamente para verificar drift e retreinar se necessário.
"""

from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from datetime import datetime, timedelta
import json

default_args = {
    'owner': 'terrain-recon',
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'terrain_ml_pipeline',
    default_args=default_args,
    description='Pipeline ML diário',
    schedule_interval='0 6 * * *',  # 6h todo dia
    start_date=datetime(2026, 1, 1),
    catchup=False,
)

# ============ TASKS ============

def check_data_drift(**ctx):
    """Verificar se distribuição dos dados mudou (PSI)."""
    from monitoring import calculate_psi
    
    psi_scores = calculate_psi(
        reference_window=30,  # últimos 30 dias como ref
        current_window=7      # última semana
    )
    
    max_psi = max(psi_scores.values())
    drift_detected = max_psi > 0.2
    
    ctx['ti'].xcom_push(key='drift_detected', value=drift_detected)
    ctx['ti'].xcom_push(key='max_psi', value=round(max_psi, 4))
    
    if drift_detected:
        print(f"⚠️ DATA DRIFT detectado! PSI={max_psi:.4f}")
    return drift_detected

def check_model_performance(**ctx):
    """Verificar F1-score do modelo atual."""
    from monitoring import evaluate_recent_predictions
    
    metrics = evaluate_recent_predictions(days=7)
    f1_current = metrics['f1_weighted']
    f1_baseline = 0.85  # threshold mínimo
    
    degraded = f1_current < f1_baseline
    ctx['ti'].xcom_push(key='f1_current', value=round(f1_current, 4))
    ctx['ti'].xcom_push(key='needs_retrain', value=degraded)
    
    if degraded:
        print(f"⚠️ PERFORMANCE DEGRADADA! F1={f1_current:.4f}")
    return degraded

def retrain_if_needed(**ctx):
    """Retreinar se drift ou degradação detectados."""
    ti = ctx['ti']
    drift = ti.xcom_pull(key='drift_detected')
    degraded = ti.xcom_pull(key='needs_retrain')
    
    if drift or degraded:
        from train_ensemble import main as train
        result = train(horizon=14)
        
        # Salvar resultado e notificar
        print(f"✅ Retreino completo! F1={result['f1_test']:.4f}")
        
        # A/B test: novo modelo em shadow mode por 48h
        from deploy import deploy_shadow(result['version'])
        return result
    
    print("✅ Modelo OK — sem necessidade de retreino")
    return None

def send_daily_report(**ctx):
    """Enviar relatório diário por email/Slack."""
    ti = ctx['ti']
    report = {
        'date': datetime.now().isoformat(),
        'data_drift': ti.xcom_pull(key='drift_detected'),
        'max_psi': ti.xcom_pull(key='max_psi'),
        'f1_score': ti.xcom_pull(key='f1_current'),
        'retrained': ti.xcom_pull(key='needs_retrain'),
    }
    # Enviar via webhook/email
    from notifications import send_report
    send_report(report)

# ============ DAG FLOW ============
t1 = PythonOperator(task_id='check_drift',
                     python_callable=check_data_drift, dag=dag)
t2 = PythonOperator(task_id='check_performance',
                     python_callable=check_model_performance, dag=dag)
t3 = PythonOperator(task_id='retrain',
                     python_callable=retrain_if_needed, dag=dag)
t4 = PythonOperator(task_id='report',
                     python_callable=send_daily_report, dag=dag)

[t1, t2] >> t3 >> t4`} />

              <div style={{ marginTop: 14, padding: 14, background: `${C.accent}08`, borderRadius: 10, border: `1px solid ${C.accent}22` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, fontFamily: mono, marginBottom: 10 }}>📋 CHECKLIST DE DEPLOY FINAL</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {[
                    "✅ Hardware montado e calibrado (3 estações)",
                    "✅ Firmware ESP32 flash + teste de sensores",
                    "✅ Gateway Raspberry Pi + LoRa configurado",
                    "✅ Docker Compose (TimescaleDB + Mosquitto + Ingester)",
                    "✅ Feature Engineering testado com dados reais",
                    "✅ Ensemble treinado (RF + XGB + LSTM + Meta)",
                    "✅ API FastAPI deployada (Docker + HTTPS)",
                    "✅ TinyML exportado para ESP32 (model.h)",
                    "✅ Dashboard conectado à API real",
                    "✅ Airflow DAG de monitoramento ativo",
                    "✅ Alertas configurados (email/Slack/SMS)",
                    "✅ Backup 4G testado em todas as estações",
                  ].map((item, i) => (
                    <div key={i} style={{ fontSize: 11, color: C.dim, padding: "4px 0", lineHeight: 1.4 }}>{item}</div>
                  ))}
                </div>
              </div>
            </Panel>
          </div>
        )}

      </div>
    </div>
  );
}
