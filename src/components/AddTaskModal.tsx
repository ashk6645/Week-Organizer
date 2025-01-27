import React, { useState } from 'react';
import { X, BookOpen, Code, GraduationCap, Brain, Dumbbell, MoreHorizontal, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task } from '../App';

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  theme: 'light' | 'dark' | 'blue' | 'green';
}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = Array.from({ length: 14 }, (_, i) => `${i + 8}:00`);
const priorities = [
  { value: 'low', color: 'text-green-500', label: 'Low' },
  { value: 'medium', color: 'text-yellow-500', label: 'Medium' },
  { value: 'high', color: 'text-red-500', label: 'High' },
];

const categories = {
  study: { icon: BookOpen, label: 'Study', color: 'text-blue-500' },
  coding: { icon: Code, label: 'Coding', color: 'text-emerald-500' },
  assignment: { icon: GraduationCap, label: 'Assignment', color: 'text-violet-500' },
  exam: { icon: Brain, label: 'Exam', color: 'text-rose-500' },
  workout: { icon: Dumbbell, label: 'Workout', color: 'text-amber-500' },
  other: { icon: MoreHorizontal, label: 'Other', color: 'text-gray-500' },
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onClose, onAddTask, theme }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: '',
    scheduledDay: '',
    scheduledTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskData.title && taskData.category && taskData.dueDate) {
      onAddTask(taskData);
      setTaskData({
        title: '',
        category: '',
        priority: 'medium',
        dueDate: '',
        scheduledDay: '',
        scheduledTime: '',
      });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ${
            theme === 'dark' ? 'bg-gray-900/80' : 'bg-gray-500/80'
          }`}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className={`rounded-xl shadow-2xl ${
              theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
            } w-full max-w-md m-4 p-6`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Create New Task</h2>
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={onClose}
                className={`rounded-full p-1 hover:bg-opacity-20 transition-colors ${
                  theme === 'dark' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'
                }`}
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Task Title</label>
                  <input
                    type="text"
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500/30'
                        : 'bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(categories).map(([key, { icon: Icon, label, color }]) => (
                      <motion.button
                        key={key}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setTaskData({ ...taskData, category: key })}
                        className={`flex items-center justify-center p-3 rounded-lg border transition-colors ${
                          taskData.category === key
                            ? `${color} border-transparent bg-opacity-10 ${theme === 'dark' ? 'bg-gray-100' : 'bg-gray-800'}`
                            : `${theme === 'dark' ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-2" />
                        <span className="text-sm">{label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <div className="flex gap-2">
                    {priorities.map(({ value, color, label }) => (
                      <motion.button
                        key={value}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setTaskData({ ...taskData, priority: value as 'low' | 'medium' | 'high' })}
                        className={`flex-1 flex items-center justify-center p-3 rounded-lg border transition-colors ${
                          taskData.priority === value
                            ? `${color} border-transparent bg-opacity-10 ${theme === 'dark' ? 'bg-gray-100' : 'bg-gray-800'}`
                            : `${theme === 'dark' ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300'}`
                        }`}
                      >
                        <Flag className={`w-5 h-5 mr-2 ${color}`} />
                        <span className="text-sm">{label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Due Date</label>
                    <input
                      type="date"
                      value={taskData.dueDate}
                      onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500/30'
                          : 'bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Schedule Day</label>
                    <select
                      value={taskData.scheduledDay}
                      onChange={(e) => setTaskData({ ...taskData, scheduledDay: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500/30'
                          : 'bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20'
                      }`}
                    >
                      <option value="">Not scheduled</option>
                      {weekDays.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Schedule Time</label>
                  <select
                    value={taskData.scheduledTime}
                    onChange={(e) => setTaskData({ ...taskData, scheduledTime: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 focus:border-indigo-500 focus:ring-indigo-500/30'
                        : 'bg-gray-50 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20'
                    }`}
                  >
                    <option value="">Not scheduled</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className={`px-5 py-2 rounded-lg font-medium transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700/50'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                >
                  Create Task
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddTaskModal;