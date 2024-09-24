import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  // Fetch todos from DummyJSON API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();
        setTodos(data.todos); // Ensure correct key 'todos'
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  // Add new todo
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      setTodos([...todos, { id: todos.length + 1, todo: text, completed: false }]);
      setText('');
    }
  };

  // Mark todo as completed
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="container mt-5">
      <h1 className="text-primary">To-Do List</h1>
      <form onSubmit={handleSubmit} className="form-inline mb-3">
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      <div className="mb-3">
        <label>Filter:</label>
        <select onChange={(e) => setFilter(e.target.value)} className="ml-2">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <ul className="list-group">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-success' : ''}`}>
            <span onClick={() => toggleComplete(todo.id)} style={{ cursor: 'pointer' }}>
              {todo.todo} {todo.completed ? '✓' : ''}
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
