import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ tasks, deleteTask, toggleTask }) => {
  return (
    <div className="todo-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        ))
      ) : (
        <p>No tasks added yet</p>
      )}
    </div>
  );
};

export default TodoList;
