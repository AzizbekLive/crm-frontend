import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import React from 'react';

const Card = ({ id }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: id });

    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px) rotate(5deg)`,
              zIndex: 9999,
          }
        : undefined;
    return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white my-1 p-3">
            {id}
        </li>
    );
};
const Column = ({ id }) => {
    const { setNodeRef } = useDroppable({ id: id });
    const tasks = [1, 2, 3];
    return (
        <div className="w-25 bg-primary p-3">
            <ul ref={setNodeRef}>
                {tasks.map((task) => (
                    <Card id={`${task}-${id}`} />
                ))}
            </ul>
        </div>
    );
};

const DraggableTest = () => {
    const columns = [4, 5, 6];
    return (
        <div>
            <div className="d-flex gap-2">
                <DndContext>
                    {columns.map((task) => (
                        <Column id={task} />
                    ))}
                </DndContext>
            </div>
        </div>
    );
};

export default DraggableTest;
