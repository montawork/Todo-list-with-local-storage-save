// Selectors
let todoInput = document.querySelector('.todo-input');
let todoList = document.querySelector('.todo-list');
const todoBtn = document.querySelector('.todo-btn');
const filterOption = document.querySelector('.filter-todo');

// Events Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
  // Prevent Form
  event.preventDefault();
  // Todo Div
  let todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // Create li
  let newTodo = document.createElement('li');
  newTodo.textContent = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // Add Tod To Local Storage
  saveInLocalStorage(todoInput.value);
  // Check Mark Button
  const completedBtn = document.createElement('button');
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  completedBtn.classList.add('complate-btn');
  todoDiv.appendChild(completedBtn);
  // Check Trash Button
  const trushBtn = document.createElement('button');
  trushBtn.innerHTML = '<i class="fas fa-trash"></i>';
  trushBtn.classList.add('trash-btn');
  todoDiv.appendChild(trushBtn);
  // Append To List
  todoList.appendChild(todoDiv);
  // Clear Todo Input Value
  todoInput.value = '';
}

function deleteCheck(e) {
  let item = e.target;
  // Delete Todo
  if (item.classList[0] == 'trash-btn') {
    let todo = item.parentElement;
    // Animation
    todo.classList.add('fall');
    removeFromLocalStorage(todo);
    todo.addEventListener('transitionend', function () {
      this.remove();
    });
  }
  // Check Mark
  if (item.classList[0] == 'complate-btn') {
    let todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}
// Add With Enter Key
document.addEventListener('input', () => {
  if (event.keyCode == 13) {
    // Prevent Form
    event.preventDefault();
    // Todo Div
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li
    let newTodo = document.createElement('li');
    newTodo.textContent = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Check Mark Button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complate-btn');
    todoDiv.appendChild(completedBtn);
    // Check Trash Button
    const trushBtn = document.createElement('button');
    trushBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trushBtn.classList.add('trash-btn');
    todoDiv.appendChild(trushBtn);
    // Append To List
    todoList.appendChild(todoDiv);
    // Clear Todo Input Value
    todoInput.value = '';
  }
});

function saveInLocalStorage(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    // Todo Div
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li
    let newTodo = document.createElement('li');
    newTodo.textContent = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Check Mark Button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complate-btn');
    todoDiv.appendChild(completedBtn);
    // Check Trash Button
    const trushBtn = document.createElement('button');
    trushBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trushBtn.classList.add('trash-btn');
    todoDiv.appendChild(trushBtn);
    // Append To List
    todoList.appendChild(todoDiv);
  });
}

function removeFromLocalStorage(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].textContent;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
