document.addEventListener('DOMContentLoaded', function() {
    const authModal = document.getElementById('auth-modal');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const closeModal = document.querySelector('.close');
    const authForm = document.getElementById('auth-form');
    const toggleAuth = document.getElementById('toggle-auth');
    const authTitle = document.getElementById('auth-title');
    const userGreeting = document.getElementById('user-greeting');

    let isSignup = false;

    // Show login/signup modal
    loginBtn.addEventListener('click', () => {
        authModal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        authModal.style.display = 'none';
    });

    // Toggle between login and signup
    toggleAuth.addEventListener('click', (e) => {
        e.preventDefault();
        isSignup = !isSignup;
        authTitle.innerText = isSignup ? 'Sign Up' : 'Login';
        toggleAuth.innerHTML = isSignup ? 'Already have an account? <a href="#">Login</a>' : 'Don\'t have an account? <a href="#">Sign Up</a>';
    });

    // Handle login/signup
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (isSignup) {
            // Store user credentials
            localStorage.setItem(username, password);
            alert('Account created! Please log in.');
        } else {
            // Authenticate user
            const storedPassword = localStorage.getItem(username);
            if (storedPassword === password) {
                localStorage.setItem('loggedInUser', username);
                updateUI();
            } else {
                alert('Invalid username or password!');
            }
        }
        authModal.style.display = 'none';
    });

    // Logout function
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        updateUI();
    });

    // Update UI based on login state
    function updateUI() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            userGreeting.innerText = `Welcome, ${loggedInUser}`;
            loginBtn.style.display = 'none';
            logoutBtn.style.display = 'inline-block';
        } else {
            userGreeting.innerText = '';
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';
        }
    }

    updateUI();
});
