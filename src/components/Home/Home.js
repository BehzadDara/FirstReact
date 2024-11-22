import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from "../TaskEmptyModal";
import TodoList from "../TodoList/TodoList";
import useTaskService from "../../TaskService";
import "./Home.css";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const { 
    tasks, 
    totalCount, 
    addTask, 
    deleteTask, 
    toggleTask, 
    isLoading, 
  } = useTaskService(currentPage, 10, undefined);

  const totalPages = Math.ceil(totalCount / 10);

  const priorityMapping = {
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

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const handleToggleTask = (taskId) => {
    toggleTask(taskId);
  };

  const handleGetTaskById = (id) => {
    navigate(`/task/${id}`);
  };

  const closeModal = () => setModalOpen(false);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="home-container">
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
      </div>

      {modalOpen && <Modal closeModal={closeModal} />}

      {isLoading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <TodoList
            tasks={tasks}
            handleDeleteTask={handleDeleteTask}
            handleToggleTask={handleToggleTask}
            handleGetTaskById={handleGetTaskById}
          />

          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
