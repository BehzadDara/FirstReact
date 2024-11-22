import { useQuery, useMutation, useQueryClient, useIsFetching } from '@tanstack/react-query';

const API_BASE_URL = "http://localhost:5079";

const fetchTasks = async ({ pageNumber, pageSize }) => {
  const response = await fetch(`${API_BASE_URL}/tasks?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

const addTask = async (task) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error('Failed to add task');
  return await response.json();
};

const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete task');
  return await response.json();
};

const toggleTask = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, { method: 'PATCH' });
  if (!response.ok) throw new Error('Failed to toggle task');
  return await response.json();
};

const fetchTaskById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
  if (!response.ok) throw new Error('Failed to fetch task by ID');
  return await response.json();
};

const useTaskService = (pageNumber, pageSize, taskId) => {
  const queryClient = useQueryClient();

  const { data, isLoading: isQueryLoading } = useQuery({
    queryKey: ['tasks', pageNumber, pageSize],
    queryFn: () => fetchTasks({ pageNumber, pageSize }),
    enabled: !!pageNumber && !!pageSize,
  });

  const isRefetching = useIsFetching({ queryKey: ['tasks'] }) > 0;

  const mutationAddTask = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    }
  });

  const mutationDeleteTask = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    }
  });

  const mutationToggleTask = useMutation({
    mutationFn: toggleTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    }
  });

  const { data: selectedTask } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => fetchTaskById(taskId),
    enabled: !!taskId,
  });

  const handleToggleTask = (taskId) => {
    mutationToggleTask.mutate(taskId);
  };

  return {
    tasks: data?.tasks || [],
    totalCount: data?.totalCount || 0,
    selectedTask,
    addTask: mutationAddTask.mutate,
    deleteTask: mutationDeleteTask.mutate,
    toggleTask: handleToggleTask,
    isLoading: isQueryLoading || isRefetching,
  };
};

export default useTaskService;

