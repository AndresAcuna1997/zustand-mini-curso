import { IoReorderTwoOutline } from "react-icons/io5";
import { Task } from "../../interfaces/taks.interface";
import { FC } from "react";
import { useTaskStore } from "../../stores/tasks/tasks.store";

interface Props {
  task: Task;
}

export const SingleTask: FC<Props> = ({ task }) => {
  const setDraggingTaskId = useTaskStore((state) => state.setDraggingTaskId);
  const removeDraggindTaskId = useTaskStore(
    (state) => state.removeDraggindTaskId
  );

  return (
    <div
      draggable
      onDragStart={() => setDraggingTaskId(task.id)}
      onDragEnd={removeDraggindTaskId}
      className="mt-5 flex items-center justify-between p-2"
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-base font-bold text-navy-700">{task.title}</p>
      </div>
      <span className=" h-6 w-6 text-navy-700 cursor-pointer">
        <IoReorderTwoOutline />
      </span>
    </div>
  );
};
