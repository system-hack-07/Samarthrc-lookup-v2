async function fetchRC() {  
  let today = new Date().toDateString();  
  let searches = JSON.parse(localStorage.getItem("searches")) || {};  
  if (searches.date !== today) { searches = { date: today, count: 0 }; }  
  if (searches.count >= maxSearchesPerDay) {  
    alert("❌ You have reached the maximum of 4 searches today.");  
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

      let riskLevel = "LOW", riskClass = "low";  
      if (d["Vehicle Class"]?.includes("Transport")) { riskLevel = "MEDIUM"; riskClass = "medium"; }  
      if (d["Fuel Type"] === "Diesel") { riskLevel = "HIGH"; riskClass = "high"; }  
      risk.innerHTML = `<h4 class="${riskClass}">⚠ RISK LEVEL : ${riskLevel}</h4>`;  

      // ✅ Phone Number safe + Full API Details  
      result.innerText =  
`RC : ${data.rc}  
Owner : ${d["Owner Name"] || "N/A"}  
Phone : ${d["Phone"] || d["Phone Number"] || "N/A"}  
Address : ${d["Address"] || "N/A"}  
Model : ${d["Maker Model"] || "N/A"}  
Fuel : ${d["Fuel Type"] || "N/A"}  
Vehicle Class : ${d["Vehicle Class"] || "N/A"}  
RTO : ${d["Registered RTO"] || "N/A"}  
City : ${d["City Name"] || "N/A"}  
Registration : ${d["Registration Date"] || "N/A"}  
Tax Upto : ${d["Tax Upto"] || "N/A"}  
Fitness Upto : ${d["Fitness Upto"] || "N/A"}  
PUC Upto : ${d["PUC Upto"] || "N/A"}  
Insurance Company : ${d["Insurance Company"] || "N/A"}  
Insurance Upto : ${d["Insurance Upto"] || "N/A"}`;  
    } catch {  
      radar.style.display = "none";  
      result.innerText = "Vehicle Data Error";  
    }  
  }, 2500);  
             }
