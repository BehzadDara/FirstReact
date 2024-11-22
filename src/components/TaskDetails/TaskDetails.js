import React from 'react';
import { useParams } from 'react-router-dom';
import useTaskService from "../../TaskService";
import TaskCard from '../TaskCard/TaskCard';
import Card from '../../layouts/Card';

const TaskDetails = () => {
  const { id } = useParams();
  
  const { selectedTask, toggleTask, deleteTask } = useTaskService(undefined, undefined, id);

  return (
    <div>
      {selectedTask ? (
        <TaskCard task={selectedTask} toggleTask={toggleTask} deleteTask={deleteTask} />
      ) : (
        <Card title="Task Not Found" />
      )}
    </div>
  );
};

export default TaskDetails;
