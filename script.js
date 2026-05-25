document.addEventListener('DOMContentLoaded', () => {
  const taskInput   = document.getElementById('task-input');
  const addTaskBtn  = document.getElementById('add-task-btn');
  const taskList    = document.getElementById('task-list');
  const emptyImage  = document.querySelector('.empty-image'); // ← end with ;

  /* ── empty illustration ────────────────────────────── */
  const toggleEmptyState = () => {
    emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
  };

  /* ── build one <li> row ────────────────────────────── */
  const createTaskElement = (text) => {
    const li = document.createElement('li');

    /* checkbox + text wrapper */
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'task-content';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed', checkbox.checked);
    });

    const span = document.createElement('span');
    span.textContent = text;

    contentWrapper.append(checkbox, span);

    /* delete button */
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.addEventListener('click', () => {
      li.remove();
      toggleEmptyState();
    });

    li.append(contentWrapper, deleteBtn);
    return li;
  };

  /* ── add a task ────────────────────────────────────── */
  const addTask = () => {
    const text = taskInput.value.trim();
    if (!text) return;

    taskList.appendChild(createTaskElement(text));
    taskInput.value = '';
    toggleEmptyState();
  };

  /* ── event listeners ───────────────────────────────── */
  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  toggleEmptyState();          // initial check
});                             // <- close DOMContentLoaded callback
