import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useKanban } from '../context/KanbanContext';
import Column from './Column';

const KanbanBoard = () => {
  const { columns, moveTask } = useKanban();

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTask(
      draggableId,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  };

  return (
    <div className="flex-1 p-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((column, index) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <Column column={column} index={index} />
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
