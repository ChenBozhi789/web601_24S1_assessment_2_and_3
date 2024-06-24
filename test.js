document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // 防止表单的默认提交行为

    const inputEmail = document.getElementById('inputEmail').value.trim();
    const inputPassword = document.getElementById('inputPassword').value.trim();

    if (inputEmail && inputPassword) {
        try {
            // 向服务器发送POST请求进行用户登录
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: inputEmail, password: inputPassword }) // 将输入的电子邮件和密码发送到服务器
            });

            const data = await response.json(); // 获取服务器响应的数据

            if (response.ok) {
                // 保存JWT到localStorage
                localStorage.setItem('token', data.token); // 将JWT存储到localStorage
                alert('Login successful');
                // 可以在这里添加页面重定向或其他操作，例如跳转到受保护的页面
            } else {
                alert('Error: ' + data.message);
            }
        } catch (err) {
            alert('Error: ' + err.message);
        }
    } else {
        alert('Please fill in both email and password.');
    }
});
