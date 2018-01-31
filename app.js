let model = {
  todoList: [
    { id: 0, todoText: 'test todo 1', completed: false },
    { id: 1, todoText: 'test todo 2', completed: false },
    { id: 2, todoText: 'test todo 3', completed: false },
  ]
}

let view = {
  displayTodos: function() {
    let elements = [];
    let todoListDOM = document.getElementById('todo-list');
    //iterate through todos and create array of HTML elements
    model.todoList.forEach(function(todo) {
      let element = document.createElement('li');
      element.innerHTML = todo.todoText;
      element.id = todo.id;
      element.className = todo.completed === true ? 'completed' : '';
      elements.push(element);
    });

    //iterate through HTML elements and inject into the DOM
    elements.forEach(function(el) {
      todoListDOM.appendChild(el);
    });
  },

}

let controller = {
  addTodo: function (todoText, completed) {
    //set ID to one higher than last todoList index
    let newID = model.todoList.length;
    let newTodo = {
      id: newID,
      todoText: todoText,
      //if completed param not present, coerce to false
      completed: !!completed
    }
    model.todoList.push(newTodo);
  }

}