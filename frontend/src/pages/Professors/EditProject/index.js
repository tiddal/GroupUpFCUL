import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Dropzone from "../../../components/Dropzone";
import moment from "moment";

import { useAuth, useYear } from "../../../hooks";
import professorService from "../../../services/professor";

import {
  Container,
  Sheet,
  Title,
  Form,
  AddStageButton,
  Button,
  DropzoneContainer,
  StageSection,
  StageTitle,
  Separator,
} from "./styles";

import Context from "../../../components/Context";
import Notification from "../../../components/Notification";
import Spinner, { ButtonSpinner } from "../../../components/Spinner";
import Input from "../../../components/Input";

import { validate } from "../../../validators";

import { FaProjectDiagram, FaArchive, FaMinusCircle } from "react-icons/fa";

function EditProject() {
  const initialStage = {
    inputs: [
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
      {
        id: "start_date",
        type: "datetime-local",
        label: "Data de início",
        value: "",
        validation: { required: true },
        valid: false,
        error: false,
        info: "",
      },
      {
        id: "end_date",
        type: "datetime-local",
        label: "Data de fim",
        value: "",
        validation: { required: true },
        valid: false,
        error: false,
        info: "",
      },
      {
        id: "weight",
        type: "text",
        label: "Peso (%)",
        value: "",
        validation: { required: true },
        valid: false,
        error: false,
        info: "",
      },
    ],
    number: 1,
    file: "",
    isNew: true,
  };

  const [unitData, setUnitData] = useState({
    course_code: 0,
    code: 0,
  });
  const { user } = useAuth();
  const { selectedYear } = useYear();
  const {
    params: { unit, project },
  } = useRouteMatch("/projects/:unit/:project/edit");
  const [initializng, setInitializing] = useState(true);
  const [formValidity, setFormValidity] = useState(true);
  const [edited, setEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectForm, setProjectForm] = useState();
  const [stagesForm, setStagesForm] = useState();
  const [stagesToDelete, setStagesToDelete] = useState([]);

  useEffect(() => {
    async function getInitialState() {
      const classes = await professorService.get.classes(
        user.username,
        selectedYear,
        2
      );
      const [unitData] = classes.filter(
        (class_) => class_.code.toString() === unit
      );
      setUnitData(unitData);
      const projectData = await professorService.get.project(
        unitData.course_code,
        unitData.code,
        selectedYear,
        project
      );
      const projectForm = [
        {
          id: "name",
          type: "text",
          label: "Nome do projeto",
          value: projectData.name,
          validation: { required: true, name: true },
          valid: true,
          error: false,
          info: "",
        },
        {
          id: "description",
          type: "textarea",
          label: "Descrição",
          value: projectData.description,
          validation: { required: false },
          valid: true,
          error: false,
          info: "",
        },
        {
          id: "objectives",
          type: "textarea",
          label: "Objetivos",
          value: projectData.objectives,
          validation: { required: true },
          valid: true,
          error: false,
          info: "",
        },
        {
          id: "min_students",
          type: "number",
          label: "Mínimo de alunos por grupo",
          value: projectData.min_students,
          validation: { required: true },
          valid: true,
          error: false,
          info: "",
        },
        {
          id: "max_students",
          type: "number",
          label: "Máximo de alunos por grupo",
          value: projectData.max_students,
          validation: { required: true },
          valid: true,
          error: false,
          info: "",
        },
      ];
      setProjectForm(projectForm);
      const stages = await professorService.get.stages(
        unitData.course_code,
        unitData.code,
        selectedYear,
        project
      );
      const stagesIndex = [];
      const stagesForm = stages.map((stage, index) => {
        stagesIndex.push(parseInt(stage.stage_number));
        return {
          inputs: [
            {
              id: "description",
              type: "textarea",
              label: "Descrição",
              value: stage.description,
              validation: { required: true },
              valid: true,
              error: false,
              info: "",
            },
            {
              id: "start_date",
              type: "datetime-local",
              label: "Data de início",
              value: moment(stage.start_date).format("YYYY-MM-DDTHH:mm"),
              validation: { required: true },
              valid: true,
              error: false,
              info: "",
            },
            {
              id: "end_date",
              type: "datetime-local",
              label: "Data de fim",
              value: moment(stage.end_date).format("YYYY-MM-DDTHH:mm"),
              validation: { required: true },
              valid: true,
              error: false,
              info: "",
            },
            {
              id: "weight",
              type: "text",
              label: "Peso (%)",
              value: stage.weight,
              validation: { required: true },
              valid: true,
              error: false,
              info: "",
            },
          ],
          number: index + 1,
          file: { name: stage.original_filename },
        };
      });
      setStagesForm(stagesForm);
      setInitializing(false);
    }
    getInitialState();
  }, [project, user, unit, selectedYear]);

  function evaluateForm(projectForm, stageForm) {
    let validForm = true;
    // Evaluate Project
    for (let key in projectForm) {
      validForm = projectForm[key].valid && validForm;
    }
    // Evaluate Stages
    stageForm.map((stage) => {
      for (let key in stage.inputs) {
        validForm = stage.inputs[key].valid && validForm;
      }
      validForm = stage.file && validForm;
      return stage;
    });
    return validForm;
  }

  function handleProjectInputs({ value }, index) {
    const [valid, info] = validate(value, projectForm[index].validation);
    const updatedForm = [...projectForm];
    updatedForm[index] = {
      ...projectForm[index],
      value,
      valid,
      error: !valid,
      info,
    };
    setProjectForm(updatedForm);
    setFormValidity(evaluateForm(updatedForm, stagesForm));
  }

  function handleStageInputs({ value }, stage_index, index) {
    const { inputs: stage_fields } = { ...stagesForm[stage_index] };
    const [valid, info] = validate(value, stage_fields[index].validation);
    const updatedForm = [...stagesForm];
    updatedForm[stage_index].inputs[index] = {
      ...updatedForm[stage_index].inputs[index],
      value,
      valid,
      error: !valid,
      info,
    };
    setStagesForm(updatedForm);
    setFormValidity(evaluateForm(projectForm, updatedForm));
  }

  async function handleSubmission(event) {
    event.preventDefault();

    if (!formValidity) return;
    setLoading(true);
    const projectData = {
      project: {},
    };
    projectForm.map((field) => (projectData.project[field.id] = field.value));
    const [, status] = await professorService.update.project(
      unitData.course_code,
      unitData.code,
      selectedYear,
      project,
      projectData
    );
    if (status !== 200) return;
    for (let deletedStage of stagesToDelete) {
      const [, status] = await professorService.remove.stage(
        unitData.course_code,
        unitData.code,
        selectedYear,
        project,
        deletedStage
      );
      if (status !== 204) return;
    }
    for (let stage of stagesForm) {
      if (stage.isNew) {
        const stageData = new FormData();
        stage.inputs.map((field) => stageData.append(field.id, field.value));
        stageData.append("file", stage.file);
        const [, status] = await professorService.create.stage(
          unitData.course_code,
          unitData.code,
          selectedYear,
          project,
          stageData
        );
        if (status !== 201) return;
      } else {
        const stageData = new FormData();
        if (stage.file.size) {
          stageData.append("file", stage.file);
        }
        stage.inputs.map((field) => stageData.append(field.id, field.value));
        stageData.append("stage_number", stage.number);
        const [, status] = await professorService.update.stage(
          unitData.course_code,
          unitData.code,
          selectedYear,
          project,
          stage.number,
          stageData
        );
        if (status !== 200) return;
      }
    }
    setLoading(false);
    setFormValidity(false);
    setEdited(true);
    setTimeout(() => setEdited(false), 2000);
  }

  function handleAddStage() {
    const updatedForm = [...stagesForm];
    updatedForm.push({ ...initialStage, number: updatedForm.length + 1 });
    setStagesForm(updatedForm);
    setFormValidity(evaluateForm(projectForm, updatedForm));
  }

  function removeStage(stage) {
    const removeFormStage = stagesForm.filter((s) => s.number !== stage.number);
    const updatedForm = removeFormStage.map((stage, index) => ({
      ...stage,
      number: index + 1,
    }));
    if (!stage.isNew) {
      setStagesToDelete([...stagesToDelete, stage.number]);
    }
    setStagesForm(updatedForm);
    setFormValidity(evaluateForm(projectForm, updatedForm));
  }

  function setStageFile(file, index) {
    const updatedForm = [...stagesForm];
    updatedForm[index].file = file;
    setStagesForm(updatedForm);
    setFormValidity(evaluateForm(projectForm, updatedForm));
  }

  return (
    <>
      {!initializng && (
        <Context
          path={[
            { tier: `projects/${unit}`, title: unitData.name },
            {
              tier: `projects/${unit}/${project}/edit`,
              title: `Editar Projeto ${project}`,
            },
          ]}
        />
      )}
      {initializng ? (
        <Spinner />
      ) : (
        <Container>
          <Sheet>
            <Title>
              <span>
                <FaProjectDiagram />
                Editar Projeto
              </span>
            </Title>
            <Form autoComplete="off" onSubmit={handleSubmission}>
              {projectForm.map((field, index) => (
                <Input
                  key={field.id}
                  id={field.id}
                  type={field.type}
                  label={field.label}
                  validation={field.validation}
                  error={field.error}
                  info={field.info}
                  value={field.value}
                  options={field.options}
                  change={({ target }) => handleProjectInputs(target, index)}
                />
              ))}

              <Separator>
                <div>
                  <span>Etapas</span>
                </div>
              </Separator>

              <StageSection>
                {stagesForm.map((stage, stage_index) => (
                  <React.Fragment key={stage.number}>
                    <StageTitle>
                      <span>
                        <FaArchive />
                        Etapa {stage.number} {stage.number === 1 && "*"}
                      </span>
                      {stage.number !== 1 && (
                        <button
                          type="button"
                          onClick={() => removeStage(stage)}
                        >
                          <FaMinusCircle />
                        </button>
                      )}
                    </StageTitle>

                    {stage.inputs.map((key, index) => (
                      <Input
                        key={key.id}
                        id={key.id}
                        type={key.type}
                        label={key.label}
                        validation={key.validation}
                        error={key.error}
                        info={key.info}
                        value={key.value}
                        options={key.options}
                        change={({ target }) =>
                          handleStageInputs(target, stage_index, index)
                        }
                      />
                    ))}

                    <DropzoneContainer>
                      <label>Enunciado: * </label>
                      <Dropzone
                        setFile={setStageFile}
                        file={stage.file}
                        mime="application/pdf"
                        supported="PDF"
                        index={stage_index}
                      />
                    </DropzoneContainer>
                  </React.Fragment>
                ))}

                <AddStageButton type="button" onClick={handleAddStage}>
                  Adicionar Etapa
                </AddStageButton>
              </StageSection>

              <Button type="submit" disabled={!formValidity}>
                {loading ? <ButtonSpinner /> : "Guardar Alterações"}
              </Button>
            </Form>
          </Sheet>
        </Container>
      )}

      <Notification popup={edited} text={"Projeto editado com sucesso."} />
    </>
  );
}

export default EditProject;
