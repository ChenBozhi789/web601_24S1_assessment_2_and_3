document.getElementById('login-form').addEventListener('submit', function(event) {
    // 防止表单默认提交行为
    event.preventDefault();

    // 获取表单元素
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPassword');

    // 移除 is-invalid 类，确保每次验证时都是从头开始
    inputEmail.classList.remove('is-invalid');
    inputPassword.classList.remove('is-invalid');

    // 验证标志
    let valid = true;

    // 验证输入
    if (inputEmail.value.trim() === '' || inputEmail.value.length < 8 || inputEmail.value.length > 20) {
        inputEmail.classList.add('is-invalid');
        valid = false;
    }

    if (inputPassword.value.trim() === '' || inputPassword.value.length < 8 || inputPassword.value.length > 20) {
        inputPassword.classList.add('is-invalid');
        valid = false;
    }

    // 根据验证结果显示相应的模态窗口
    if (valid) {
        var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    } else {
        var errorModal = new bootstrap.Modal(document.getElementById('errorModal2'));
        errorModal.show();
    }
});

// 监听 loginModal 关闭事件
document.getElementById('loginModal').addEventListener('hidden.bs.modal', function() {
    // 刷新页面
    location.reload();
});

// 监听 errorModal2 关闭事件
document.getElementById('errorModal2').addEventListener('hidden.bs.modal', function() {
    // 刷新页面
    location.reload();
});
