import React from "react";

interface CardRenderProps {
  title: string;
  description: string;
  onDelete: () => void;
}

const CardRender: React.FC<CardRenderProps> = ({
  title,
  description,
  onDelete,
}) => {
  return (
    <div className="card bg-base-100 w-full sm:w-72 lg:w-96 shadow-xl rounded-lg overflow-hidden">
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-700">{description}</p>
        <div className="card-actions justify-end mt-4">
          <button
            onClick={onDelete}
            className="btn btn-error text-white hover:bg-red-600"
            aria-label={`Delete ${title}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const CardGrid: React.FC<{ cards: CardRenderProps[] }> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <CardRender
          key={card.title}
          title={card.title}
          description={card.description}
          onDelete={card.onDelete}
        />
      ))}
    </div>
  );
};

export default CardGrid;
