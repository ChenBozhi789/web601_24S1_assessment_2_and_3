document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    // Get the 'id' parameter value and assign it to the noteId variable
    const noteId = urlParams.get('id');

    if (noteId) {
        document.getElementById('noteId').value = noteId;

        try {
            // Get the note corresponding to noteId
            const response = await fetch(`http://localhost:3000/notes/${noteId}`);
            if (!response.ok) {
                // If error occurred, throw error information
                throw new Error('Failed to fetch note details');
            }
            // Convert json data to object
            const note = await response.json();
            document.getElementById('note-content').value = note.content;
        } catch (error) {
            // Print error messages to the console
            console.error('Error:', error);
            // Alert error 
            alert('Failed to load note details. Please try again.');
        }
    }

    document.getElementById('edit-form').addEventListener('submit', async function (event) {
        // Prevent default submit event
        event.preventDefault();

        // Get the content entered by the user in the 'note-content' text area
        const noteContent = document.getElementById('note-content').value;

        try {
            const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: noteContent })
            });

            if (!response.ok) {
                // If error occurred, throw error information
                throw new Error('Failed to update note');
            }

            alert('Note updated successfully.');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update note. Please try again.');
        }
    });
});
