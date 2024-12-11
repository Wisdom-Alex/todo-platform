export type Task = {
    id: string;
    title: string;
    color: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  };