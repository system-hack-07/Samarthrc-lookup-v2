let attempts = 0;
const maxSearchesPerDay = 5; // ✅ Daily searches increased

// DISCLAIMER SOUND & ACCEPT (Hacker AI TTS with echo/fade)
function acceptDisclaimer() {
  const msg = new SpeechSynthesisUtterance(
    "Welcome to this website, made by Master Samarth Hacker"
  );

  // Hacker style: lower pitch, slower rate
  msg.pitch = 0.7;
  msg.rate = 0.95;

  // Choose futuristic English voice if available
  const voices = window.speechSynthesis.getVoices();
  msg.voice = voices.find(v => v.lang.includes('en') && v.name.toLowerCase().includes('male')) || voices[0];

  // Play TTS with a slight echo effect using multiple utterances
  window.speechSynthesis.speak(msg);
  setTimeout(() => {
    const echo = new SpeechSynthesisUtterance("Welcome to this website, made by Master Samarth Hacker");
    echo.pitch = 0.6; // lower
    echo.rate = 1.0;  // normal speed
    echo.volume = 0.5; // softer echo
    echo.voice = msg.voice;
    window.speechSynthesis.speak(echo);
  }, 600); // 600ms delay for echo

  document.getElementById("disclaimerScreen").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
}

// LOGIN
function checkPassword() {
  const password = document.getElementById("passwordInput").value;
  if (password === "Avenue-1") {
    document.getElementById("loginScreen").style.display = "none";
    startBoot();
  } else {
    attempts++;
    document.getElementById("loginError").innerText =
      "🚫 ACCESS DENIED - Attempt " + attempts + " / 3";
    if (attempts >= 3)
      document.getElementById("loginError").innerText = "🔒 SYSTEM LOCKED";
  }
}

// BOOT TERMINAL
function startBoot() {
  const boot = document.getElementById("bootScreen");
  boot.style.display = "flex";

  const bootSound = document.getElementById("bootSound");
  if (bootSound) bootSound.play().catch(e => console.log("Boot sound blocked:", e));

  const logs = [
    "🔐 Authenticating user...",
    "🛰 Connecting to vehicle intelligence network...",
    "📡 Syncing national vehicle database...",
    "⚙ Loading radar modules...",
    "🚗 Initializing vehicle lookup engine...",
    "✅ Access granted"
  ];

  let line = 0;
  const logBox = document.getElementById("bootLog");

  function typeLine() {
    if (line < logs.length) {
      let text = logs[line];
      let char = 0;
      const typing = setInterval(() => {
        logBox.innerHTML += text.charAt(char);
        char++;
        if (char >= text.length) {
          clearInterval(typing);
          logBox.innerHTML += "\n";
          line++;
          setTimeout(typeLine, 500);
        }
      }, 30);
    } else {
      setTimeout(() => {
        boot.style.display = "none";
        document.getElementById("app").style.display = "flex";

        const startup = document.getElementById("startupSound");
        if (startup) startup.play().catch(e => console.log("Startup sound blocked:", e));
      }, 1000);
    }
  }

  typeLine();
}

// VEHICLE LOOKUP
async function fetchRC() {
  let today = new Date().toDateString();
  let searches = JSON.parse(localStorage.getItem("searches")) || {};
  if (searches.date !== today) {
    searches = { date: today, count: 0 };
  }
  if (searches.count >= maxSearchesPerDay) {
    alert(`❌ You have reached the maximum of ${maxSearchesPerDay} searches today.`);
    return;
  }
  searches.count++;
  localStorage.setItem("searches", JSON.stringify(searches));

  const rc = document.getElementById("rcInput").value.trim().toUpperCase();
  const radar = document.getElementById("radarScan");
  const result = document.getElementById("result");
  const risk = document.getElementById("riskIndicator");
  radar.style.display = "block";

  // SCAN SOUND
  const scanSound = document.getElementById("scanSound");
  if (scanSound) scanSound.play().catch(e => console.log("Scan sound blocked:", e));

  setTimeout(async () => {
    try {
      const response = await fetch(`/api/rc?rc=${encodeURIComponent(rc)}`);
      const data = await response.json();
      const d = data.details;
      radar.style.display = "none";

      let riskLevel = "LOW",
        riskClass = "low";
      if (d["Vehicle Class"]?.includes("Transport")) {
        riskLevel = "MEDIUM";
        riskClass = "medium";
      }
      if (d["Fuel Type"] === "Diesel") {
        riskLevel = "HIGH";
        riskClass = "high";
      }
      risk.innerHTML = `<h4 class="${riskClass}">⚠ RISK LEVEL : ${riskLevel}</h4>`;

      // DYNAMIC DISPLAY OF ALL FIELDS
      let output = `RC : ${data.rc}\n`;
      for (const key in d) {
        output += `${key} : ${d[key] || "N/A"}\n`;
      }
      result.innerText = output;

      // ✅ Completion Sound
      const infoSound = document.getElementById("infoSound");
      if (infoSound) infoSound.play().catch(e => console.log("Info sound blocked:", e));
    } catch {
      radar.style.display = "none";
      result.innerText = "Vehicle Data Error";
    }
  }, 2500);
}