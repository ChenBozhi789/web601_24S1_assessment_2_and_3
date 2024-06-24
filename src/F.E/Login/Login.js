document.getElementById('login-form').addEventListener('submit', async function(event) {
  // Prevent default submit event
  event.preventDefault();
  
  // Get element with id
  const inputUsername = document.getElementById('inputUsername').value.trim();
  const inputPassword = document.getElementById('inputPassword').value.trim();

  // Receive JWT
  if (inputUsername && inputPassword) {
    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: inputUsername, password: inputPassword })
        });

        const data = await response.json();
        if (response.ok) {
            // Store the JWT in localStorage
            localStorage.setItem('token', data.token);
            alert('Login successful, now You will jump to add note page');
            // Jump to Add note page
            window.location.href = 'http://127.0.0.1:5500/src/F.E/Add/Add.html';

        } else {
            alert('Error: ' + data.message);
        }
      } catch (err) {
          alert('Error: ' + err.message);
        }
  } else {
    alert('Please fill in both username and password.');
  }

  // Remove all in-invalid classes
  inputUsername.classList.remove('is-invalid');
  inputPassword.classList.remove('is-invalid');

  // Initial variable valid 'true'
  let valid = true;

  // Check whether the length of the user input data meets the specification
  if (inputUsername.value.trim() === '' || inputUsername.value.length < 8 || inputUsername.value.length > 20) {
    inputUsername.classList.add('is-invalid');
    valid = false;
  }

  if (inputPassword.value.trim() === '' || inputPassword.value.length < 8 || inputPassword.value.length > 20) {
    inputPassword.classList.add('is-invalid');
      valid = false;
  }

  if (valid) {    
    var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
  } else {
    var myCautionModal = new bootstrap.Modal(document.getElementById('cautionModal'));
    myCautionModal.show();
  }
});

// Listen for successModal window closing events
  document.getElementById('loginModal').addEventListener('hidden.bs.modal', function() {
    // Refresh Page
    location.reload();
  });


// Listen for errorModal window closing events
document.getElementById('cautionModal').addEventListener('hidden.bs.modal', function() {
  // Refresh Page
  location.reload();
});