import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTodos(res.data);
  };

  const addTodo = async () => {
    await axios.post('http://localhost:5000/todos', { text }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setText('');
    fetchTodos();
  };

  const updateTodo = async () => {
    await axios.put(`http://localhost:5000/todos/${editing.id}`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setText('');
    setEditing(null);
    fetchTodos();
  };

  const deleteTodo = async id => {
    await axios.delete(`http://localhost:5000/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTodos();
  };

  const startEdit = todo => {
    setText(todo.text);
    setEditing(todo);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input id={editing ? 'edit-todo' : 'new-todo'} value={text} onChange={e => setText(e.target.value)} />
      <button id={editing ? 'save-todo' : 'add-todo'} onClick={editing ? updateTodo : addTodo}>
        {editing ? 'Save' : 'Add'}
      </button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button className="edit-btn" onClick={() => startEdit(todo)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
