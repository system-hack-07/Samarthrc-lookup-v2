let attempts = 0;

window.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const click = document.getElementById("clickSound");
      if(click) click.play().catch(()=>{});
    });
  });

});

// ✅ FIXED DISCLAIMER BUTTON
function acceptDisclaimer() {

  try {
    const msg = new SpeechSynthesisUtterance(
      "Welcome to this website, made by Master Samarth Hacker"
    );

    let voices = speechSynthesis.getVoices();

    if (!voices.length) {
      speechSynthesis.onvoiceschanged = () => {
        msg.voice = speechSynthesis.getVoices()[0];
        speechSynthesis.speak(msg);
      };
    } else {
      msg.voice = voices[0];
      speechSynthesis.speak(msg);
    }

  } catch(e) {}

  // 🔥 IMPORTANT FIX
  document.getElementById("disclaimerScreen").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
}

// LOGIN
function checkPassword(){
  const password = document.getElementById("passwordInput").value;

  if(password==="Avenue-1"){
    document.getElementById("loginScreen").style.display="none";
    startBoot();
  }else{
    attempts++;
    document.getElementById("loginError").innerText =
      "🚫 ACCESS DENIED - Attempt "+attempts+" / 3";

    if(attempts>=3)
      document.getElementById("loginError").innerText="🔒 SYSTEM LOCKED";
  }
}

// BOOT
function startBoot(){
  const boot = document.getElementById("bootScreen");
  boot.style.display="flex";

  const logs = [
    "🔐 Authenticating user...",
    "🛰 Connecting to network...",
    "📡 Syncing database...",
    "⚙ Loading modules...",
    "🚗 Initializing...",
    "✅ Access granted"
  ];

  let i = 0;
  const logBox = document.getElementById("bootLog");

  function next(){
    if(i < logs.length){
      logBox.innerHTML += logs[i] + "\n";
      i++;
      setTimeout(next, 400);
    } else {
      setTimeout(()=>{
        boot.style.display="none";
        document.getElementById("app").style.display="flex";
      },1000);
    }
  }

  next();
}

// FETCH
async function fetchRC(){

  const rc = document.getElementById("rcInput").value.trim().toUpperCase();
  if(!rc){ alert("Enter RC"); return; }

  const radar = document.getElementById("radarScan");
  const result = document.getElementById("result");

  radar.style.display="block";
  result.innerText="";

  setTimeout(async ()=>{
    try{
      const res = await fetch(`/api/rc?rc=${rc}`);
      const data = await res.json();

      radar.style.display="none";

      if(!data || !data.details){
        result.innerText="No Data Found";
        return;
      }

      let output = `RC : ${data.rc}\n\n`;

      for(const key in data.details){
        output += `${key} : ${data.details[key] || "N/A"}\n`;
      }

      result.innerText = output;

    }catch{
      radar.style.display="none";
      result.innerText="Error fetching data";
    }

  },2000);
        }
