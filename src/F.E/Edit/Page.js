document.addEventListener('DOMContentLoaded', function () {
    const editBtn = document.getElementById('editBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    const toast = new bootstrap.Toast(document.getElementById('liveToast'));

    editBtn.addEventListener('click', function () {
        // 获取选中的笔记ID，进行相应操作
        const selectedNote = document.querySelector('input[name="note-select"]:checked');
        if (selectedNote) {
            // 打开编辑模态窗口
            editModal.show();
        } else {
            alert('Please select a note to edit.');
        }
    });

    deleteBtn.addEventListener('click', function () {
        const selectedNote = document.querySelector('input[name="note-select"]:checked');
        if (selectedNote) {
            // 执行删除操作，成功后显示Toast通知
            toast.show();
        } else {
            alert('Please select a note to delete.');
        }
    });

    // 处理表单提交
    document.getElementById('editForm').addEventListener('submit', function (event) {
        event.preventDefault();
        // 执行保存操作，成功后关闭模态窗口并显示Toast通知
        editModal.hide();
        toast.show();
    });
});