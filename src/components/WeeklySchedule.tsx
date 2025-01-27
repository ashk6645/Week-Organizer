import React, { useRef } from 'react';
import { Clock, BookOpen, Code, GraduationCap, Download, Brain, Dumbbell, MoreHorizontal } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { Task } from '../App';

interface WeeklyScheduleProps {
  tasks: Task[];
  darkMode: boolean;
}

const timeSlots = Array.from({ length: 17 }, (_, i) => i + 7);
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const categories = {
  study: { icon: BookOpen, color: 'bg-blue-100 text-blue-800' },
  coding: { icon: Code, color: 'bg-emerald-100 text-emerald-800' },
  assignment: { icon: GraduationCap, color: 'bg-violet-100 text-violet-800' },
  exam: { icon: Brain, color: 'bg-rose-100 text-rose-800' },
  workout: { icon: Dumbbell, color: 'bg-amber-100 text-amber-800' },
  other: { icon: MoreHorizontal, color: 'bg-gray-100 text-gray-800' },
};

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ tasks, darkMode }) => {
  const scheduleRef = useRef<HTMLDivElement>(null);

  const getTaskForTimeSlot = (day: string, hour: number) => {
    return tasks.filter(task => 
      task.scheduledDay === day && 
      task.scheduledTime === `${hour}:00`
    );
  };

  const handleDownload = async () => {
    if (!scheduleRef.current) return;

    try {
      // Ensure all elements are fully rendered
      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(scheduleRef.current, { scale: 3, useCORS: true });
      const pdf = new jsPDF('landscape', 'px', [canvas.width, canvas.height]);
      pdf.addImage(canvas, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`weekly-schedule-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleDownload}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
            darkMode 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-gray-100' 
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          <Download className="w-4 h-4 mr-2" />
          Export Schedule
        </button>
      </div>
      
      <div className="rounded-xl border" ref={scheduleRef}>
        <table className="w-full border-collapse table-fixed">
          <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className="w-24 p-3 border-r text-sm font-medium text-gray-500 text-left sticky left-0 z-10 bg-inherit">
                Time
              </th>
              {weekDays.map(day => (
                <th 
                  key={day}
                  className="p-3 text-sm font-medium text-gray-500 text-center"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className={darkMode ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}>
            {timeSlots.map(hour => (
              <tr key={hour} className={darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}>
                <td className={`p-3 border-r text-sm text-gray-500 sticky left-0 z-10 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  {`${hour}:00`}
                </td>
                
                {weekDays.map(day => {
                  const tasks = getTaskForTimeSlot(day, hour);
                  return (
                    <td 
                      key={`${day}-${hour}`}
                      className="p-1 align-top h-16 min-h-[4rem]"
                    >
                      {tasks.map(task => {
                        const CategoryIcon = categories[task.category as keyof typeof categories].icon;
                        const categoryStyle = categories[task.category as keyof typeof categories].color;
                        
                        return (
                          <div
                            key={task.id}
                            className={`${categoryStyle} p-2 rounded-md text-sm mb-1 shadow-sm`}
                          >
                            <div className="flex items-center gap-2">
                              <CategoryIcon className="w-4 h-4" />
                              <span className="font-medium truncate">{task.title}</span>
                            </div>
                            {task.dueDate && (
                              <div className="text-xs mt-1 opacity-80">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklySchedule;