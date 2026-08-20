// Client-side interactions (browser)
// Register/login functions use relative endpoints on the same origin

async function registerUser(email, password){
  const res = await fetch('/api/register',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({email,password})
  });
  return res.json();
}

async function loginUser(email, password){
  const res = await fetch('/api/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({email,password})
  });
  return res.json();
}

function initNav(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  if(!btn || !nav) return;
  btn.addEventListener('click',()=>{
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'block';
  });
}

window.addEventListener('DOMContentLoaded',()=>{
  initNav();
});
