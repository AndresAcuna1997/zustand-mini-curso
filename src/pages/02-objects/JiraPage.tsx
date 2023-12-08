import { JiraTasks } from "../../components";
import { useTaskStore } from "../../stores/tasks/tasks.store";

export const JiraPage = () => {
  // const tasks = useTaskStore((state) => state.tasks);
  const pendingTasks = useTaskStore((state) => state.getTaskByStatus("open"));
  const currentTasks = useTaskStore((state) =>
    state.getTaskByStatus("in-progress")
  );
  const closedTasks = useTaskStore((state) => state.getTaskByStatus("done"));

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" status="open" tasks={pendingTasks} />

        <JiraTasks title="Avanzando" status="in-progress" tasks={currentTasks} />

        <JiraTasks title="Terminadas" status="done" tasks={closedTasks} />
      </div>
    </>
  );
};
