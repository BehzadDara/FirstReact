import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ tasks, handleDeleteTask, handleToggleTask, handleGetTaskById }) => {
  return (
    <div className="todo-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={handleDeleteTask}
            toggleTask={handleToggleTask}
            getTaskById={handleGetTaskById}
          />
        ))
      ) : (
        <p>No tasks added yet</p>
      )}
    </div>
  );
};

export default TodoList;
