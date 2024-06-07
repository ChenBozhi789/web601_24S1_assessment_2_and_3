document.getElementById('add-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // 这行代码获取表单元素，便于对表单进行整体处理。例如，你可以在表单提交时进行验证，阻止提交并显示错误信息。
    const form = document.querySelector('form');
    // 这行代码获取提交按钮元素，使你可以监听按钮的点击事件，以便在用户点击提交按钮时执行验证逻辑。
    const confirmButton = document.getElementById('confirmButton');
    // Get the input element with ID note-title
    const title = document.getElementById('note-title');
    // Get the input element with ID note-
    const content = document.getElementById('note-content');
    
    // Initial variable valid 'true'
    let valid = true;

    // Remove all in-invalid classes
    title.classList.remove('is-invalid');
    content.classList.remove('is-invalid');

    // Check if the title value is empty or the length is between 3 and 50 characters
    if (title.value.trim() === '' || title.value.length < 3 || title.value.length > 50) {
        title.classList.add('is-invalid');
        valid = false;
    }

    // Check if the content value is empty or the length is between 3 and 50 characters
    if (content.value.trim() === '' || content.value.length < 10 || content.value.length > 500) {
        content.classList.add('is-invalid');
        valid = false;
    }

    if (valid) {    
        var myModal = new bootstrap.Modal(document.getElementById('addModal'));
        myModal.show();
    }
});

// Listen for modal window closing events
document.getElementById('addModal').addEventListener('hidden.bs.modal', function() {
    // Refresh Page
    location.reload();
});