import { create, StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces/taks.interface";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidV4 } from 'uuid';
import { immer } from 'zustand/middleware/immer';

interface TasksState {
  tasks: Record<string, Task>;
  draggingTaskId?: string;
  getTaskByStatus: ( status: string ) => Task[];
  setDraggingTaskId: ( taskId: string ) => void;
  removeDraggindTaskId: () => void;
  changeStatusTask: ( newStatus: TaskStatus ) => void; //My method
  changeProgress: ( taskId: string, newStatus: TaskStatus ) => void; //Course method
  onTaskDrop: ( status: TaskStatus ) => void;
  addTask: ( ttile: string, status: TaskStatus ) => void;
  getTotalTasks: () => number;
}

const storeApi: StateCreator<TasksState, [ [ "zustand/immer", never ] ]> = ( set, get ) => ( {
  tasks: {
    "ABC-1": { id: "ABC-1", status: "open", title: "Tarea 1" },
    "ABC-2": { id: "ABC-2", status: "in-progress", title: "Tarea 2" },
    "ABC-3": { id: "ABC-3", status: "open", title: "Tarea 3" },
    "ABC-4": { id: "ABC-4", status: "open", title: "Tarea 4" },
  },
  draggingTaskId: undefined,
  setDraggingTaskId: ( taskId: string ) => {
    set( { draggingTaskId: taskId } );
  },
  getTaskByStatus: ( status ) => {
    const tasks = get().tasks;
    return Object.values( tasks ).filter( ( task ) => task.status === status );
  },
  removeDraggindTaskId: () => {
    set( { draggingTaskId: undefined } );
  },
  changeStatusTask: ( newStatus: TaskStatus ) => {
    const draggedTaskId = get().draggingTaskId;
    get().tasks[ draggedTaskId! ].status = newStatus;
  },
  changeProgress: ( taskId: string, newStatus: TaskStatus ) => {
    const task = { ...get().tasks[ taskId ] };
    task.status = newStatus;

    set( state => {
      state.tasks[ taskId ] = { ...task };
    } );

    //Without immer
    // set( ( state ) => ( {
    //   tasks: {
    //     ...state.tasks,
    //     [ taskId ]: tasks,
    //   },
    // } ) );
  },
  onTaskDrop: ( status: TaskStatus ) => {
    const taskId = get().draggingTaskId;
    if ( !taskId ) return;
    get().changeProgress( taskId, status );
    get().removeDraggindTaskId();
  },
  addTask: ( title: string, status: TaskStatus ) => {

    const newTask: Task = { id: uuidV4(), title, status };

    set( state => {
      state.tasks[ newTask.id ] = newTask;
    } );

    //WithOut immer
    // set( state => ( {
    //   tasks: {
    //     ...state.tasks,
    //     [ newTask.id ]: newTask
    //   }
    // } ) );
  },
  getTotalTasks: () => {
    const tasks = get().tasks;
    
    console.log(Object.keys( tasks ).length);
    
    return Object.keys( tasks ).length;
  }
} );

export const useTaskStore = create<TasksState>()(
  // devtools( immer( storeApi ) )
  devtools( persist( immer( storeApi ), { name: "tasks-store" } ) )
);
