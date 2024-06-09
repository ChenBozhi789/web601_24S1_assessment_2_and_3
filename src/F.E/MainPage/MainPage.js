document.addEventListener('DOMContentLoaded', async function () {
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

    // Get table 
    const maintable = document.querySelector('.table tbody');

    // Get all note
    async function getNotes() {
        try {
            const response = await fetch('http://localhost:3000/notes');
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            // Analysis json data
            const notes = await response.json();
            populateTable(notes);
        } catch (error) {
            console.log('Error:', error);
        }
    }

    // Filling the table
    function populateTable(notes) {
        // Clean table content
        maintable.innerHTML = '';

        notes.forEach(note => {
            // Create a new tr(table header)
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${note._id}</th>
                <td>${note.title}</td>
                <td>${new Date(note.createdAt).toLocaleString()}</td>
                <td><input type="radio" name="note-select" value="${note._id}"></td>
            `;

            // Put row's content to table cell
            maintable.appendChild(row);
        });
    }

    // Open create note page
    function createNote() {
        // Open a new page for creating note
        window.open('http://127.0.0.1:5500/src/F.E/Add/Add.html', '_blank');
    }

    // Edit note
    function editNote() {
        // Find the radio button that the user selected
        const selectedNote = document.querySelector('input[name="note-select"]:checked');

        if (selectedNote) {
            // Printing the value of noteID
            const noteId = selectedNote.value;

            // Printing the value of noteID
            console.log(`Editing note with ID: ${noteId}`);
            
            window.open(`http://127.0.0.1:5500/src/F.E/Edit/Edit.html?id=${noteId}`, '_blank');
        } else {
            alert('Please select a note to edit.');
        }
    }

    // Delete note
    function deleteNote() {
        // Find the radio button that the user selected
        const selectedNote = document.querySelector('input[name="note-select"]:checked');

        if (selectedNote) {
            // Store the value of selectedNote in a variable noteId
            const noteId = selectedNote.value;

            // Printing the value of noteID
            console.log(`Deleting note with ID: ${noteId}`);

            // Display delete confirmation modal
            deleteModal.show();

            // Avoid triggering events multiple times
            const confirmButton = document.querySelector('#deleteModal .btn-primary');
            confirmButton.removeEventListener('click', confirmDelete);
            confirmButton.addEventListener('click', confirmDelete);

            async function confirmDelete() {
                try {
                    const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete note');
                    }

                    alert('Note deleted successfully.');
                    // Re-acquire and refresh the table
                    await getNotes(); 
                } catch (error) {
                    console.log('Error:', error);
                    console.log(noteId);
                    alert('Failed to delete note. Please try again.');
                } finally {
                    deleteModal.hide();
                    confirmButton.removeEventListener('click', confirmDelete);
                }
            }
        } else {
            alert('Please select a note to delete.');
        }
    }

    // Get notes on page load
    await getNotes();

    // Binding button events
    document.getElementById('createButton').addEventListener('click', createNote);
    document.getElementById('editButton').addEventListener('click', editNote);
    document.getElementById('deleteButton').addEventListener('click', deleteNote);
});
