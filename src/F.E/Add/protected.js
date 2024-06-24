document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    if (!token) {
        // If no token, redirect to Login Page
        window.location.href = 'http://127.0.0.1:5500/src/F.E/Login/Login.html';
    } else {
        // Send a request to the server to verify the validity of the token
        validateToken(token).then(isValid => {
            if (!isValid) {
                // If the token is invalid, redirect to the login page
                window.location.href = 'http://127.0.0.1:5500/src/F.E/Login/Login.html';
            }
        }).catch(() => {
            // If the request fails, redirect to the login page
            window.location.href = 'http://127.0.0.1:5500/src/F.E/Login/Login.html';
        });
    }
});

// If click 'Logout' button, redirect to login page
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = 'http://127.0.0.1:5500/src/F.E/Login/Login.html';
});