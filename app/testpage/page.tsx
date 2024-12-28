"use client";
import React, { useRef } from "react";
import TaskForm from "../dashboard/components/FormComponents/TaskForm";
//Page to test desing of certains components, not used in the final product.

export default function TestPage() {
  const taskFormRef = useRef(null);

  const fetchTasks = () => {
    console.log("Fetching tasks...");
  };

  const tags = [
    { id: 1, name: "Work" },
    { id: 2, name: "Personal" },
    { id: 3, name: "Urgent" },
  ];

  return (
    <div>
      <TaskForm ref={taskFormRef} fetchTasks={fetchTasks} tags={tags} />
    </div>
  );
}
