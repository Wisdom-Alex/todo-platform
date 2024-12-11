'use client';

import { useState, useEffect } from 'react';
import { fetchTasks, updateTask, deleteTask } from '../lib/api';
import { Task } from '../types';
import TaskCard from '../components/TaskCard';
import Link from 'next/link';
import Spinner from '@/components/ui/Spinner';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await fetchTasks();
      console.log('Fetched tasks:', fetchedTasks); // Debugging
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedTask = await updateTask(task.id, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="container mx-auto p-6 max-w-lg mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <Link
          href="/tasks/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Task
        </Link>
      </div>

      <div className="mb-4 text-gray-600">
        Tasks: {tasks.length} | Completed: {completedTasks} of {tasks.length}
      </div>

      {isLoading ? (
        <Spinner />
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks yet. Create your first task!</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={() => handleToggleComplete(task)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
