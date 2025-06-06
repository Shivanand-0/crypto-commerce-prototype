const magic = new Magic('YOUR_PUBLISHABLE_KEY'); // Replace with your Magic publishable key
const loginBtn = document.getElementById('magic-login-btn');
const logoutBtn = document.getElementById('magic-logout-btn');
const emailInput = document.getElementById('magic-email');
const statusSpan = document.getElementById('magic-status');

async function checkUser() {
  try {
    const isLoggedIn = await magic.user.isLoggedIn();
    if (isLoggedIn) {
        console.log("41")
      const metadata = await magic.user.getInfo();
      statusSpan.textContent = `Logged in as ${metadata.email}`;
      loginBtn.style.display = 'none';
      emailInput.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
    } else {
        console.log("42")
      statusSpan.textContent = '';
      statusSpan.style.display = 'none';
      loginBtn.style.display = 'inline-block';
      emailInput.value = '';
      emailInput.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
    }
  } catch (err) {
    console.error('Error checking login status:', err);
  }
}

async function login() {
  const email = emailInput.value.trim();
  if (!email) {
    alert('Please enter your email');
    return;
  }
  try {
    console.log("1")
    await magic.auth.loginWithMagicLink({ email });
    console.log("2")
    await checkUser();
    console.log("3")

  } catch (err) {
    alert('Login failed, please try again.');
    console.error(err);
  }
}

async function logout() {
  try {
    await magic.user.logout();
    await checkUser();
  } catch (err) {
    alert('Logout failed, please try again.');
    console.error(err);
  }
}

loginBtn.addEventListener('click', login);
logoutBtn.addEventListener('click', logout);

// Check login status on page load
checkUser();
