/* =========================================
   SAMARTH HACKER SYSTEM
   RC LOOKUP FRONTEND (UPDATED VERSION)
   ========================================= */

console.log("🚀 Samarth Hacker System Loaded");

// Main function to fetch RC details
async function fetchRC() {
  const rcInput = document.getElementById("rcInput").value.trim().toUpperCase();
  const loadingDiv = document.getElementById("loading");
  const resultDiv = document.getElementById("result");

  // Check if user entered an RC number
  if (!rcInput) {
    alert("⚠️ Please enter an RC Number");
    return;
  }

  // Show loading message
  loadingDiv.style.display = "block";
  resultDiv.style.display = "none";
  resultDiv.innerHTML = "";

  try {
    // Real API endpoint
    const API_URL = `https://vehicle-eight-vert.vercel.app/api?rc=${encodeURIComponent(rcInput)}`;

    // Fetch data from API
    const response = await fetch(API_URL);

    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();

    if (!data || !data.details) throw new Error("No vehicle data found");

    const vehicle = data.details;

    // Hide loading and show result
    loadingDiv.style.display = "none";
    resultDiv.style.display = "block";

    // Build HTML output
    resultDiv.innerHTML = `
      <h3>🚗 Vehicle Data Extracted</h3>
      <hr>
      <p><b>RC Number:</b> ${data.rc}</p>
      <p><b>Owner:</b> ${vehicle["Owner Name"]}</p>
      <p><b>Model:</b> ${vehicle["Maker Model"]}</p>
      <p><b>Fuel Type:</b> ${vehicle["Fuel Type"]}</p>
      <p><b>Vehicle Class:</b> ${vehicle["Vehicle Class"]}</p>
      <p><b>RTO:</b> ${vehicle["Registered RTO"]}</p>
      <p><b>City:</b> ${vehicle["City Name"]}</p>
      <p><b>Registration Date:</b> ${vehicle["Registration Date"]}</p>
      <p><b>Tax Upto:</b> ${vehicle["Tax Upto"]}</p>
      <p><b>Fitness Upto:</b> ${vehicle["Fitness Upto"]}</p>
      <p><b>PUC Upto:</b> ${vehicle["PUC Upto"]}</p>
      <p><b>Insurance Company:</b> ${vehicle["Insurance Company"]}</p>
      <p><b>Insurance Expiry:</b> ${vehicle["Insurance Expiry"]}</p>
      <p><b>Contact:</b> ${vehicle["Phone"]}</p>
      <p><b>Address:</b> ${vehicle["Address"]}</p>
      <hr>
      <p>✅ ACCESS LEVEL: ROOT_GRANTED</p>
    `;

  } catch (error) {
    // Show error if API fails
    loadingDiv.style.display = "none";
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `<p style="color:#ff4d4d;">SYSTEM ERROR: ${error.message}</p>`;
    console.error("API ERROR:", error);
  }
}

/* =========================================
   END OF UPDATED FILE
   ========================================= */
