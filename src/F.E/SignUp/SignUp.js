document.getElementById('signup-form').addEventListener('submit', async function(event) {
    // Preventing the default submit event
    event.preventDefault();

    // Get element with id
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const number = document.getElementById('number').value.trim();
    const password = document.getElementById('password').value.trim();
    const retypePassword = document.getElementById('retype-password').value.trim();

    // Remove all in-invalid classes
    document.getElementById('username').classList.remove('is-invalid');
    document.getElementById('email').classList.remove('is-invalid');
    document.getElementById('number').classList.remove('is-invalid');
    document.getElementById('password').classList.remove('is-invalid');
    document.getElementById('retype-password').classList.remove('is-invalid');

    // Initial variable valid 'true'
    let valid = true;

    // Check whether the length of the user input data meets the specification
    if (username.length < 8 || username.length > 20) {
        document.getElementById('username').classList.add('is-invalid');
        valid = false;
    }

    if (email.length < 10 || email.length > 50) {
        document.getElementById('email').classList.add('is-invalid');
        valid = false;
    }

    if (number.length < 8 || number.length > 20) {
        document.getElementById('number').classList.add('is-invalid');
        valid = false;
    }

    if (password.length < 8 || password.length > 20) {
        document.getElementById('password').classList.add('is-invalid');
        valid = false;
    }

    if (password !== retypePassword) {
        document.getElementById('retype-password').classList.add('is-invalid');
        valid = false;
    }  

    if (valid) {
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                // Convert data to a JSON string
                body: JSON.stringify({ username, email, number, password })
            });

            if (response.ok) {
                    // Add note successfully and display a form
                    var myModal = new bootstrap.Modal(document.getElementById('successModal'));
                    myModal.show();
                    // Clean page
                    document.getElementById('signup-form').reset();
            } else {
                // Display wrong info
                const errorData = await response.json();
                alert('Error: ' + errorData.message);
            }
        }
        catch (err) {
            alert('Something wrong:' + err.message);
        }
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