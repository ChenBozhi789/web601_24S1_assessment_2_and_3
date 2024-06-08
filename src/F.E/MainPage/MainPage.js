document.getElementById('createNote').addEventListener('click', function() {
    document.getElementById('contentFrame').src = 'Add.html';
});

document.getElementById('editNote').addEventListener('click', function() {
    document.getElementById('contentFrame').src = 'Edit.html';
});

document.getElementById('deleteNote').addEventListener('click', function() {
    document.getElementById('contentFrame').src = 'Delete.html';
});
