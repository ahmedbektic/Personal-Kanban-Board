import React, { createContext, useContext, useReducer, useEffect } from 'react';

const KanbanContext = createContext();

const initialState = {
  columns: [
    { id: 'todo', title: 'To Do', taskIds: [] },
    { id: 'inprogress', title: 'In Progress', taskIds: [] },
    { id: 'done', title: 'Done', taskIds: [] }
  ],
  tasks: {},
  searchTerm: '',
  filterTag: '',
  theme: 'light'
};

const kanbanReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        ...action.payload
      };
    
    case 'ADD_TASK':
      const newTask = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description || '',
        tags: action.payload.tags || [],
        dueDate: action.payload.dueDate || null,
        createdAt: new Date().toISOString()
      };
      
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [newTask.id]: newTask
        },
        columns: state.columns.map(column =>
          column.id === action.payload.columnId
            ? { ...column, taskIds: [...column.taskIds, newTask.id] }
            : column
        )
      };
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.id]: {
            ...state.tasks[action.payload.id],
            ...action.payload.updates
          }
        }
      };
    
    case 'DELETE_TASK':
      const { [action.payload.id]: deletedTask, ...remainingTasks } = state.tasks;
      return {
        ...state,
        tasks: remainingTasks,
        columns: state.columns.map(column => ({
          ...column,
          taskIds: column.taskIds.filter(taskId => taskId !== action.payload.id)
        }))
      };
    
    case 'MOVE_TASK':
      const { taskId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = action.payload;
      
      const sourceColumn = state.columns.find(col => col.id === sourceColumnId);
      const destinationColumn = state.columns.find(col => col.id === destinationColumnId);
      
      if (sourceColumnId === destinationColumnId) {
        const newTaskIds = Array.from(sourceColumn.taskIds);
        newTaskIds.splice(sourceIndex, 1);
        newTaskIds.splice(destinationIndex, 0, taskId);
        
        return {
          ...state,
          columns: state.columns.map(column =>
            column.id === sourceColumnId
              ? { ...column, taskIds: newTaskIds }
              : column
          )
        };
      } else {
        const sourceTaskIds = sourceColumn.taskIds.filter(id => id !== taskId);
        const destinationTaskIds = Array.from(destinationColumn.taskIds);
        destinationTaskIds.splice(destinationIndex, 0, taskId);
        
        return {
          ...state,
          columns: state.columns.map(column => {
            if (column.id === sourceColumnId) {
              return { ...column, taskIds: sourceTaskIds };
            } else if (column.id === destinationColumnId) {
              return { ...column, taskIds: destinationTaskIds };
            }
            return column;
          })
        };
      }
    
    case 'ADD_COLUMN':
      const newColumn = {
        id: action.payload.id,
        title: action.payload.title,
        taskIds: []
      };
      return {
        ...state,
        columns: [...state.columns, newColumn]
      };
    
    case 'DELETE_COLUMN':
      const columnToDelete = state.columns.find(col => col.id === action.payload.columnId);
      const tasksToMove = columnToDelete.taskIds;
      
      return {
        ...state,
        columns: state.columns.filter(col => col.id !== action.payload.columnId),
        tasks: Object.fromEntries(
          Object.entries(state.tasks).filter(([taskId]) => !tasksToMove.includes(taskId))
        )
      };
    
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload
      };
    
    case 'SET_FILTER_TAG':
      return {
        ...state,
        filterTag: action.payload
      };
    
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    
    default:
      return state;
  }
};

export const KanbanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(kanbanReducer, initialState);

  useEffect(() => {
    const savedData = localStorage.getItem('kanban-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban-data', JSON.stringify(state));
  }, [state]);

  const addTask = (taskData) => {
    const id = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    dispatch({
      type: 'ADD_TASK',
      payload: { ...taskData, id }
    });
  };

  const updateTask = (taskId, updates) => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: { id: taskId, updates }
    });
  };

  const deleteTask = (taskId) => {
    dispatch({
      type: 'DELETE_TASK',
      payload: { id: taskId }
    });
  };

  const moveTask = (taskId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex) => {
    dispatch({
      type: 'MOVE_TASK',
      payload: {
        taskId,
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex
      }
    });
  };

  const addColumn = (title) => {
    const id = `column-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    dispatch({
      type: 'ADD_COLUMN',
      payload: { id, title }
    });
  };

  const deleteColumn = (columnId) => {
    dispatch({
      type: 'DELETE_COLUMN',
      payload: { columnId }
    });
  };

  const setSearchTerm = (term) => {
    dispatch({
      type: 'SET_SEARCH_TERM',
      payload: term
    });
  };

  const setFilterTag = (tag) => {
    dispatch({
      type: 'SET_FILTER_TAG',
      payload: tag
    });
  };

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const exportData = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kanban-board-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getFilteredTasks = (taskIds) => {
    return taskIds.filter(taskId => {
      const task = state.tasks[taskId];
      if (!task) return false;
      
      const matchesSearch = !state.searchTerm || 
        task.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(state.searchTerm.toLowerCase());
      
      const matchesTag = !state.filterTag || 
        task.tags.some(tag => tag.toLowerCase().includes(state.filterTag.toLowerCase()));
      
      return matchesSearch && matchesTag;
    });
  };

  const getAllTags = () => {
    const allTags = new Set();
    Object.values(state.tasks).forEach(task => {
      task.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
  };

  const isTaskOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  const isTaskDueToday = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due.getTime() === today.getTime();
  };

  const value = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    addColumn,
    deleteColumn,
    setSearchTerm,
    setFilterTag,
    toggleTheme,
    exportData,
    getFilteredTasks,
    getAllTags,
    isTaskOverdue,
    isTaskDueToday
  };

  return (
    <KanbanContext.Provider value={value}>
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
};
