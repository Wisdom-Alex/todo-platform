'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createTask, updateTask } from '../lib/api';
import { Task } from '../types';
import ColorSelector from './ui/ColorSelector';
import { toast } from 'react-toastify';

type TaskFormProps = {
  initialTask?: Task;
};

export default function TaskForm({ initialTask }: TaskFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTask?.title || '');
  const [color, setColor] = useState<Task['color']>(initialTask?.color || 'blue');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (initialTask) {
        // Update existing task
        await updateTask(initialTask.id, { title, color });
        toast.success('Task updated successfully!');
      } else {
        // Create new task
        await createTask({ title, color, completed: false });
        toast.success('Task created successfully!');
      }
      router.push('/');
    } catch (err) {
      toast.error('Failed to save task. Please try again.');
      setError('Failed to save task. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md bg-gray-800 rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl font-bold mb-6 text-white">
        {initialTask ? 'Edit Task' : 'Create Task'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500 text-white px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-200"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-gray-100 placeholder-gray-400 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Color
          </label>
          <ColorSelector 
            selectedColor={color}
            onSelectColor={(selectedColor) => setColor(selectedColor)}
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 rounded shadow hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : (initialTask ? 'Update Task' : 'Create Task')}
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full bg-gray-600 text-white py-2 rounded shadow hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
