/* =========================================
   SAMARTH HACKER SYSTEM
   RC LOOKUP FRONTEND (REAL API CONNECTED)
   ========================================= */

console.log("samarth hacker system loaded");

async function fetchRC(){
  const rc = document.getElementById("rcInput").value.trim().toUpperCase();
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
    // 🔗 REAL API
    const API_URL = `https://vehicle-eight-vert.vercel.app/api?rc=${encodeURIComponent(rc)}`;

    const response = await fetch(API_URL);

    if(!response.ok){
      throw new Error("API REQUEST FAILED");
    }

    const data = await response.json();

    if(!data || !data.details){
      throw new Error("NO VEHICLE DATA FOUND");
    }

    const d = data.details;

    loading.style.display = "none";
    result.style.display = "block";

    result.innerHTML = `
      <div>>> VEHICLE DATA EXTRACTED</div>
      <div>--------------------------</div>
      <div><b>RC Number:</b> ${data.rc}</div>
      <div><b>Owner:</b> ${d["Owner Name"]}</div>
      <div><b>Model:</b> ${d["Maker Model"]}</div>
      <div><b>Fuel Type:</b> ${d["Fuel Type"]}</div>
      <div><b>Vehicle Class:</b> ${d["Vehicle Class"]}</div>
      <div><b>RTO:</b> ${d["Registered RTO"]}</div>
      <div><b>City:</b> ${d["City Name"]}</div>
      <div><b>Registration Date:</b> ${d["Registration Date"]}</div>
      <div><b>Tax Upto:</b> ${d["Tax Upto"]}</div>
      <div><b>Fitness Upto:</b> ${d["Fitness Upto"]}</div>
      <div><b>PUC Upto:</b> ${d["PUC Upto"]}</div>
      <div><b>Insurance Company:</b> ${d["Insurance Company"]}</div>
      <div><b>Insurance Expiry:</b> ${d["Insurance Expiry"]}</div>
      <div><b>Contact:</b> ${d["Phone"]}</div>
      <div><b>Address:</b> ${d["Address"]}</div>
      <div>--------------------------</div>
      <div>ACCESS LEVEL : ROOT_GRANTED</div>
    `;

  }catch(error){
    loading.style.display = "none";
    result.style.display = "block";
    result.innerHTML = `<div style="color:#ff4d4d;">SYSTEM ERROR : ${error.message}</div>`;
    console.error("API ERROR:", error);
  }
}

/* =========================================
   END FILE
   ========================================= */
