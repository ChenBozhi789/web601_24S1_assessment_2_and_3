document.getElementById('add-form').addEventListener('submit', async function(event) {
    const token = localStorage.getItem('token');
    // Preventing the default submit event
    event.preventDefault();

    // Get the input element with ID note-title and filter space
    const title = document.getElementById('note-title').value.trim();
    // Get the input element with ID note-content and filter space
    const content = document.getElementById('note-content').value.trim();
    
    // Initial variable valid 'true'
    let valid = true;

    // Remove all in-invalid classes
    document.getElementById('note-title').classList.remove('is-invalid');
    document.getElementById('note-content').classList.remove('is-invalid');

    // Check if the title value is empty or the length is between 3 and 50 characters
    if (title.length < 3 || title.length > 50) {
        document.getElementById('note-title').classList.add('is-invalid');
        valid = false;
    }

    // Check if the content value is empty or the length is between 3 and 50 characters
    if (content.length < 10 || content.length > 500) {
        document.getElementById('note-content').classList.add('is-invalid');
        valid = false;
    }

    if (valid) {
        try {
            // Use fetch method send data to API
            const response = await fetch ('http://localhost:3000/notes', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                // Convert data to a JSON string
                body: JSON.stringify({ title, content })
            });

            if (response.ok) {
                // Add note successfully and display a form
                var myModal = new bootstrap.Modal(document.getElementById('addModal'));
                myModal.show();
                // Clean page
                document.getElementById('add-form').reset();
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

// Listen for modal window closing events
document.getElementById('addModal').addEventListener('hidden.bs.modal', function() {
    // Refresh Page
    location.reload();
});