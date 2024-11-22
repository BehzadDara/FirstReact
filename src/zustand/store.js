/*

It was redux instead of zustand. 

Advantages of Zustand:
1- Simplicity: Zustand requires less boilerplate compared to Redux.
2- React Hooks: Directly integrates with React's functional components using hooks.
3- Small Size: Zustand is lightweight and efficient.

*/

import { create } from 'zustand';

const API_BASE_URL = "http://localhost:5079";

const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  pageNumber: 1, 
  pageSize: 10,
  totalCount: 0,
  selectedTask: null,

  fetchTasks: async () => {
    set({ loading: true });
    const { pageNumber, pageSize } = get();
    try {
      const response = await fetch(`${API_BASE_URL}/tasks?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      const result = await response.json();
      set({ tasks: result.tasks, totalCount: result.totalCount, loading: false });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      set({ loading: false });
    }
  },

  addTask: async (task) => {
    set({ loading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error('Failed to add task');
      await response.json();
      set({ loading: false });
      await set.fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
      set({ loading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      await response.json();
      set({ loading: false });
      await set.fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      set({ loading: false });
    }
  },

  toggleTask: async (id) => {
    set({ loading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Failed to toggle task');
      await response.json();
      set({ loading: false });
      await set.fetchTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
      set({ loading: false });
    }
  },

  setPage: (newPageNumber) => {
    set({ pageNumber: newPageNumber });
    get().fetchTasks();
  },
  
  getTaskById: async (id) => {
    set({ loading: true });
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
      if (!response.ok) throw new Error('Failed to fetch task by ID');
      const task = await response.json();
      set({ selectedTask: task, loading: false });
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      set({ loading: false });
    }
  },
}));

export default useTaskStore;
