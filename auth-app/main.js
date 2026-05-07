window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('user');
    if (user) {
        showProfile();
    } else {
        showLoginForm();
    }
});

function showLoginForm() {
    document.querySelector('main').innerHTML = `
        <form id="login-form">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password">
            <button type="submit">Login</button>
        </form>
        <p class="form-toggle">Don't have an account? <a id="show-register">Register</a></p>
    `;
    document.getElementById("login-form").addEventListener("submit", login);
    document.getElementById("show-register").addEventListener("click", showRegisterForm);
}

function showRegisterForm() {
    document.querySelector('main').innerHTML = `
        <form id="register-form">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Choose a username">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Create a password">
            <button type="submit">Register</button>
        </form>
        <p class="form-toggle">Already have an account? <a id="show-login">Login</a></p>
    `;
    document.getElementById("register-form").addEventListener("submit", register);
    document.getElementById("show-login").addEventListener("click", showLoginForm);
}

function showProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    document.querySelector('main').innerHTML = `
        <div class="profile">
            <img src="https://res.cloudinary.com/dt5inuazc/image/upload/v1777105255/avatar2_n9yqxu.png" alt="avatar">
            <h2>${user.username}</h2>
            <p><span>${user.email}</span></p>
            <button id="logout-btn">Logout</button>
        </div>
    `;
    document.getElementById("logout-btn").addEventListener("click", logout);
}

async function login(e) {
    e.preventDefault();
    const username = document.querySelector("#login-form #username").value;
    const password = document.querySelector("#login-form #password").value;


    const url = 'https://api.freeapi.app/api/v1/users/login';
    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
            username,
            password
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        const accessToken = data.data.accessToken;
        const refreshToken = data.data.refreshToken;
        const user = data.data.user;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        alert('Login successful');

        // show the profile
        showProfile();
        
    } catch (error) {
        console.error(error);
    }
}

async function register(e) {
    e.preventDefault();
    const username = document.querySelector("#register-form #username").value;
    const email = document.querySelector("#register-form #email").value;
    const password = document.querySelector("#register-form #password").value;

    if (username === '' || email === '' || password === '') {
        alert('Please fill all the fields');
        return;
    }

    const url = 'https://api.freeapi.app/api/v1/users/register';
    const options = {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: JSON.stringify({
            username,
            email,
            password,
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.success) {
            showLoginForm();
            document.querySelector("#login-form #username").value = username;
        }
    } catch (error) {
        console.error(error);
    }
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    showLoginForm();
}