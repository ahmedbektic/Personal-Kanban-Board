import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useKanban } from '../context/KanbanContext';
import Task from './Task';
import AddTaskForm from './AddTaskForm';

const Column = ({ column, index }) => {
  const { getFilteredTasks, deleteColumn, tasks } = useKanban();
  const [showAddForm, setShowAddForm] = useState(false);
  
  const filteredTaskIds = getFilteredTasks(column.taskIds);

  return (
    <div className="kanban-column">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {column.title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-gray-500 hover:text-blue-500 transition-colors"
            title="Add task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          {column.id !== 'todo' && column.id !== 'inprogress' && column.id !== 'done' && (
            <button
              onClick={() => deleteColumn(column.id)}
              className="text-gray-500 hover:text-red-500 transition-colors"
              title="Delete column"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="mb-4">
          <AddTaskForm 
            columnId={column.id} 
            onClose={() => setShowAddForm(false)} 
          />
        </div>
      )}

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[400px] transition-colors duration-200 ${
              snapshot.isDraggingOver 
                ? 'bg-blue-50 dark:bg-blue-900/20' 
                : ''
            }`}
          >
            {filteredTaskIds.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm">No tasks</p>
              </div>
            ) : (
              filteredTaskIds.map((taskId, taskIndex) => {
                const task = tasks[taskId];
                if (!task) return null;
                return (
                  <Task
                    key={taskId}
                    task={task}
                    columnId={column.id}
                    index={taskIndex}
                  />
                );
              })
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
