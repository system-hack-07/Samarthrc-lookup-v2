let attempts = 0;
const maxSearchesPerDay = 5;

// DISCLAIMER
function acceptDisclaimer(){
  document.getElementById("disclaimerScreen").style.display="none";
  document.getElementById("loginScreen").style.display="flex";
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
      "ACCESS DENIED " + attempts + "/3";
  }
}

// BOOT
function startBoot(){
  document.getElementById("bootScreen").style.display="flex";

  setTimeout(()=>{
    document.getElementById("bootScreen").style.display="none";
    document.getElementById("app").style.display="flex";
  },3000);
}

// API CALL
async function fetchRC(){
  const rc = document.getElementById("rcInput").value;

  const result = document.getElementById("result");
  result.innerText = "Scanning...";

  try{
    const res = await fetch(`/api/rc?rc=${rc}`);
    const data = await res.json();

    let output = `RC: ${data.rc}\n`;

    for(const key in data.details){
      output += `${key}: ${data.details[key]}\n`;
    }

    result.innerText = output;

  }catch{
    result.innerText = "Error fetching data";
  }
}
