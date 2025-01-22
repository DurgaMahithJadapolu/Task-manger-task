import React, { useState } from 'react';
import './popup.css'
const TaskForm = ({ addTask }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && description) {
      await addTask({ name, description, status: 'Started' });
      setName('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label>Task Title</label>
      <input
      style={{
        width:"90%"
      }}
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
       <label>Description</label>
      <textarea

style={{
  width:"90%"
}}
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
