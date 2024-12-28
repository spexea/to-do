import React from "react";
import { Modal } from "./Imports";

interface ModalsContainerProps {
  taskForm: React.ReactNode;
  createTagForm: React.ReactNode;
  onTriggerCreateTask: () => void;
  onTriggerCreateTag: () => void;
}

const ModalsContainer: React.FC<ModalsContainerProps> = ({
  taskForm,
  createTagForm,
  onTriggerCreateTask,
  onTriggerCreateTag,
}) => (
  <>
    <Modal
      openText="Create New Task"
      modalTitle="Create New Task"
      closeText="Close"
      saveText="Create"
      onSave={onTriggerCreateTask}
    >
      {taskForm}
    </Modal>
    <Modal
      openText="Create Tag"
      modalTitle="Create Tag"
      closeText="Close"
      saveText="Create"
      onSave={onTriggerCreateTag}
    >
      {createTagForm}
    </Modal>
  </>
);

export default ModalsContainer;
