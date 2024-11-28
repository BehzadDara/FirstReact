import React, { useState } from "react";
import AddTask from "../AddTask/AddTask.tsx";
import TodoList from "../TodoList/TodoList.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import useTaskService from "../../TaskService.tsx";
import "./Home.css";

interface CreateTask {
  title: string;
  priority: number;
}

interface Task {
  id: number; 
  title: string;
  isDone: boolean;
  priority: number;
}

interface UseTaskServiceResponse {
  tasks: Task[];
  totalCount: number;
  addTask: (task: CreateTask) => void;
  deleteTask: (id: number) => void; 
  toggleTask: (id: number) => void;
  isLoading: boolean;
}

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { 
    tasks, 
    totalCount, 
    addTask, 
    deleteTask, 
    toggleTask, 
    isLoading 
  }: UseTaskServiceResponse = useTaskService(currentPage, 5, undefined);

  return (
    <div className="home-container">
      <AddTask addTask={addTask} isLoading={isLoading} />
      
      {isLoading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <TodoList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} />
          <Pagination currentPage={currentPage} totalCount={totalCount} setCurrentPage={setCurrentPage} />
        </>
      )}
    </div>
  );
};

export default Home;
