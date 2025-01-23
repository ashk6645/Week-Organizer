import React, { useRef } from 'react';
import { Clock, BookOpen, Code, GraduationCap, Download, Brain, Dumbbell, MoreHorizontal } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { Task } from '../App';

interface WeeklyScheduleProps {
  tasks: Task[];
}

const timeSlots = Array.from({ length: 17}, (_, i) => i + 7); // 8 AM to 9 PM
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const categories = {
  study: { icon: BookOpen, color: 'bg-blue-100 text-blue-800' },
  coding: { icon: Code, color: 'bg-green-100 text-green-800' },
  assignment: { icon: GraduationCap, color: 'bg-purple-100 text-purple-800' },
  exam: { icon: Brain, color: 'bg-purple-100 text-purple-800' },
  workout: { icon: Dumbbell, color: 'bg-purple-100 text-purple-800' },
  other: { icon: MoreHorizontal, color: 'bg-gray-100 text-gray-800' },
};

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ tasks }) => {
  const scheduleRef = useRef<HTMLDivElement>(null);

  const getTaskForTimeSlot = (day: string, hour: number) => {
    return tasks.find(
      task => 
        task.scheduledDay === day && 
        task.scheduledTime === `${hour}:00`
    );
  };

  const handleDownload = async () => {
    if (!scheduleRef.current) return;

    try {
      const canvas = await html2canvas(scheduleRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      // Add the canvas as an image to the PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

      // Download the PDF
      pdf.save(`schedule-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownload}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Schedule as PDF
        </button>
      </div>
      <div className="overflow-x-auto" ref={scheduleRef}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="w-20 px-4 py-2"></th>
              {weekDays.map((day) => (
                <th
                  key={day}
                  className="px-4 py-2 text-sm font-medium text-gray-500 text-center"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {timeSlots.map((hour) => (
              <tr key={hour}>
                <td className="px-4 py-2 text-sm text-gray-500 whitespace-nowrap">
                  {`${hour}:00`}
                </td>
                {weekDays.map((day) => {
                  const task = getTaskForTimeSlot(day, hour);
                  const CategoryIcon = task 
                    ? categories[task.category as keyof typeof categories].icon 
                    : null;
                  const categoryColor = task 
                    ? categories[task.category as keyof typeof categories].color 
                    : '';

                  return (
                    <td
                      key={`${day}-${hour}`}
                      className="px-4 py-2 border border-gray-100 h-16 align-top"
                    >
                      {task && (
                        <div className={`p-2 rounded-md ${categoryColor} text-sm`}>
                          <div className="flex items-center space-x-2">
                            {CategoryIcon && <CategoryIcon className="w-4 h-4" />}
                            <span className="font-medium">{task.title}</span>
                          </div>
                        </div>
                      )}
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