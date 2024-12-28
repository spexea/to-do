import React, { useState, useEffect, useRef } from "react";
import {
  TaskForm,
  Modal,
  CreateTagForm,
  TaskList,
  Search,
  Dropdown,
} from "./Imports";
import Navbar from "./navbar";
import ErrorAlert from "./ErrorAlert";
import LoadingSpinner from "./LoadingSpinner";
import TasksContainer from "./TaskContainer";
import ModalsContainer from "./ModalContainer";
import "../BaseComponents/dashboard.css";

interface Task {
  id: number;
  title: string;
  description: string;
  tags: Tag[];
}

interface Tag {
  id: number;
  name: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false);

  const taskFormRef = useRef<{
    createTaskButton?: { click: () => void };
  } | null>(null);
  const createTagFormRef = useRef<{ createTag: () => void } | null>(null);

  useEffect(() => {
    fetchTasks();
    fetchTags();
  }, []);

  useEffect(() => {
    filterTasksByTag();
  }, [selectedTag, tasks]);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) throw new Error("Error fetching tasks.");
      const data = await response.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (err) {
      setError((err as Error).message || "Unknown error.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsDelayed(true);
      }, 2000);
    }
  };

  const fetchTags = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/tags");
      if (!response.ok) throw new Error("Error fetching tags.");
      const data = await response.json();
      setTags(data);
    } catch (err) {
      setError((err as Error).message || "Unknown error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchResults = (results: Task[]) => setFilteredTasks(results);

  const filterTasksByTag = () => {
    setFilteredTasks(
      selectedTag === "all"
        ? tasks
        : tasks.filter((task) =>
            task.tags.some((tag) => tag.name === selectedTag)
          )
    );
  };

  const handleCreateTagFromModal = () => createTagFormRef.current?.createTag();
  const triggerCreateTask = () =>
    taskFormRef.current?.createTaskButton?.click();

  return (
    <div className="bg-base-200 min-h-screen font-sans">
      <Navbar
        title="Task Manager Dashboard"
        searchComponent={<Search OnResults={handleSearchResults} />}
        dropdownComponent={
          <Dropdown
            tags={tags}
            onSelect={setSelectedTag}
            selectedTag={selectedTag}
          />
        }
      />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-6">
        {error && <ErrorAlert message={error} />}

        <div className="rounded-lg bg-white shadow-md p-6 space-y-6">
          {isLoading || !isDelayed ? (
            <div className="flex justify-center mt-16">
              <LoadingSpinner aria-label="Cargando tareas..." />
            </div>
          ) : (
            <TasksContainer
              tasks={filteredTasks}
              onDelete={fetchTasks}
              selectedTag={selectedTag}
            />
          )}
        </div>

        <ModalsContainer
          taskForm={
            <TaskForm ref={taskFormRef} fetchTasks={fetchTasks} tags={tags} />
          }
          createTagForm={
            <CreateTagForm ref={createTagFormRef} fetchTags={fetchTags} />
          }
          onTriggerCreateTask={triggerCreateTask}
          onTriggerCreateTag={handleCreateTagFromModal}
        />
      </div>
    </div>
  );
};

export default Dashboard;
