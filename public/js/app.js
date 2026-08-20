// public/js/app.js - client-side helpers for register/login/payment

async function register() {
  const email = document.getElementById('email')?.value;
  const password = document.getElementById('password')?.value;
  if (!email || !password) return alert('Email and password required');

  const res = await fetch('/register', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) return alert(data.error || 'Register failed');
  alert('Registered! Please login.');
}

async function login() {
  const email = document.getElementById('email')?.value;
  const password = document.getElementById('password')?.value;
  if (!email || !password) return alert('Email and password required');

  const res = await fetch('/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) return alert(data.error || 'Login failed');

  localStorage.setItem('token', data.token);
  alert('Logged in!');
}

async function payNow(amount) {
  const phone = prompt('Enter phone (2547XXXXXXXX)');
  if (!phone) return;

  const res = await fetch('/pay', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ phone, amount })
  });

  const data = await res.json();
  if (!res.ok) return alert(data.error || 'Payment failed');

  alert(data.message || 'Check your phone to complete payment');
}

// Theme toggle helper used by the pages
function toggleMode() {
  document.body.classList.toggle('light-mode');
  if (document.body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
}

function loadSavedTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  }
}

window.addEventListener('DOMContentLoaded', loadSavedTheme);
