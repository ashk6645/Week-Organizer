import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckSquare, Plus, Sun, Moon, Sliders } from 'lucide-react';
import WeeklySchedule from './components/WeeklySchedule';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import { ProgressPie } from './components/ProgressPie';
import { motion, AnimatePresence } from 'framer-motion';

export interface Task {
  id: number;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueDate: string;
  scheduledDay?: string;
  scheduledTime?: string;
}

type Theme = 'light' | 'dark' | 'blue' | 'green';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedule' | 'tasks'>('schedule');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

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

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 
      theme === 'blue' ? 'bg-blue-50' : theme === 'green' ? 'bg-green-50' : 'bg-gray-50'}`}>
      
      <header className={`shadow-sm transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 
        theme === 'blue' ? 'bg-blue-100' : theme === 'green' ? 'bg-green-100' : 'bg-white'}`}>
        
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <motion.div whileHover={{ rotate: -20 }}>
                <Calendar className={`w-6 h-6 ${theme === 'dark' ? 'text-indigo-400' : 
                  theme === 'blue' ? 'text-blue-600' : theme === 'green' ? 'text-green-600' : 'text-indigo-600'}`} />
              </motion.div>
              <h1 className="text-xl font-bold">Weekly Planner</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <button
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${theme === 'dark' ? 
                    'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  <Sliders className="w-4 h-4 mr-2" />
                  Theme
                </button>
                <div className="absolute hidden group-hover:block right-0 mt-2 w-48 rounded-md shadow-lg overflow-hidden">
                  <div className={`p-2 space-y-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                    {['light', 'dark', 'blue', 'green'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t as Theme)}
                        className={`w-full px-4 py-2 text-left rounded-md ${theme === t ? 
                          (theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100') : 
                          (theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-50')}`}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${theme === 'dark' ? 
                  'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                activeTab === 'schedule' ? 'bg-indigo-600 text-white' : theme === 'dark' ? 
                'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-4 h-4 mr-2" />
              Weekly Schedule
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                activeTab === 'tasks' ? 'bg-indigo-600 text-white' : theme === 'dark' ? 
                'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Tasks
            </motion.button>
          </div>
          
          <ProgressPie completed={completedTasks} total={totalTasks} theme={theme} />
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 
              'bg-gray-800' : 'bg-white'}`}
          >
            {activeTab === 'schedule' ? (
              <WeeklySchedule tasks={tasks} theme={theme} setTasks={setTasks} />
            ) : (
              <TaskList tasks={tasks} onToggleComplete={toggleTaskCompletion} theme={theme} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <AddTaskModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAddTask={handleAddTask}
        theme={theme}
      />
    </div>
  );
}

export default App;