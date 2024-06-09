function deleteNote() {
    const selectedNote = document.querySelector('input[name="note-select"]:checked');
    if (selectedNote) {
        const noteId = selectedNote.value;
        console.log(`Deleting note with ID: ${noteId}`);
        deleteModal.show();

        const confirmButton = document.querySelector('#deleteModal .btn-primary');

        // 移除已有的事件监听器，避免重复绑定
        confirmButton.removeEventListener('click', confirmDelete);

        // 绑定新的确认删除事件监听器
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
                await getNotes(); // 重新获取并刷新表格
            } catch (error) {
                console.log('Error:', error);
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