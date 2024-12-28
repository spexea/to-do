import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./dots_animation.css";
import { SvgCheckIcon } from "../SvgComponents/Svg";

interface CreateTagFormProps {
  fetchTags: Function;
}

const CreateTagForm = forwardRef<{}, CreateTagFormProps>(
  ({ fetchTags }, ref) => {
    const [newTag, setNewTag] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const createTag = async () => {
      if (!newTag.trim()) {
        return;
      }

      setError(null);
      setIsSuccess(false);
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const response = await fetch("/api/tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newTag }),
        });

        if (!response.ok) {
          throw new Error("Failed to create tag");
        }

        setNewTag("");
        setIsSuccess(true);
        fetchTags();

        setTimeout(() => setIsSuccess(false), 2000);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      createTag,
    }));

    return (
      <div className="w-full max-w-screen-md mx-auto p-6 bg-base-100 rounded-lg">
        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="New Tag"
          className="input input-bordered w-full mb-4 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-lg"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          aria-label="Tag Name"
          disabled={isLoading}
        />

        <button
          ref={buttonRef}
          className={`w-full py-3 px-6 sm:px-8 lg:px-10 rounded-lg font-semibold text-lg flex justify-center items-center ${
            isLoading
              ? "cursor-wait opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } transition-opacity duration-300`}
          onClick={createTag}
          disabled={isLoading || !newTag.trim()}
          aria-label="Create Tag"
        >
          {isLoading ? (
            <div className="flex gap-2 animate-pulse">
              <span
                className="dot text-black font-bold text-xl"
                style={{ animationDelay: "0s" }}
              >
                .
              </span>
              <span
                className="dot text-black font-bold text-xl"
                style={{ animationDelay: "0.2s" }}
              >
                .
              </span>
              <span
                className="dot text-black font-bold text-xl"
                style={{ animationDelay: "0.4s" }}
              >
                .
              </span>
            </div>
          ) : isSuccess ? (
            <SvgCheckIcon />
          ) : (
            ""
          )}
        </button>
      </div>
    );
  }
);

export default CreateTagForm;
