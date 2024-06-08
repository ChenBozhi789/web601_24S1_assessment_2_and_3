document.getElementById('add-form').addEventListener('submit', async function(event) {
    // Prevent default submit 
    event.preventDefault();

    // 这行代码获取表单元素，便于对表单进行整体处理。例如，你可以在表单提交时进行验证，阻止提交并显示错误信息。
    const form = document.querySelector('form');
    // 这行代码获取提交按钮元素，使你可以监听按钮的点击事件，以便在用户点击提交按钮时执行验证逻辑。
    const confirmButton = document.getElementById('confirmButton');

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
                body: JSON.stringify({ title, content }) // 将数据转换为 JSON 字符串
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