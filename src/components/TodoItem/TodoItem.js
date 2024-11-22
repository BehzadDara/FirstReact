import { useNavigate } from 'react-router-dom';
import './TodoItem.css';

const TodoItem = ({ task, deleteTask, toggleTask }) => {
  const priorityMapping = {
    0: 'high',
    1: 'medium',
    2: 'low',
  };  
  
  const navigate = useNavigate();

  const getTaskById = (id) => {
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
      <span className={`priority-bullet ${priorityMapping[task.priority]}`}></span>
      <span className={`task-text ${task.isDone ? 'line-through' : ''}`} onClick={() => getTaskById(task.id)}>
        {task.title}
      </span>
      <button onClick={() => deleteTask(task.id)} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
