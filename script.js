@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

:root {
--cyan:#00f2ff;
--magenta:#ff00ea;
--green:#00ff41;
--bg:#050505;
}

body{
background:var(--bg);
color:var(--cyan);
font-family:'Share Tech Mono',monospace;
margin:0;
overflow:hidden;
height:100vh;
}

canvas{
position:fixed;
inset:0;
z-index:-1;
opacity:0.1;
}

.scanlines{
position:fixed;
inset:0;
pointer-events:none;
z-index:100;
background:linear-gradient(rgba(18,16,16,0)50%,rgba(0,0,0,0.2)50%);
background-size:100% 4px;
}

.header-box{
text-align:center;
border:2px solid var(--cyan);
margin:20px auto;
width:90%;
max-width:500px;
padding:10px;
box-shadow:0 0 15px var(--cyan);
}

.main-title{
font-size:2.5rem;
margin:0;
color:var(--cyan);
text-shadow:0 0 10px var(--cyan);
}

.warning-text{
font-size:0.7rem;
letter-spacing:1px;
margin-top:10px;
opacity:0.8;
}

.terminal-frame{
border:2px solid var(--cyan);
width:90%;
max-width:500px;
margin:0 auto;
padding:20px;
background:rgba(0,0,0,0.8);
box-shadow:inset 0 0 20px rgba(0,242,255,0.2);
}

.frame-header{
margin-bottom:20px;
font-weight:bold;
font-size:1.2rem;
}

.input-section{
display:flex;
border:1px solid var(--cyan);
padding:10px;
margin-bottom:10px;
}

input{
flex:1;
background:transparent;
border:none;
color:var(--magenta);
font-family:inherit;
font-size:1rem;
outline:none;
padding-left:10px;
}

button{
background:var(--cyan);
color:#000;
border:none;
font-weight:bold;
cursor:pointer;
padding:0 15px;
}

.data-result{
margin-top:20px;
color:var(--green);
}

.status-bar{
background:var(--green);
color:#000;
text-align:center;
font-weight:bold;
padding:3px;
margin:10px 0;
}

.info-content{
padding:10px;
border:1px dashed var(--green);
}

.footer-status{
position:fixed;
bottom:20px;
width:100%;
text-align:center;
font-size:0.7rem;
}

.bottom-credit{
color:var(--magenta);
margin-top:5px;
}

.hidden{
display:none !important;
}

#intro-overlay{
position:fixed;
inset:0;
background:black;
z-index:999;
display:flex;
justify-content:center;
align-items:center;
}

.boot-bar{
width:250px;
height:10px;
border:1px solid var(--cyan);
margin-top:10px;
}

.boot-fill{
width:0%;
height:100%;
background:var(--cyan);
box-shadow:0 0 10px var(--cyan);
}

/* PASSWORD SCREEN */

#loginScreen{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:black;
display:flex;
justify-content:center;
align-items:center;
z-index:10000;
}

.login-box{
text-align:center;
border:2px solid #00f2ff;
padding:30px;
box-shadow:0 0 20px #00f2ff;
}

.login-box input{
background:black;
border:1px solid #00f2ff;
color:#00f2ff;
padding:10px;
margin:10px;
}

.login-box button{
padding:10px 20px;
background:#00f2ff;
border:none;
cursor:pointer;
}

#loginError{
color:red;
}
