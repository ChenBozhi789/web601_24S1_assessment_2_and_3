document.getElementById('login-form').addEventListener('submit', function(event) {
  // Prevent default submit event
  event.preventDefault();
  
  // Get element with id
  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');

  // Remove all in-invalid classes
  inputPassword.classList.remove('is-invalid');
  inputPassword.classList.remove('is-invalid');

  // Initial variable valid 'true'
  let valid = true;

  // Check whether the length of the user input data meets the specification
  if (inputEmail.value.trim() === '' || inputEmail.value.length < 8 || inputEmail.value.length > 20) {
    inputEmail.classList.add('is-invalid');
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