import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TaskCard.css';

const TaskCard = ({ task, toggleTask, deleteTask }) => {
  const navigate = useNavigate();
  const priorityMapping = {
    0: 'high',
    1: 'medium',
    2: 'low',
  };

  const handleToggleTask = async () => {
    task.isDone = !task.isDone;
    await toggleTask(task.id);
  };

  const handleDeleteTask = async () => {
    await deleteTask(task.id);
    navigate('/');
  };

  return (
    <div className="task-card">
      <div className="card-header">
        <span className={`priority-bullet ${priorityMapping[task.priority]}`} />
        <span className="task-title">{task.title}</span>
        <button onClick={handleDeleteTask} className="delete-detail-button">
          🗑️
        </button>
      </div>
      <div className="card-body">
        <div className="status-container">
          <span className={`status ${task.isDone ? 'done' : 'not-done'}`}>
            {task.isDone ? 'Task Completed' : 'Task Not Completed'}
          </span>
          <span className="change-container" onClick={handleToggleTask}>
            Click to {task.isDone ? 'Not Done' : 'Done'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;