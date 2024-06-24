document.getElementById('logoutButton').addEventListener('click', function() {
    // Remove JWT
    localStorage.removeItem('token');

    // Redirect to the login page
    window.location.href = 'login.html'; // 确保路径正确指向你的登录页面
});