import React, { useState } from "react";

import {
  Container,
  ProgressSection,
  ProgressTitle,
  MainButton,
  TaskCard,
  TaskTitle,
  TagsSection,
  Tag,
  Button,
  ProgressBar,
  NewTaskTitle,
  NewTaskCard,
} from "./styles";

import {
  FaClipboardCheck,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheckCircle,
  FaChartLine,
  FaHammer,
  FaClipboardList,
  FaSave,
  FaTimesCircle,
} from "react-icons/fa";

import Input from "../../../../components/Input";
import studentService from "../../../../services/student";
import { ButtonSpinner } from "../../../../components/Spinner";
import { validate } from "../../../../validators";
import { useEffect } from "react";
import { useYear } from "../../../../hooks";

function Tasks({ course, unit, project, team, user, tasksData, setTasksData }) {
  const [editMode, setEditMode] = useState({ status: false });
  const [tasks, setTasks] = useState(tasksData);
  const { selectedYear } = useYear();
  const [newTaskMode, setNewTaskMode] = useState();
  const [newTaskValidity, setNewTaskValidity] = useState(false);
  const [newTask, setNewTask] = useState([
    {
      id: "title",
      type: "text",
      label: "Título",
      value: "",
      validation: { required: true },
      valid: false,
      error: false,
      info: "",
    },
    {
      id: "description",
      type: "textarea",
      label: "Descrição",
      value: "",
      validation: { required: true },
      valid: false,
      error: false,
      info: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (tasks.length === 0) return setProgress(0);
    const tasksDone = tasks.filter((task) => task.performed_by !== null);
    setProgress((tasksDone.length / tasks.length) * 100);
  }, [tasks]);

  function renderNewMeeting() {
    return (
      <NewTaskCard>
        <NewTaskTitle>
          <FaClipboardList />
          <span>Nova tarefa</span>
          <div>
            <button onClick={() => setNewTaskMode(false)}>
              <FaTimesCircle />
            </button>
          </div>
        </NewTaskTitle>
        <form onSubmit={handleNewTask} autoComplete="off">
          {newTask.map((field, index) => (
            <Input
              key={field.id}
              id={field.id}
              type={field.type}
              label={field.label}
              change={({ target }) => handleNewTaskInputs(target, index)}
              validation={{ required: true }}
            />
          ))}

          <Button type="submit" disabled={!newTaskValidity}>
            {loading ? <ButtonSpinner /> : "Adicionar"}
          </Button>
        </form>
      </NewTaskCard>
    );
  }

  async function handleEditTask(task_number) {
    if (editMode.status === false) {
      setEditMode({ status: true, task: task_number });
    } else {
      const edited_task = tasks.find((task) => task.number === task_number);
      const taskData = {};
      edited_task.inputs.map((task) => (taskData[task.id] = task.value));
      taskData.title = edited_task.title;
      taskData.unset = true;

      const [, status] = await studentService.update.task(
        course,
        unit,
        selectedYear,
        project,
        team,
        task_number,
        { task: taskData }
      );
      if (status !== 200) return;
      setEditMode({ status: false });
    }
  }

  function evaluateForm(taskForm) {
    let validForm = true;
    for (let key in taskForm) {
      validForm = taskForm[key].valid && validForm;
    }
    return validForm;
  }

  function handleNewTaskInputs({ value }, index) {
    const [valid, info] = validate(value, newTask[index].validation);
    const updatedForm = [...newTask];
    updatedForm[index] = {
      ...newTask[index],
      value,
      valid,
      error: !valid,
      info,
    };
    setNewTask(updatedForm);
    setNewTaskValidity(evaluateForm(updatedForm));
  }

  async function handleNewTask(event) {
    event.preventDefault();
    if (!newTaskValidity) return;
    setLoading(true);
    const taskData = {};
    newTask.map((field) => (taskData[field.id] = field.value));
    const [response, status] = await studentService.create.task(
      course,
      unit,
      selectedYear,
      project,
      team,
      { task: taskData }
    );
    if (status !== 201) return;
    const updatedTasks = [
      ...tasks,
      {
        number: parseInt(response.task_number),
        title: response.title,
        performed_by: null,
        inputs: [
          {
            id: "description",
            type: "textarea",
            label: "Descrição",
            value: response.description,
            validation: { required: false },
            valid: false,
            error: false,
            info: "",
          },
          {
            id: "time",
            type: "text",
            label: "Tempo dedicado (h)",
            value: response.time,
            validation: { required: false },
            valid: false,
            error: false,
            info: "",
          },
        ],
      },
    ];
    setLoading(false);
    setNewTaskMode(false);
    setNewTaskValidity(false);
    setTasks(updatedTasks);
    setTasksData(updatedTasks);
  }

  async function handleRemoveTask(task_number) {
    const [, status] = await studentService.remove.task(
      course,
      unit,
      selectedYear,
      project,
      team,
      task_number
    );
    if (status !== 204) return;
    const updatedTasks = tasks.filter((task) => task.number !== task_number);
    setTasks(updatedTasks);
    setTasksData(updatedTasks);
  }

  function handleTaskInput({ value }, task_index, index) {
    const { inputs: task_fields } = { ...tasks[task_index] };
    const [valid, info] = validate(value, task_fields[index].validation);
    const updatedForm = [...tasks];
    updatedForm[task_index].inputs[index] = {
      ...updatedForm[task_index].inputs[index],
      value,
      valid,
      error: !valid,
      info,
    };
    setTasks(updatedForm);
  }

  function handleTaskTitle({ value }, index) {
    const updatedTask = [...tasks];
    updatedTask[index].title = value;
    setTasks(updatedTask);
  }

  async function handleConclusion(event, index) {
    event.preventDefault();
    setLoading(true);
    const updatedTasks = [...tasks];
    if (tasks[index].performed_by) {
      const [, status] = await studentService.update.task(
        course,
        unit,
        selectedYear,
        project,
        team,
        tasks[index].number,
        { task: { unset: true } }
      );
      if (status !== 200) return;
      updatedTasks[index].performed_by = null;
    } else {
      const [, status] = await studentService.update.task(
        course,
        unit,
        selectedYear,
        project,
        team,
        tasks[index].number,
        { task: { unset: false } }
      );
      if (status !== 200) return;
      updatedTasks[index].performed_by = `${
        user.first_name
      } ${user.last_name.split(" ").pop()}`;
    }
    setLoading(false);
    setTasks(updatedTasks);
    setTasksData(updatedTasks);
  }

  return (
    <Container>
      <ProgressSection>
        <ProgressTitle>
          <FaChartLine />
          <span>Progresso</span>
        </ProgressTitle>
        <ProgressBar
          progress={`${progress}%`}
          type={progress === 100 ? "success" : "warning"}
        >
          <div>
            <div></div>
          </div>
          <span>
            <strong>{Math.ceil((progress / 100) * tasks.length)}</strong> de{" "}
            <strong>{tasks.length}</strong> tarefas concluídas
          </span>
        </ProgressBar>
      </ProgressSection>
      {!newTaskMode && (
        <MainButton
          onClick={() => {
            setNewTaskMode(true);
          }}
        >
          <FaPlus />
          Nova Tarefa
        </MainButton>
      )}

      {newTaskMode && renderNewMeeting()}
      {tasks.map((task, task_index) => (
        <TaskCard key={task.number}>
          <TaskTitle type={task.performed_by && "success"}>
            {task.performed_by ? <FaClipboardCheck /> : <FaClipboardList />}
            <span>#{task.number}</span>
            <input
              type="text"
              value={task.title}
              onChange={({ target }) => {
                handleTaskTitle(target, task_index);
              }}
              disabled={editMode.task !== task.number}
            />
            <div>
              {!task.performed_by && (
                <>
                  <button
                    type="button"
                    onClick={() => handleEditTask(task.number)}
                  >
                    {editMode.status && editMode.task === task.number ? (
                      <FaSave />
                    ) : (
                      <FaEdit />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveTask(task.number)}
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </TaskTitle>
          <TagsSection>
            <Tag type={task.performed_by ? "success" : "warning"}>
              {task.performed_by ? (
                <>
                  <FaCheckCircle /> Concluída por {task.performed_by}
                </>
              ) : (
                <>
                  <FaHammer />A trabalhar
                </>
              )}
            </Tag>
          </TagsSection>
          <form onSubmit={(event) => handleConclusion(event, task_index)}>
            {task.inputs.map((key, index) => (
              <Input
                key={key.id}
                id={key.id}
                type={key.type}
                label={key.label}
                change={({ target }) =>
                  handleTaskInput(target, task_index, index)
                }
                validation={key.validation}
                value={key.value}
                disabled={editMode.task !== task.number}
              />
            ))}
            {task.performed_by ? (
              <Button type="submit">
                {loading ? <ButtonSpinner /> : "Reabrir"}
              </Button>
            ) : (
              <Button type="submit" disabled={editMode.task === task.number}>
                {loading ? <ButtonSpinner /> : "Concluír"}
              </Button>
            )}
          </form>
        </TaskCard>
      ))}
    </Container>
  );
}

export default Tasks;
