// alternative: window.onload
document.addEventListener('DOMContentLoaded', function () {
	const todoForm = document.getElementById('todoForm');
	const todoInput = document.getElementById('todoInput');
	const todoList = document.getElementById('todoList');
	
	let todos = JSON.parse(localStorage.getItem('todo-app')) || [];
	
	function saveTodos() {
		localStorage.setItem('todo-app', JSON.stringify(todos));
	}
	
	function renderTodos(){
		todoList.innerHTML = '';
		todos.forEach((todo, index) => {						
			const li = document.createElement('li');
			li.className =
				'list-group-item d-flex justify-content-between align-items-center';
			li.textContent = todo;

			// container for buttons
			const btnGroup = document.createElement('div');

			// edit button
			const editBtn = document.createElement('button');
			editBtn.className = 'btn btn-sm btn-outline-primary me-2';
			editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>'; // bootstrap icon
			editBtn.addEventListener('click', function () {							
				const updatedTodo = prompt('Edit todo:', todo); // prompt
				if (updatedTodo !== null) {								
					if (updatedTodo.trim() !== '') {
						todos[index] = updatedTodo.trim();
						saveTodos();
						renderTodos(); // recursive
					} else {
						alert('Todo cannot be empty.');
					}
				}
			});

			// delete button
			const deleteBtn = document.createElement('button');
			deleteBtn.className = 'btn btn-sm btn-outline-danger';
			deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';  // bootstrap icon
			deleteBtn.addEventListener('click', function () {
				if (confirm('Are you sure you want to delete this todo?')){ // confirm
					todos.splice(index, 1);
					saveTodos();
					renderTodos();
				}
			});
	
			btnGroup.appendChild(editBtn);
			btnGroup.appendChild(deleteBtn);
		
			li.appendChild(btnGroup);
			todoList.appendChild(li);
		});
	}

	// Listen for form submission to add a new todo
	todoForm.addEventListener('submit', function (e){
		e.preventDefault();
		const newTodo = todoInput.value.trim();
		if (newTodo !== '') {
			todos.push(newTodo);
			saveTodos();
			renderTodos();
			todoInput.value = '';
		}
	});

	// initial render
	renderTodos();
});