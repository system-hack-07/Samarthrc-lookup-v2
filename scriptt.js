/* ================================
   SAMARTH HACKER SYSTEM
   RC LOOKUP + TELEGRAM BOT READY
   ================================ */

const BOT_TOKEN = "8684772454:AAF8vsrr9KcmPdA42di_B4geJL44aCL7sBQ";
const TELEGRAM_API = "https://api.telegram.org/bot8684772454:AAF8vsrr9KcmPdA42di_B4geJL44aCL7sBQ/";

/* ================================
   RC LOOKUP FUNCTION
   ================================ */

async function fetchRC(){
  const rc = document.getElementById("rcInput").value.trim();
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");

  if(!rc){
    alert("ENTER RC NUMBER");
    return;
  }

  loading.style.display = "block";
  result.style.display = "none";
  result.innerHTML = "";

  try{
    // 🔗 Replace API URL with your real API later
    const API_URL = `https://YOUR_API_URL_HERE?rc=${rc}`;

    const response = await fetch(API_URL);

    if(!response.ok){
      throw new Error("API ERROR");
    }

    const data = await response.json();

    loading.style.display = "none";
    result.style.display = "block";

    result.innerHTML = `
      <div>>> SYSTEM DATA EXTRACTED</div>
      <div>--------------------------</div>
      <div>RC_NUMBER : ${data.rc || rc}</div>
      <div>STATUS    : ${data.status || "N/A"}</div>
      <div>OWNER     : ${data.owner || "N/A"}</div>
      <div>VEHICLE   : ${data.vehicle || "N/A"}</div>
      <div>CITY      : ${data.city || "N/A"}</div>
      <div>--------------------------</div>
      <div>ACCESS_LEVEL : ROOT_GRANTED</div>
    `;

  }catch(error){
    loading.style.display = "none";
    result.style.display = "block";
    result.innerHTML = `<div style="color:#ff4d4d;">SYSTEM ERROR : API FAILED</div>`;
    console.error(error);
  }
}

/* ================================
   TELEGRAM BOT MESSAGE FUNCTION
   ================================ */

async function sendToTelegram(chatId, message){
  try{
    const url = `${TELEGRAM_API}sendMessage`;

    const payload = {
      chat_id: chatId,
      text: message
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return data;

  }catch(err){
    console.error("TELEGRAM ERROR:", err);
  }
}

/* ================================
   SYSTEM READY
   ================================ */
console.log("samarth hacker system loaded");