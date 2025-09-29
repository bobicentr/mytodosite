document.addEventListener('DOMContentLoaded', () => {
    const taskinput = document.getElementById('task-input');
    const addtaskbtn = document.getElementById('add-task');
    const tasklist = document.getElementById('task-list');
    const todoscontainer = document.getElementById('task-container')

    const toggleemptyspace = () => {
        todoscontainer.style.width = tasklist.children.length > 0 ? '100%' : '50%';
    }

    const savetolocalstorage = () => {
        const tasks = Array.from(tasklist.querySelectorAll('li').map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        })));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const loadlocalstorage = () => {
        const savedtasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedtasks.forEach(({text, completed}) => addtask(text, completed, false));
        toggleemptyspace();
        };

    const addtask = (event) => {
        event.preventDefault();
        const tasktext = taskinput.value.trim();
        if (!tasktext) {
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span>${tasktext}</span>
        <div class="task-buttons">
            <button class="edit-btn"><i class="fa-solid fa-pen></i>"</button>
            <button class="delete-btn"><i class="fa-solid fa-trash></i></button>
        </div>
        `
        const checkbox = li.querySelector('.checkbox');
        const editbtn = li.querySelector('.edit-btn');

        editbtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskinput.value = li.querySelector('span').textContent;
                li.remove();
                toggleemptyspace();
                savetolocalstorage();
            }
        })

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleemptyspace();
            savetolocalstorage();
        })

        tasklist.appendChild(li);
        taskinput.value = '';
        toggleemptyspace();
        savetolocalstorage();
    }
    addtaskbtn.addEventListener('click', addtask);
    taskinput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            addtask(e)
        }

    })
    loadlocalstorage();
})