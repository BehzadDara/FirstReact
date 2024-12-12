import { useQuery, useMutation, useQueryClient, useIsFetching, UseQueryOptions } from '@tanstack/react-query';

const API_BASE_URL = "http://localhost:5079";

const getAuthToken = () => {
  return localStorage.getItem('token');
};

interface Task {
  id: number;
  title: string;
  isDone: boolean;
  priority: number;
}

interface TaskResponse {
  tasks: Task[];
  totalCount: number;
}

interface FetchTasksParams {
  currentPageNumber: number;
  currentPageSize: number;
}

interface AddTaskParams {
  title: string;
  priority: number;
}

const addAuthHeader = (): Record<string, string> | undefined => {
  const token = getAuthToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return undefined;
};

const fetchTasks = async ({ currentPageNumber, currentPageSize }: FetchTasksParams): Promise<TaskResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/tasks?pageNumber=${currentPageNumber}&pageSize=${currentPageSize}`,
    {
      headers: addAuthHeader(),
    }
  );
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

const addTask = async (task: AddTaskParams): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...addAuthHeader(),
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error('Failed to add task');
  return await response.json();
};

const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: addAuthHeader(),
  });
  if (!response.ok) throw new Error('Failed to delete task');
};

const toggleTask = async (id: number): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: addAuthHeader(),
  });
  if (!response.ok) throw new Error('Failed to toggle task');
  return await response.json();
};

const fetchTaskById = async (id: number): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    headers: addAuthHeader(),
  });
  if (!response.ok) throw new Error('Failed to fetch task by ID');
  return await response.json();
};

const useTaskService = (pageNumber?: number, pageSize?: number, taskId?: number) => {
  const queryClient = useQueryClient();

  const currentPageNumber = pageNumber ?? 1;
  const currentPageSize = pageSize ?? 10;

  const { data, isLoading: isQueryLoading } = useQuery<TaskResponse, Error>({
    queryKey: ['tasks', pageNumber, pageSize],
    queryFn: () => fetchTasks({ currentPageNumber, currentPageSize }),
    enabled: !!pageNumber && !!pageSize,
    staleTime: 1000 * 60 * 5,  // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  } as UseQueryOptions<TaskResponse, Error, TaskResponse>);

  const isRefetching = useIsFetching({ queryKey: ['tasks'] }) > 0;

  const mutationAddTask = useMutation<Task, Error, AddTaskParams>({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const mutationDeleteTask = useMutation<void, Error, number>({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const mutationToggleTask = useMutation<Task, Error, number>({
    mutationFn: toggleTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { data: selectedTask } = useQuery<Task>({
    queryKey: ['task', taskId],
    queryFn: () => fetchTaskById(taskId!),
    enabled: !!taskId,
  });

  const handleToggleTask = async (taskId: number) => {
    await mutationToggleTask.mutateAsync(taskId);
  };

  return {
    tasks: data?.tasks || [],
    totalCount: data?.totalCount || 0,
    selectedTask,
    addTask: mutationAddTask.mutateAsync,
    deleteTask: mutationDeleteTask.mutateAsync,
    toggleTask: handleToggleTask,
    isLoading: isQueryLoading || isRefetching,
  };
};

export default useTaskService;
