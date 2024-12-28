import React from "react";
import CardGrid from "./CardComponent/CardRender";

interface Tag {
  id: number;
  name: string;
}

type Task = {
  id: number;
  title: string;
  description: string;
  tags: Tag[];
};

interface CardsListProps {
  filteredTasks: Task[];
  onDelete: (id: number) => void;
}

const CardsList: React.FC<CardsListProps> = ({ filteredTasks, onDelete }) => {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-base-100 p-6 md:p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Tasks
      </h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <CardGrid
              key={task.id}
              cards={[
                {
                  title: task.title,
                  description: task.description,
                  onDelete: () => onDelete(task.id),
                },
              ]}
            />
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">
            No tasks available.
          </p>
        )}
      </div>
    </div>
  );
};

export default CardsList;
