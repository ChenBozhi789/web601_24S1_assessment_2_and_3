document.addEventListener('DOMContentLoaded', function () {
    // 获取表格主体
    const tableBody = document.querySelector('.table tbody');
    
    // 从后端获取数据
    async function fetchNotes() {
        try {
            const response = await fetch('http://localhost:3000/notes');
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            const notes = await response.json();
            populateTable(notes);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // 动态生成表格行
    function populateTable(notes) {
        notes.forEach(note => {
            const row = document.createElement('tr');
            
            // 创建表格列
            const idCell = document.createElement('th');
            idCell.scope = 'row';
            idCell.textContent = note._id;

            const titleCell = document.createElement('td');
            titleCell.textContent = note.title;

            const dateCell = document.createElement('td');
            dateCell.textContent = new Date(note.updatedAt).toLocaleDateString(); // 显示最后更新时间

            const selectCell = document.createElement('td');
            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'note-select';
            radioInput.value = note._id; // 使用笔记的唯一ID作为值
            selectCell.appendChild(radioInput);

            // 添加列到行
            row.appendChild(idCell);
            row.appendChild(titleCell);
            row.appendChild(dateCell);
            row.appendChild(selectCell);

            // 添加行到表格主体
            tableBody.appendChild(row);
        });
    }

    // 调用函数获取数据并生成表格
    fetchNotes();
});
