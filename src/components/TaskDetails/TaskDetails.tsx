import React from 'react';
import { useParams } from 'react-router-dom';
import useTaskService from '../../TaskService.tsx';
import TaskCard from '../TaskCard/TaskCard.tsx';
import Card from '../../layouts/Card.tsx';
import withLogger from "../../higherOrderComponents/withLogger.tsx";

const TaskDetails: React.FC = () => {
  const { id } = useParams<Record<string, string | undefined>>();

  const taskId = id ? Number(id) : undefined;

  const { selectedTask, toggleTask, deleteTask } = useTaskService(undefined, undefined, taskId);

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

export default withLogger(TaskDetails);
