import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TodoItem.css';

interface TodoItemProps {
  task: {
    id: number;
    title: string;
    isDone: boolean;
    priority: number;
  };
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, deleteTask, toggleTask }) => {
  const priorityMapping: { [key: number]: string } = {
    0: 'high',
    1: 'medium',
    2: 'low',
  };

  const navigate = useNavigate();

  const getTaskById = (id: number) => {
    navigate(`/task/${id}`);
  };

  return (
    <div className={`todo-item ${task.isDone ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => toggleTask(task.id)}
        className="task-checkbox"
      />
      <span className={`priority-bullet ${priorityMapping[task.priority] || 'low'}`}></span>
      <span
        className={`task-text ${task.isDone ? 'line-through' : ''}`}
        onClick={() => getTaskById(task.id)}
      >
        {task.title}
      </span>
      <button onClick={() => deleteTask(task.id)} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
