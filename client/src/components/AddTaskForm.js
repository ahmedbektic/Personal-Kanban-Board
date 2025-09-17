import React, { useState } from 'react';
import { useKanban } from '../context/KanbanContext';

const AddTaskForm = ({ columnId, onClose }) => {
  const { addTask } = useKanban();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const tags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    addTask({
      columnId,
      title: formData.title.trim(),
      description: formData.description.trim(),
      tags,
      dueDate: formData.dueDate || null
    });

    setFormData({
      title: '',
      description: '',
      tags: '',
      dueDate: ''
    });
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      tags: '',
      dueDate: ''
    });
    onClose();
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          placeholder="Task title"
          autoFocus
          required
        />
        
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none"
          placeholder="Task description"
          rows="2"
        />
        
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          placeholder="Tags (comma separated)"
        />
        
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
        />
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
