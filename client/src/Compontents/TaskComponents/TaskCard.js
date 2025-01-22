import React from 'react';
import { useDrag } from 'react-dnd';

const TaskCard = ({ task, updateTaskStatus, deleteTask }) => {
  const [, drag] = useDrag(() => ({ type: 'TASK', item: { id: task._id } }));

  const handleButtonClick = (e, status) => {
    e.preventDefault();
    updateTaskStatus(task._id, status);
  };

  return (
    <div ref={drag} className="task-card">
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <div className="task-actions">
        <button onClick={(e) => handleButtonClick(e, 'Completed')}>Completed</button>
        <button onClick={(e) => handleButtonClick(e, 'Pending')}>Pending</button>
        <button onClick={(e) => handleButtonClick(e, 'Started')}>Started</button>
        <button onClick={(e) => { e.preventDefault(); deleteTask(task._id); }}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
