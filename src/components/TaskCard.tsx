import Link from 'next/link';
import { Task } from '../types';

type TaskCardProps = {
  task: Task;
  onToggleComplete: () => void;
  onDelete: () => void;
};

const colorClasses: Record<Task['color'], string> = {
  red: 'bg-red-50 dark:bg-red-500/20 hover:ring-red-500',
  blue: 'bg-blue-50 dark:bg-blue-500/20 hover:ring-blue-500',
  green: 'bg-green-50 dark:bg-green-500/20 hover:ring-green-500',
  yellow: 'bg-yellow-50 dark:bg-yellow-500/20 hover:ring-yellow-500',
  purple: 'bg-purple-50 dark:bg-purple-500/20 hover:ring-purple-500',
};

export default function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
  return (
    <div
      className={`
        flex items-center justify-between p-4 rounded-lg shadow-md transition-all
        ${colorClasses[task.color]} hover:shadow-lg
      `}
    >
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggleComplete}
          className="form-checkbox h-5 w-5 text-blue-500"
        />
        <Link
          href={`/tasks/${task.id}/edit`}
          className={`
            text-lg font-medium transition-colors underline-offset-4
            ${task.completed ? 'line-through text-gray-500 dark:text-gray-600' : 'text-gray-800 dark:text-gray-100'}
            hover:underline hover:text-blue-600 dark:hover:text-blue-400
          `}
        >
          {task.title}
        </Link>
      </div>
      <button
        onClick={onDelete}
        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
      >
        🗑️
      </button>
    </div>
  );
}
