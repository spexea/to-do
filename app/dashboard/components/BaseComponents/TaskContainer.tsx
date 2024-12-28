import React from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  tag: string;
}

interface TasksContainerProps {
  tasks: any[];
  onDelete: (id: number) => void;
  selectedTag: string;
}

const TasksContainer: React.FC<TasksContainerProps> = ({
  tasks,
  onDelete,
  selectedTag,
}) => (
  <div className="p-6 sm:p-8 md:p-10 lg:p-12">
    <div
      className="flex flex-col gap-8 md:gap-12"
      role="region"
      aria-labelledby="task-list-header"
    >
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-300">
        <h2
          id="task-list-header"
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-gray-800"
        >
          Tasks
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all ease-in-out duration-300 w-full sm:w-72 md:w-80 lg:w-96"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => onDelete(task.id)}
                    className="btn btn-error bg-red-500 text-white rounded-lg py-2 px-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-500">
              No tasks available.
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default TasksContainer;
