import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import ComboBox from "./ComboBoxComponents/ComboBox";

interface Tag {
  id: number;
  name: string;
}

interface TaskFormProps {
  fetchTasks: Function;
  tags: Tag[];
}

const TaskForm = forwardRef<{}, TaskFormProps>(({ fetchTasks, tags }, ref) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    tags: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createTaskButtonRef = useRef<HTMLButtonElement | null>(null);

  const createTask = async () => {
    if (!newTask.title) {
      alert("Title is required!");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 500 + 1000)
      ); // Simulate network delay
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      setNewTask({ title: "", description: "", tags: [] });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useImperativeHandle(ref, () => ({
    createTaskButton: createTaskButtonRef.current,
  }));

  return (
    <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl bg-base-100 p-6 shadow-lg rounded-lg space-y-6 mx-auto">
      <input
        type="text"
        placeholder="Task Title"
        className="input input-bordered w-full"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        disabled={isSubmitting}
        aria-label="Task Title"
      />

      <textarea
        placeholder="Task Description"
        className="textarea textarea-bordered w-full"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        disabled={isSubmitting}
        aria-label="Task Description"
      ></textarea>

      <ComboBox tags={tags} fetchTasks={fetchTasks} />

      <button
        ref={createTaskButtonRef}
        onClick={createTask}
        disabled={isSubmitting}
        className={`flex items-center justify-center w-full h-8 font-bold rounded-md focus:ring-2 transition-all ${
          isSubmitting
            ? "cursor-wait opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-label={isSubmitting ? "Submitting task" : "Create task"}
      >
        {isSubmitting ? (
          <span className="animate-spin rounded-full h-6 w-6 border-2 border-t-2 border-blue-500" />
        ) : (
          ""
        )}
      </button>
    </div>
  );
});

export default TaskForm;
