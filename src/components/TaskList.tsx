import React from 'react';
import { CheckCircle2, Circle, BookOpen, Code, GraduationCap, Clock, Brain, Dumbbell, MoreHorizontal } from 'lucide-react';
import type { Task } from '../App';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: number) => void;
  darkMode: boolean;
}

const categories = {
  study: { icon: BookOpen, color: 'bg-blue-100 text-blue-800' },
  coding: { icon: Code, color: 'bg-emerald-100 text-emerald-800' },
  assignment: { icon: GraduationCap, color: 'bg-violet-100 text-violet-800' },
  exam: { icon: Brain, color: 'bg-rose-100 text-rose-800' },
  workout: { icon: Dumbbell, color: 'bg-amber-100 text-amber-800' },
  other: { icon: MoreHorizontal, color: 'bg-gray-100 text-gray-800' },
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, darkMode }) => {
  return (
    <div className="p-6">
      <div className="grid gap-4">
        {tasks.map((task) => {
          const CategoryIcon = categories[task.category as keyof typeof categories].icon;
          const categoryStyle = categories[task.category as keyof typeof categories].color;

          return (
            <div
              key={task.id}
              className={`group flex items-center p-4 rounded-xl transition-all ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700/80 border border-gray-700' 
                  : 'bg-white hover:bg-gray-50 border border-gray-100'
              } shadow-sm hover:shadow-md`}
            >
              <button 
                className="mr-4 focus:outline-none"
                onClick={() => onToggleComplete(task.id)}
              >
                {task.completed ? (
                  <CheckCircle2 className={`w-6 h-6 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                ) : (
                  <Circle className={`w-6 h-6 ${darkMode ? 'text-gray-500' : 'text-gray-300'}`} />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`${categoryStyle} px-3 py-1 rounded-full text-xs font-medium`}>
                    <CategoryIcon className="inline-block w-4 h-4 mr-2" />
                    {task.category}
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <h3 className={`font-medium ${task.completed ? 'line-through opacity-70' : ''}`}>
                  {task.title}
                </h3>
                {task.scheduledDay && task.scheduledTime && (
                  <div className="mt-2 flex items-center text-sm">
                    <Clock className={`w-4 h-4 mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {task.scheduledDay} at {task.scheduledTime}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {tasks.length === 0 && (
          <div className={`text-center p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border border-dashed`}>
            <div className="text-gray-400 mb-2">No tasks found</div>
            <div className="text-sm text-gray-500">Click "Add Task" to create your first task</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;