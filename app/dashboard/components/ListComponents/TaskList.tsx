import React from "react";
import CardsList from "./Cards";
interface Tag {
  id: number;
  name: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  tags: Tag[];
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: number) => void;
  selectedTag: string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  selectedTag,
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (selectedTag === "all") {
      return true;
    }
    return task.tags.some(
      (tag) => tag.name.toLowerCase() === selectedTag.toLowerCase()
    );
  });

  return (
    <div className="w-full max-w-screen-lg mx-auto bg-base-100 p-6 md:p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardsList filteredTasks={filteredTasks} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default TaskList;
