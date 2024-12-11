import { Task } from '../../types';

type ColorSelectorProps = {
  selectedColor: Task['color'];
  onSelectColor: (color: Task['color']) => void;
};

const COLORS: Task['color'][] = ['red', 'blue', 'green', 'yellow', 'purple'];

export default function ColorSelector({ 
  selectedColor, 
  onSelectColor 
}: ColorSelectorProps) {
  return (
    <div className="flex space-x-2">
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onSelectColor(color)}
          className={`w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2
            ${selectedColor === color ? `ring-2 ring-offset-2 ring-${color}-500` : ''}
            bg-${color}-500 hover:bg-${color}-600`}
        >
          {/* Accessible label for color */}
          <span className="sr-only">{color}</span>
        </button>
      ))}
    </div>
  );
}
