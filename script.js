console.log("🚀 Samarth Hacker System Loaded");

async function fetchRC() {
  const rcInput = document.getElementById("rcInput").value.trim().toUpperCase();
  const loadingDiv = document.getElementById("loading");
  const resultDiv = document.getElementById("result");

  if (!rcInput) {
    alert("⚠️ Please enter an RC Number");
    return;
  }

  loadingDiv.style.display = "block";
  resultDiv.style.display = "none";
  resultDiv.innerHTML = "";

  try {
    // ✅ Use Vercel proxy (no CORS)
    const API_URL = `/api/rc?rc=${encodeURIComponent(rcInput)}`;
    const response = await fetch(API_URL);

    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();

    if (!data || !data.details) throw new Error("No vehicle data found");

    const d = data.details;

    loadingDiv.style.display = "none";
    resultDiv.style.display = "block";

    resultDiv.innerHTML = `
      <h3>🚗 Vehicle Data Extracted</h3>
      <hr>
      <p><b>RC Number:</b> ${data.rc}</p>
      <p><b>Owner:</b> ${d["Owner Name"]}</p>
      <p><b>Model:</b> ${d["Maker Model"]}</p>
      <p><b>Fuel Type:</b> ${d["Fuel Type"]}</p>
      <p><b>Vehicle Class:</b> ${d["Vehicle Class"]}</p>
      <p><b>RTO:</b> ${d["Registered RTO"]}</p>
      <p><b>City:</b> ${d["City Name"]}</p>
      <p><b>Registration Date:</b> ${d["Registration Date"]}</p>
      <p><b>Tax Upto:</b> ${d["Tax Upto"]}</p>
      <p><b>Fitness Upto:</b> ${d["Fitness Upto"]}</p>
      <p><b>PUC Upto:</b> ${d["PUC Upto"]}</p>
      <p><b>Insurance Company:</b> ${d["Insurance Company"]}</p>
      <p><b>Insurance Expiry:</b> ${d["Insurance Expiry"]}</p>
      <p><b>Contact:</b> ${d["Phone"]}</p>
      <p><b>Address:</b> ${d["Address"]}</p>
      <hr>
      <p>✅ ACCESS LEVEL: ROOT_GRANTED</p>
    `;
  } catch (error) {
    loadingDiv.style.display = "none";
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `<p style="color:#ff4d4d;">SYSTEM ERROR: ${error.message}</p>`;
    console.error("API ERROR:", error);
  }
                             }
