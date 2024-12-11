'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import TaskForm from '@/components/TaskForm';
import { fetchTasks } from '@/lib/api';
import { Task } from '@/types';

export default function EditTaskPage() {
  const params = useParams();
  const [task, setTask] = useState<Task | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const tasks = await fetchTasks();
        const foundTask = tasks.find(t => t.id === params.id);
        setTask(foundTask);
      } catch (error) {
        console.error('Failed to load task', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTask();
  }, [params.id]);

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!task) {
    return <div className="container mx-auto p-4">Task not found</div>;
  }

  return <TaskForm initialTask={task} />;
}