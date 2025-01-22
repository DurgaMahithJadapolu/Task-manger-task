import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, updateTaskStatus, deleteTask }) => {
  const [, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item, monitor) => {
      if (monitor.didDrop()) return;
      updateTaskStatus(item.id, title);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className="task-column">
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            updateTaskStatus={updateTaskStatus}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
