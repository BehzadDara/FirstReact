import React, { useState } from "react";
import TaskEmptyModal from "../TaskEmptyModal.tsx";
import './AddTask.css';

interface AddTaskProps {
  addTask: (task: { title: string; priority: number }) => void;
  isLoading: boolean;
}

const AddTask: React.FC<AddTaskProps> = ({ addTask, isLoading }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskPriority, setTaskPriority] = useState<string>("medium");

  const priorityMapping: { [key: string]: number } = {
    high: 0,
    medium: 1,
    low: 2,
  };

  const handleAddTask = () => {
    if (!taskTitle.trim()) {
      setModalOpen(true);
      return;
    }

    const newTask = {
      title: taskTitle,
      priority: priorityMapping[taskPriority],
    };

    addTask(newTask);

    setTaskTitle("");
    setTaskPriority("medium"); 
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="task-input-container">
      <input
        type="text"
        placeholder="Enter your task..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="task-input"
      />

      <div className="select-container">
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <button 
        className="add-task-button" 
        onClick={handleAddTask} 
        disabled={isLoading}
      >
        Add Task
      </button>
      
      {modalOpen && <TaskEmptyModal closeModal={closeModal} open={modalOpen} />}
    </div>
  );
};

export default AddTask;
