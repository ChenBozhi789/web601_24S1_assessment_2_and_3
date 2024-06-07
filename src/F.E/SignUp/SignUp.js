document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get element with id
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const number = document.getElementById('number');
    const password = document.getElementById('password');
    const retypePassword = document.getElementById('retype-password');

    // Remove all in-invalid classes
    username.classList.remove('is-invalid');
    email.classList.remove('is-invalid');
    number.classList.remove('is-invalid');
    password.classList.remove('is-invalid');
    retypePassword.classList.remove('is-invalid');

    // Initial variable valid 'true'
    let valid = true;

    if (username.value.trim() === '' || username.value.length < 8 || username.value.length > 20) {
        username.classList.add('is-invalid');
        valid = false;
    }

    if (email.value.trim() === '' || email.value.length < 10 || email.value.length > 50) {
        email.classList.add('is-invalid');
        valid = false;
    }

    if (number.value.trim() === '' || number.value.length < 8 || number.value.length > 20) {
        number.classList.add('is-invalid');
        valid = false;
    }

    if (password.value.trim() === '' || password.value.length < 8 || password.value.length > 20) {
        password.classList.add('is-invalid');
        valid = false;
    }

    if (retypePassword.value.trim() === '' || retypePassword.value.length < 8 || retypePassword.value.length > 20) {
        retypePassword.classList.add('is-invalid');
        valid = false;
    }

    // Check if password is different to retype-password
    if (password.value !== retypePassword.value) {
        retypePassword.classList.add('is-invalid');
        valid = false;
    }

    if (valid) {    
        // 创建变量 myModal 存储新的 bootstrap 示例
        const myModal = new bootstrap.Modal(document.getElementById('successModal'));
        myModal.show();
        // alert('Registration successful!');
    } else {
        const myCautionModal = new bootstrap.Modal(document.getElementById('errorModal'));
        myCautionModal.show();
    }
    
});

// Listen for successModal window closing events
document.getElementById('successModal').addEventListener('hidden.bs.modal', function() {
    // Refresh Page
    location.reload();
});

// Listen for errorModal window closing events
document.getElementById('errorModal').addEventListener('hidden.bs.modal', function() {
    // Refresh Page
    location.reload();
});