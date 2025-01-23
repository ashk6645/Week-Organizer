import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, CheckSquare, Plus, X } from 'lucide-react';
import WeeklySchedule from './components/WeeklySchedule';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';

export interface Task {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  dueDate: string;
  scheduledDay?: string;
  scheduledTime?: string;
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'tasks'>('schedule');
  const [tasks, setTasks] = useState<Task[]>([
    // {
    //   id: 1,
    //   title: 'Practice React Hooks',
    //   category: 'coding',
    //   completed: false,
    //   dueDate: '20-03-2024',
    //   scheduledDay: 'Monday',
    //   scheduledTime: '14:00',
    // },
    // {
    //   id: 2,
    //   title: 'Study Database Management',
    //   category: 'study',
    //   completed: true,
    //   dueDate: '19-03-2025',
    //   scheduledDay: 'Wednesday',
    //   scheduledTime: '10:00',
    // },
  ]);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now(),
      completed: false,
    };
    setTasks([...tasks, task]);
    setShowModal(false);
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-indigo-600" />
              <h1 className="text-xl font-semibold text-gray-900">Weekly Planner</h1>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'schedule'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Clock className="w-4 h-4 mr-2" />
            Weekly Schedule
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'tasks'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <CheckSquare className="w-4 h-4 mr-2" />
            Tasks
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          {activeTab === 'schedule' ? (
            <WeeklySchedule tasks={tasks} />
          ) : (
            <TaskList tasks={tasks} onToggleComplete={toggleTaskCompletion} />
          )}
        </div>
      </main>

      <AddTaskModal 
        open={showModal} 
        onClose={() => setShowModal(false)} 
        onAddTask={handleAddTask}
      />
    </div>
  );
}

export default App;