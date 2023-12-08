import { DragEvent, useState } from "react";
import Swal from 'sweetalert2';
import { useTaskStore } from '../stores/tasks/tasks.store';
import { TaskStatus } from '../interfaces/taks.interface';


export const useTasks = ( status: TaskStatus ) => {

  const onTaskDrop = useTaskStore( ( state ) => state.onTaskDrop );
  const isDragging = useTaskStore( ( state ) => !!state.draggingTaskId );
  const addTask = useTaskStore( ( state ) => state.addTask );

  const [ onDragOver, setOnDragOver ] = useState( false );

  const handleDragOver = ( e: DragEvent<HTMLDivElement> ) => {
    e.preventDefault();
    setOnDragOver( true );
  };

  const handleDragLeave = ( e: DragEvent<HTMLDivElement> ) => {
    e.preventDefault();
    setOnDragOver( false );
  };

  const handleOnDrop = ( e: DragEvent<HTMLDivElement> ) => {
    e.preventDefault();
    // changeStatusTask(status);
    onTaskDrop( status );
  };

  const handleAddTask = async () => {

    const { value, isConfirmed } = await Swal.fire(
      {
        title: 'Nueva tarea',
        input: 'text',
        inputLabel: 'Ingrese el nombre de la tarea',
        inputPlaceholder: 'Nombre de la tarea',
        showCancelButton: true,
        inputValidator: ( value ) => {
          if ( !value ) {
            return 'Ingrese el nombre de la tarea';
          }
        }
      }
    );

    if ( !isConfirmed ) return;
    addTask( value, status );

  };

  return { handleDragOver, handleDragLeave, handleOnDrop, isDragging, onDragOver, handleAddTask };
};