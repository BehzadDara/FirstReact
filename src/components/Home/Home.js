import { useState } from "react";
import TodoList from "../TodoList/TodoList";
import Pagination from "../Pagination/Pagination";
import useTaskService from "../../TaskService";
import "./Home.css";
import AddTask from "../AddTask/AddTask";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { 
    tasks, 
    totalCount, 
    addTask, 
    deleteTask, 
    toggleTask, 
    isLoading, 
  } = useTaskService(currentPage, 10, undefined);

  return (
    <div className="home-container">
      <AddTask
        addTask={addTask}
        isLoading={isLoading}
      />
      {isLoading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
        <TodoList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          setCurrentPage={setCurrentPage}
        />
        </>
      )}
    </div>
  );
};

export default Home;
