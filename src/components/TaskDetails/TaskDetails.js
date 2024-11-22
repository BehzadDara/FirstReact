import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTaskStore from '../../zustand/store';
import TaskCard from '../TaskCard/TaskCard';
import Card from '../../layouts/Card';

const TaskDetails = () => {
  const { id } = useParams();
  const { getTaskById, selectedTask, toggleTask, deleteTask } = useTaskStore();

  useEffect(() => {
    getTaskById(id);
  }, [id, getTaskById]);

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
