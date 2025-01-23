import React from 'react';
import { CheckCircle2, Circle, BookOpen, Code, GraduationCap, Clock, Brain, Dumbbell, MoreHorizontal} from 'lucide-react';
import type { Task } from '../App';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number) => void;
}

const categories = {
  study: { icon: BookOpen, color: 'text-blue-500' },
  coding: { icon: Code, color: 'text-green-500' },
  assignment: { icon: GraduationCap, color: 'text-purple-500' },
  exam: { icon: Brain, color: 'text-purple-500' },
  workout: { icon: Dumbbell, color: 'text-purple-500' },
  other: { icon: MoreHorizontal, color: 'text-gray-500' },
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
  return (
    <div className="p-6">
      <div className="space-y-4">
        {tasks.map((task) => {
          console.log(task);
          const CategoryIcon = categories[task.category as keyof typeof categories].icon;
          const categoryColor = categories[task.category as keyof typeof categories].color;

          return (
            <div
              key={task.id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <button 
                className="focus:outline-none"
                onClick={() => onToggleComplete(task.id)}
              >
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </button>
              <div className="flex-1">
                <h3
                  className={`text-lg font-medium ${
                    task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}
                >
                  {task.title}
                </h3>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-2">
                    <CategoryIcon className={`w-4 h-4 ${categoryColor}`} />
                    <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                  </div>
                  {task.scheduledDay && task.scheduledTime && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Scheduled: {task.scheduledDay} at {task.scheduledTime}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tasks yet. Click the "Add Task" button to create one!
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;