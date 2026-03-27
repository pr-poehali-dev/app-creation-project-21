import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const BG_IMAGE = "https://cdn.poehali.dev/projects/df1a2766-f777-440c-87e9-045a5b84730a/files/77de9fa8-3566-4421-8750-51bb65e16890.jpg";

const ACCOUNTS = [
  { id: 1, name: "ProGamer_228", avatar: "🎮", status: "online" },
  { id: 2, name: "SandroVegas", avatar: "🔥", status: "offline" },
  { id: 3, name: "DarkKnight_SA", avatar: "⚔️", status: "away" },
];

const SERVERS = [
  { id: 1, name: "ТЕСТ", ip: "188.127.241.8:1130", players: "0/1000", ping: 0, locked: false },
  { id: 2, name: "ЗАКРЫТО", ip: "", players: "—", ping: 0, locked: true },
  { id: 3, name: "ЗАКРЫТО", ip: "", players: "—", ping: 0, locked: true },
];

const NEWS = [
  {
    id: 1,
    tag: "ОБНОВЛЕНИЕ",
    date: "27 марта 2026",
    title: "Клиент SAMP 0.3.7 R4 — критический патч безопасности",
    desc: "Устранены уязвимости в сетевом стеке. Обновление обязательно для всех пользователей.",
    accent: "#00e5ff",
  },
  {
    id: 2,
    tag: "СОБЫТИЕ",
    date: "25 марта 2026",
    title: "Турнир по Deathmatch — призовой фонд 50,000₽",
    desc: "Регистрация открыта. 128 участников, групповой этап стартует 1 апреля.",
    accent: "#ff6b35",
  },
  {
    id: 3,
    tag: "СООБЩЕСТВО",
    date: "20 марта 2026",
    title: "Новый форум и Discord-сервер",
    desc: "Присоединяйся к 50,000+ игроков. Помощь, гайды, поиск команды.",
    accent: "#7c3aed",
  },
];

const CHAT_MESSAGES = [
  { id: 1, user: "ProGamer_228", text: "Кто играет на Аризоне?", time: "14:32", color: "#00e5ff" },
  { id: 2, user: "SandroVegas", text: "я там, заходи на 3 сервер", time: "14:33", color: "#ff6b35" },
  { id: 3, user: "Maks_Tuning", text: "пинг что-то высокий сегодня", time: "14:33", color: "#00ff88" },
  { id: 4, user: "DarkKnight_SA", text: "обновите клиент, исправили", time: "14:35", color: "#c084fc" },
  { id: 5, user: "Система", text: "Сервер Arizona RP перезагрузился", time: "14:36", color: "#ffaa00" },
];

