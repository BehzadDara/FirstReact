import React from 'react';
import TodoItem from '../TodoItem/TodoItem.tsx';
import './TodoList.css';

interface Task {
  id: number;
  title: string;
  isDone: boolean;
  priority: number;
}

interface TodoListProps {
  tasks: Task[];
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, deleteTask, toggleTask }) => {
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
