import React, { useState, useEffect } from "react";
import adminService from "../../../services/admin";

import { Container, Sheet, Title, Form, Button } from "./styles";

import Navigation from "../../../components/Navigation";
import Context from "../../../components/Context";
import Notification from "../../../components/Notification";
import { ButtonSpinner } from "../../../components/Spinner";
import Input from "../../../components/Input";

import { validate } from "../../../validators";

import {
  FaUserGraduate,
  FaUniversity,
  FaUserShield,
  FaUserTie,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useAuth } from "../../../hooks";

function EditCourse({
  match: {
    params: { course },
  },
  history,
}) {
  const initialState = {
    name: {
      id: "name",
      type: "text",
      label: "Nome",
      value: "",
      validation: { required: true, name: true },
      valid: false,
      error: false,
      info: "",
    },
    initials: {
      id: "initials",
      type: "text",
      label: "Sigla",
      value: "",
      validation: { required: true, max: 3 },
      valid: false,
      error: false,
      info: "",
    },
  };
  const { logout } = useAuth();
  const [editValid, setEditValid] = useState(false);
  const [removeValid, setRemoveValid] = useState(false);
  const [edited, setEdited] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [editCourseForm, setEditCourseForm] = useState(initialState);
  const [removeCourseForm, setRemoveCourseForm] = useState({
    code: {
      id: "code",
      type: "text",
      label: "Código do curso",
      value: "",
      validation: { match: course },
      valid: false,
      error: false,
      info: (
        <div>
          Escreva <strong>{course}</strong> para confirmar que quer remover este
          curso
        </div>
      ),
    },
  });

  useEffect(() => {
    let isCancelled = false;
    async function getCourse() {
      const [response, status] = await adminService.getCourseByCode(course);
      if (!isCancelled) {
        if (status !== 200) {
          return history.push("/courses/list");
        }
        Object.keys(response).map((key) =>
          setEditCourseForm((prevState) => {
            if (key in prevState)
              return {
                ...prevState,
                [key]: { ...prevState[key], value: response[key] },
              };
            return prevState;
          })
        );
      }
    }
    getCourse();
    return () => (isCancelled = true);
  }, [course, history]);

  function handleEditInputs(target, inputKey) {
    const [valid, info] = validate(
      target.value,
      editCourseForm[inputKey].validation
    );
    const updatedForm = {
      ...editCourseForm,
      [inputKey]: {
        ...editCourseForm[inputKey],
        value: target.value,
        valid,
        error: !valid,
        info,
      },
    };
    setEditCourseForm(updatedForm);
    let validForm = true;
    for (let key in updatedForm) {
      validForm = updatedForm[key].valid && validForm;
    }
    setEditValid(validForm);
  }

  function handleRemoveInput(target) {
    const [valid] = validate(target.value, removeCourseForm.code.validation);
    const updatedForm = {
      ...removeCourseForm,
      code: {
        ...removeCourseForm.code,
        value: target.value,
        valid,
        error: !valid,
      },
    };
    setRemoveCourseForm(updatedForm);
    setRemoveValid(updatedForm.code.valid);
  }

  async function handleEditSubmission(event) {
    event.preventDefault();
    if (!editValid) return;
    setLoadingEdit(true);
    const courseData = {};
    Object.keys(editCourseForm).map(
      (key) => (courseData[key] = editCourseForm[key].value)
    );
    const [response, status] = await adminService.editCourse(
      courseData,
      course
    );
    const error = {};

    switch (status) {
      case 409:
        error.key = "code";
        error.msg = "Já existe um curso com este código.";
        break;

      case 400:
        const field = response.validation.keys[0].split(".").pop();
        const [, msg] = validate(field, { [field]: true });
        error.key = field;
        error.msg = msg;
        break;
      case 401:
        logout();
        break;
      default:
        break;
    }
    if (Object.keys(error).length > 0) {
      setEditCourseForm({
        ...editCourseForm,
        [error.key]: {
          ...editCourseForm[error.key],
          error: true,
          valid: false,
          info: error.msg,
        },
      });
      setEditValid(false);
    } else {
      setEdited(true);
      setTimeout(() => setEdited(false), 2000);
    }
    setLoadingEdit(false);
  }

  async function handleRemoveSubmission(event) {
    event.preventDefault();
    if (!removeValid) return;
    setLoadingRemove(true);
    const [, status] = await adminService.removeCourse(course);
    if (status !== 204) logout();
    setLoadingEdit(false);
    history.push("/courses/list");
  }

  return (
    <>
      <Navigation
        items={[
          { icon: <FaUserGraduate />, name: "Alunos", path: "/students" },
          { icon: <FaUserTie />, name: "Professores", path: "/professors" },
          { icon: <FaUserShield />, name: "Admins", path: "/admins" },
          { icon: <FaUniversity />, name: "Cursos", path: "/courses" },
        ]}
      />
      <Context
        path={[
          { tier: "courses", title: "cursos" },
          {
            tier: `courses/${course}/edit`,
            title: `editar ${editCourseForm.initials.value}`,
          },
        ]}
      />
      <Container>
        <Sheet>
          <Title>
            <FaEdit />
            <span>{editCourseForm.initials.value}</span>
          </Title>
          <Form autoComplete="off" onSubmit={handleEditSubmission}>
            {Object.keys(editCourseForm).map((key) => (
              <Input
                key={editCourseForm[key].id}
                id={editCourseForm[key].id}
                type={editCourseForm[key].type}
                label={editCourseForm[key].label}
                validation={editCourseForm[key].validation}
                error={editCourseForm[key].error}
                info={editCourseForm[key].info}
                value={editCourseForm[key].value}
                change={({ target }) =>
                  handleEditInputs(target, editCourseForm[key].id)
                }
              />
            ))}
            <Button disabled={!editValid}>
              {loadingEdit ? <ButtonSpinner /> : "Guardar"}
            </Button>
          </Form>
          <Title danger>
            <FaTrash />
            <span>Remover curso</span>
          </Title>
          <Form autoComplete="off" onSubmit={handleRemoveSubmission}>
            <Input
              key={removeCourseForm.code.id}
              id={removeCourseForm.code.id}
              type={removeCourseForm.code.type}
              label={removeCourseForm.code.label}
              validation={removeCourseForm.code.validation}
              value={removeCourseForm.code.value}
              error={removeCourseForm.code.error}
              info={removeCourseForm.code.info}
              change={({ target }) =>
                handleRemoveInput(target, removeCourseForm.code.id)
              }
              danger
            />
            <Button disabled={!removeValid} danger>
              {loadingRemove ? <ButtonSpinner /> : "Remover"}
            </Button>
          </Form>
        </Sheet>
      </Container>
      <Notification popup={edited} text={"Alterações guardadas."} />
    </>
  );
}

export default EditCourse;
