import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useKanban } from '../context/KanbanContext';

const Task = ({ task, columnId, index }) => {
  const { updateTask, deleteTask, isTaskOverdue, isTaskDueToday } = useKanban();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    tags: task.tags.join(', '),
    dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
  });

  const handleSave = () => {
    const tags = editData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    updateTask(task.id, {
      title: editData.title,
      description: editData.description,
      tags,
      dueDate: editData.dueDate || null
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      tags: task.tags.join(', '),
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
    });
    setIsEditing(false);
  };

  const getTaskClasses = () => {
    let classes = 'kanban-task';
    if (isTaskOverdue(task.dueDate)) {
      classes += ' task-overdue';
    } else if (isTaskDueToday(task.dueDate)) {
      classes += ' task-due-today';
    }
    return classes;
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <div className="kanban-task bg-blue-50 dark:bg-blue-900/20 border-blue-300">
        <input
          type="text"
          value={editData.title}
          onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Task title"
        />
        <textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          placeholder="Task description"
          rows="3"
        />
        <input
          type="text"
          value={editData.tags}
          onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
          className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Tags (comma separated)"
        />
        <input
          type="date"
          value={editData.dueDate}
          onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
          className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${getTaskClasses()} ${
            snapshot.isDragging ? 'shadow-lg transform rotate-2' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              {task.title}
            </h3>
            <div className="flex gap-1">
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-blue-500 transition-colors"
                title="Edit task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Delete task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-gray-600 dark:text-gray-300 text-xs mb-2">
              {task.description}
            </p>
          )}
          
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {task.dueDate && (
            <div className="text-xs">
              <span className={`font-medium ${
                isTaskOverdue(task.dueDate) 
                  ? 'text-red-600 dark:text-red-400' 
                  : isTaskDueToday(task.dueDate)
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                Due: {formatDueDate(task.dueDate)}
              </span>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