type Tab = "play" | "news" | "settings";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("play");
  const [activeAccount, setActiveAccount] = useState(ACCOUNTS[0]);
  const [nickname, setNickname] = useState("ProGamer_228");
  const [selectedServer, setSelectedServer] = useState(SERVERS.find(s => !s.locked)!);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [launchStatus, setLaunchStatus] = useState("");
  const [downloadProgress, setDownloadProgress] = useState(72);
  const [isDownloading, setIsDownloading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [settings, setSettings] = useState({
    resolution: "1920x1080",
    fps: "60",
    graphics: "high",
    autoUpdate: true,
    notifications: true,
    savePassword: true,
  });
  const chatRef = useRef<HTMLDivElement>(null);

  const launchSteps = [
    "Проверка файлов игры...",
    "Подключение к серверу...",
    "Загрузка ресурсов...",
    "Запуск клиента...",
  ];

  const handleLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    setLaunchProgress(0);
    let step = 0;
    setLaunchStatus(launchSteps[0]);
    const interval = setInterval(() => {
      step++;
      setLaunchProgress((step / launchSteps.length) * 100);
      if (step < launchSteps.length) {
        setLaunchStatus(launchSteps[step]);
      } else {
        clearInterval(interval);
        setLaunchStatus("Запущено! Удачной игры 🎮");
        setTimeout(() => { setIsLaunching(false); setLaunchProgress(0); setLaunchStatus(""); }, 2000);
      }
    }, 900);
  };

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    const interval = setInterval(() => {
      setDownloadProgress(p => {
        if (p >= 100) { clearInterval(interval); setIsDownloading(false); return 100; }
        return p + Math.random() * 3;
      });
    }, 200);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      user: nickname,
      text: chatInput,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      color: "#00e5ff"
    }]);
    setChatInput("");
    setTimeout(() => { chatRef.current?.scrollTo({ top: 9999, behavior: "smooth" }); }, 50);
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative flex flex-col" style={{ fontFamily: "'Exo 2', sans-serif" }}>
      {/* Background */}
      <div className="absolute inset-0 z-0" style={{ background: "#0a0f1e" }} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-3" style={{ borderBottom: "1px solid rgba(0,229,255,0.1)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-float" style={{ background: "linear-gradient(135deg, #00e5ff, #0070f3)" }}>
            <span className="text-xs font-bold text-[#0a0f1e]" style={{ fontFamily: "Rajdhani, sans-serif" }}>SA</span>
          </div>
          <div>
            <div className="text-sm font-bold leading-none" style={{ fontFamily: "Rajdhani, sans-serif", color: "#00e5ff", letterSpacing: "0.1em" }}>
              SAMP LAUNCHER
            </div>
            <div className="text-[10px] opacity-40 leading-none mt-0.5">v0.3.7 R3</div>
          </div>
        </div>

        {/* Account switcher */}
        <div className="relative">
          <button
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all glass-card hover:border-cyan-500/40"
          >
            <span className="text-lg">{activeAccount.avatar}</span>
            <div className="text-left">
              <div className="text-xs font-semibold text-cyan-300 leading-none">{activeAccount.name}</div>
              <div className="text-[10px] opacity-50 mt-0.5">Мультиаккаунт</div>
            </div>
            <div className={`w-2 h-2 rounded-full ml-1 ${activeAccount.status === "online" ? "status-online" : activeAccount.status === "away" ? "status-away" : "status-offline"}`} />
            <Icon name="ChevronDown" size={12} className="opacity-50 ml-1" />
          </button>

          {showAccountMenu && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden z-50 animate-fade-in glass-card" style={{ border: "1px solid rgba(0,229,255,0.2)" }}>
              {ACCOUNTS.map(acc => (
                <button
                  key={acc.id}
                  onClick={() => { setActiveAccount(acc); setNickname(acc.name); setShowAccountMenu(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left ${activeAccount.id === acc.id ? "bg-cyan-500/10" : ""}`}
                >
                  <span className="text-base">{acc.avatar}</span>
                  <div>
                    <div className="text-xs font-semibold text-cyan-100">{acc.name}</div>
                    <div className="text-[10px] opacity-40">{acc.status === "online" ? "В сети" : acc.status === "away" ? "Отошёл" : "Не в сети"}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ml-auto ${acc.status === "online" ? "status-online" : acc.status === "away" ? "status-away" : "status-offline"}`} />
                </button>
              ))}
              <div style={{ borderTop: "1px solid rgba(0,229,255,0.1)" }}>
                <button className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 transition-colors text-xs text-cyan-400">
                  <Icon name="Plus" size={12} /> Добавить аккаунт
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Nickname inline */}
          <input
            className="input-neon px-3 py-1 rounded-lg text-xs w-36"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="Никнейм..."
            maxLength={24}
          />
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md glass-card text-xs">
            <div className="w-1.5 h-1.5 rounded-full status-online animate-pulse" />
            <span className="text-cyan-300 opacity-70">Online</span>
          </div>
          <button className="w-7 h-7 rounded-md glass-card flex items-center justify-center hover:text-yellow-400 transition-colors">
            <Icon name="Minus" size={12} />
          </button>
          <button className="w-7 h-7 rounded-md glass-card flex items-center justify-center hover:text-red-400 transition-colors">
            <Icon name="X" size={12} />
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-16 flex flex-col items-center py-4 gap-1" style={{ borderRight: "1px solid rgba(0,229,255,0.08)" }}>
          {([
            { id: "play", icon: "Play", label: "Играть" },
            { id: "news", icon: "Newspaper", label: "Новости" },
            { id: "settings", icon: "Settings", label: "Настройки" },
          ] as { id: Tab; icon: string; label: string }[]).map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative group ${activeTab === item.id ? "tab-active" : "hover:bg-white/5"}`}
              style={{ border: "1px solid transparent" }}
            >
              <Icon name={item.icon} size={16} className={activeTab === item.id ? "text-cyan-400" : "opacity-50"} />
              {activeTab === item.id && (
                <div className="absolute right-0 w-0.5 h-6 rounded-l-full" style={{ background: "linear-gradient(180deg, #00e5ff, #0070f3)" }} />
              )}
              <div className="absolute left-full ml-2 px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none glass-card z-50">
                {item.label}
              </div>
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-4" onClick={() => setShowAccountMenu(false)}>

          {/* PLAY TAB */}
          {activeTab === "play" && (
            <div className="h-full flex gap-4 animate-fade-in">
              <div className="flex-1 flex flex-col gap-4">
                {/* Spacer to push button to bottom */}
                <div className="flex-1" />

                {/* Bottom: button + progress */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLaunch}
                    disabled={isLaunching}
                    className="btn-neon rounded-2xl px-8 py-3 text-base relative overflow-hidden shrink-0"
                    style={{ minWidth: 160, opacity: isLaunching ? 0.7 : 1 }}
                  >
                    <div className="scan-overlay" />
                    <div className="flex items-center gap-2">
                      <Icon name={isLaunching ? "Loader" : "Download"} size={16} className={isLaunching ? "animate-spin" : ""} />
                      {isLaunching ? "ЗАПУСК..." : launchProgress === 0 ? "УСТАНОВИТЬ" : "ИГРАТЬ"}
                    </div>
                  </button>

                  {isLaunching && (
                    <div className="flex-1 animate-fade-in">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-cyan-300">{launchStatus}</span>
                        <span className="text-xs opacity-40">{Math.round(launchProgress)}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(0,229,255,0.1)" }}>
                        <div className="progress-bar-fill h-full rounded-full" style={{ width: `${launchProgress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-64 flex flex-col gap-4">
                <div className="glass-card rounded-2xl p-4">
                  <div className="text-[10px] uppercase tracking-widest opacity-40 mb-3">Серверы</div>
                  {SERVERS.map(srv => (
                    <div
                      key={srv.id}
                      onClick={() => !srv.locked && setSelectedServer(srv)}
                      className={`flex items-center gap-3 py-2 transition-all rounded-xl px-2 -mx-2 ${srv.locked ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:bg-white/5"} ${selectedServer.id === srv.id && !srv.locked ? "bg-cyan-500/10" : ""}`}
                      style={{ borderBottom: "1px solid rgba(0,229,255,0.06)" }}
                    >
                      <Icon name={srv.locked ? "Lock" : "Server"} size={13} className={srv.locked ? "opacity-40" : "text-cyan-400"} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold truncate" style={{ fontFamily: "Rajdhani, sans-serif", color: srv.locked ? "rgba(255,255,255,0.3)" : "#e0f7ff" }}>{srv.name}</div>
                        {!srv.locked && <div className="text-[10px] opacity-40">{srv.ip}</div>}
                      </div>
                      {!srv.locked && <span className="text-[10px] text-cyan-400 shrink-0">{srv.players}</span>}
                    </div>
                  ))}
                </div>

                <div className="glass-card rounded-2xl p-3 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-cyan-100">Авто-обновление</div>
                    <div className="text-[10px] opacity-40">Проверять при запуске</div>
                  </div>
                  <button
                    onClick={() => setSettings(s => ({ ...s, autoUpdate: !s.autoUpdate }))}
                    className="w-10 h-5 rounded-full relative transition-all shrink-0"
                    style={{ background: settings.autoUpdate ? "linear-gradient(135deg, #00e5ff, #0070f3)" : "rgba(255,255,255,0.1)" }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-md"
                      style={{ left: settings.autoUpdate ? "calc(100% - 18px)" : "2px" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NEWS TAB */}
          {activeTab === "news" && (
            <div className="h-full flex flex-col gap-3 animate-fade-in">
              <div>
                <div className="font-bold text-cyan-100" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 18, letterSpacing: "0.05em" }}>НОВОСТИ</div>
                <div className="text-[11px] opacity-40">Последние события SA:MP</div>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {NEWS.map((item, i) => (
                  <div
                    key={item.id}
                    className="glass-card rounded-2xl p-5 animate-slide-in cursor-pointer hover:bg-white/5 transition-all"
                    style={{ animationDelay: `${i * 0.08}s`, borderLeft: `3px solid ${item.accent}` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest"
                        style={{ background: `${item.accent}18`, color: item.accent, border: `1px solid ${item.accent}40` }}
                      >
                        {item.tag}
                      </span>
                      <span className="text-[10px] opacity-30">{item.date}</span>
                    </div>
                    <div className="font-bold text-cyan-100 mb-1.5" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 15 }}>
                      {item.title}
                    </div>
                    <div className="text-[11px] opacity-50 leading-relaxed">{item.desc}</div>
                    <div className="flex items-center gap-1 mt-3 text-[11px]" style={{ color: item.accent }}>
                      <span>Читать далее</span>
                      <Icon name="ArrowRight" size={11} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="h-full overflow-y-auto pr-1 animate-fade-in">
              <div className="mb-4">
                <div className="font-bold text-cyan-100" style={{ fontFamily: "Rajdhani, sans-serif", fontSize: 18, letterSpacing: "0.05em" }}>НАСТРОЙКИ</div>
                <div className="text-[11px] opacity-40">Параметры лаунчера и игры</div>
              </div>

              <div className="space-y-3">
                <div className="glass-card rounded-2xl p-4">
                  <div className="text-[10px] uppercase tracking-widest opacity-40 mb-3">Графика</div>
                  <div className="space-y-3">
                    {[
                      { key: "resolution", label: "Разрешение", options: ["1920x1080", "1280x720", "1366x768", "2560x1440"] },
                      { key: "fps", label: "Лимит FPS", options: ["30", "60", "120", "144", "240", "Без лимита"] },
                      { key: "graphics", label: "Качество", options: ["low", "medium", "high", "ultra"] },
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-xs opacity-60">{item.label}</span>
                        <select
                          className="input-neon px-2 py-1 rounded-lg text-xs"
                          value={settings[item.key as keyof typeof settings] as string}
                          onChange={e => setSettings(s => ({ ...s, [item.key]: e.target.value }))}
                        >
                          {item.options.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-4">
                  <div className="text-[10px] uppercase tracking-widest opacity-40 mb-3">Основное</div>
                  <div className="space-y-3">
                    {[
                      { key: "autoUpdate", label: "Авто-обновление", desc: "Проверять обновления при запуске" },
                      { key: "notifications", label: "Уведомления", desc: "Показывать системные уведомления" },
                      { key: "savePassword", label: "Сохранять пароли", desc: "Хранить данные аккаунтов" },
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between py-1">
                        <div>
                          <div className="text-xs text-cyan-100">{item.label}</div>
                          <div className="text-[10px] opacity-40">{item.desc}</div>
                        </div>
                        <button
                          onClick={() => setSettings(s => ({ ...s, [item.key]: !(s[item.key as keyof typeof s]) }))}
                          className="w-10 h-5 rounded-full relative transition-all shrink-0"
                          style={{ background: settings[item.key as keyof typeof settings] ? "linear-gradient(135deg, #00e5ff, #0070f3)" : "rgba(255,255,255,0.1)" }}
                        >
                          <div
                            className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-md"
                            style={{ left: settings[item.key as keyof typeof settings] ? "calc(100% - 18px)" : "2px" }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-4">
                  <div className="text-[10px] uppercase tracking-widest opacity-40 mb-3">О программе</div>
                  <div className="space-y-1.5">
                    {[
                      { label: "Версия лаунчера", value: "1.0.0" },
                      { label: "Версия SAMP", value: "0.3.7 R3" },
                      { label: "Версия GTA SA", value: "1.0 US" },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between">
                        <span className="text-[11px] opacity-50">{item.label}</span>
                        <span className="text-[11px] text-cyan-300" style={{ fontFamily: "Rajdhani, sans-serif" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 flex items-center justify-between px-6 py-2 text-[10px] opacity-40"
        style={{ borderTop: "1px solid rgba(0,229,255,0.08)" }}
      >
        <div className="flex items-center gap-4">
          <span>CPU: 23%</span>
          <span>RAM: 1.2 GB</span>
          <span>Ping: {selectedServer.ping}ms</span>
        </div>
        <span>© 2026 SAMP Launcher — все права защищены</span>
      </div>
    </div>
  );
}