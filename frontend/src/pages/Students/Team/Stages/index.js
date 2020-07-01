import React, { useState, useCallback } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import {
  Container,
  ProjectTitle,
  Dropdown,
  InfoSection,
  Badge,
  BadgeLink,
  StageDescription,
  ArtifactsSection,
  SectionTitle,
  Artifacts,
  Artifact,
  LoadArtifact,
  EvaluationSection,
  Feedback,
  LoadingArtifcat,
} from "./styles";
import {
  FaAngleDown,
  FaClock,
  FaBalanceScaleRight,
  FaFilePdf,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaTimes,
  FaFileUpload,
  FaFileAlt,
  FaFileArchive,
  FaFileCsv,
  FaFileWord,
  FaFilePowerpoint,
  FaFileExcel,
} from "react-icons/fa";
import studentService from "../../../../services/student";

import { useAuth, useYear } from "../../../../hooks";

function Stages({
  stages,
  setStages,
  course,
  selectedStage,
  setSelectedStage,
  projectData,
}) {
  const { user } = useAuth();
  const { selectedYear } = useYear();

  const {
    params: { unit, project, team },
  } = useRouteMatch();
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const artifact = {
          id: "",
          submission_url: "",
          filename: file.name,
          username: "",
        };
        setLoadingFile({ state: true, file: artifact });
        const data = new FormData();
        data.append("file", file);
        data.append("team_number", team);
        data.append("submitted_at", new Date().toJSON());
        let status;
        let response = await studentService.get.submission(
          course,
          unit,
          selectedYear,
          project,
          stages[selectedStage].number,
          team
        );
        if (!response.artifacts) {
          [response, status] = await studentService.create.submission(
            course,
            unit,
            selectedYear,
            project,
            stages[selectedStage].number,
            data
          );
          if (status !== 201) return;
        } else {
          [response, status] = await studentService.update.submission(
            course,
            unit,
            selectedYear,
            project,
            stages[selectedStage].number,
            team,
            data
          );
          if (status !== 200) return;
        }
        const { submission_file } = response;
        artifact.id = submission_file.id;
        artifact.submission_url = submission_file.submission_url;
        artifact.filename = submission_file.original_filename;
        artifact.username = submission_file.uploaded_by;
        const updatedStages = {
          ...stages,
          [selectedStage]: {
            ...stages[selectedStage],
            artifacts: [...stages[selectedStage].artifacts, artifact],
          },
        };
        setLoadingFile({ state: false });
        setStages(updatedStages);
      }
    },
    [
      selectedStage,
      setStages,
      stages,
      course,
      project,
      team,
      unit,
      selectedYear,
    ]
  );
  const {
    getRootProps,
    getInputProps,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    onDrop,
    accept:
      "text/csv, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-powerpoint, text/plain, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/zip, application/x-7z-compressed, application/vnd.rar",
    maxSize: 20000000,
  });
  const [loadingFile, setLoadingFile] = useState({ state: false });
  const [loadingRemoveFile, setLoadingRemoveFile] = useState({ state: false });

  function handleChanceStage(event) {
    setSelectedStage(event.target.value);
  }

  async function handleRemoveFile({ id, username }) {
    if (username !== user.username) return;
    setLoadingRemoveFile({ state: true, id });
    const [, status] = await studentService.remove.submission(
      course,
      unit,
      selectedYear,
      project,
      stages[selectedStage].number,
      team,
      id
    );
    setLoadingRemoveFile({ state: false });
    if (status !== 204) return;
    const artifacts = stages[selectedStage].artifacts.filter(
      (artifact) => artifact.id !== id
    );
    const updatedStages = {
      ...stages,
      [selectedStage]: {
        ...stages[selectedStage],
        artifacts: artifacts,
      },
    };
    setStages(updatedStages);
  }

  function onDrag(isDragAccept, isDragReject) {
    if (isDragAccept) return <span>Solte o ficheiro aqui</span>;
    if (isDragReject) return <span>Ficheiro não suportado</span>;
    return <span>Carregar ficheiro</span>;
  }

  function fileIconsByType(type) {
    const icons = {
      csv: <FaFileCsv />,
      doc: <FaFileWord />,
      docx: <FaFileWord />,
      pdf: <FaFilePdf />,
      ppt: <FaFilePowerpoint />,
      pptx: <FaFilePowerpoint />,
      txt: <FaFileAlt />,
      xls: <FaFileExcel />,
      xlsx: <FaFileExcel />,
      zip: <FaFileArchive />,
      "7z": <FaFileArchive />,
      rar: <FaFileArchive />,
    };
    return icons[type] || <FaFileAlt />;
  }

  return (
    <Container>
      <ProjectTitle>{projectData.name}</ProjectTitle>
      <Dropdown>
        <span>
          <FaAngleDown />
        </span>
        <select onChange={handleChanceStage} value={selectedStage}>
          {Object.keys(stages).map((stage) => (
            <option value={stage} key={stage}>
              Etapa {stages[stage].number}
            </option>
          ))}
        </select>
      </Dropdown>
      <InfoSection>
        <Badge type="warning">
          <FaClock />
          {stages[selectedStage].due_date}
        </Badge>
        <Badge type="info">
          <FaBalanceScaleRight />
          {stages[selectedStage].weight}% do Projeto
        </Badge>
        <BadgeLink
          href={stages[selectedStage].assignment_url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <FaFilePdf />
          <span>
            Enunciado
            <FaExternalLinkAlt />
          </span>
        </BadgeLink>
        <StageDescription>
          <FaInfoCircle />
          <div>{stages[selectedStage].description}</div>
        </StageDescription>
      </InfoSection>
      <ArtifactsSection>
        <SectionTitle>Artefactos produzidos:</SectionTitle>
        <Artifacts>
          {stages[selectedStage].artifacts.map((artifact) => (
            <Artifact
              key={artifact.id}
              type={artifact.filename.split(".").pop()}
            >
              <a
                href={artifact.submission_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {fileIconsByType(artifact.filename.split(".").pop())}
              </a>
              {artifact.username === user.username && (
                <button
                  disabled={loadingRemoveFile.state}
                  onClick={() => {
                    handleRemoveFile(artifact);
                  }}
                >
                  {loadingRemoveFile.state &&
                  loadingRemoveFile.id === artifact.id ? (
                    <div></div>
                  ) : (
                    <FaTimes />
                  )}
                </button>
              )}

              <a
                href={artifact.submission_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {artifact.filename}
              </a>
            </Artifact>
          ))}
          {loadingFile.state ? (
            <LoadingArtifcat type={loadingFile.file.filename.split(".").pop()}>
              <div></div>
              <span>{loadingFile.file.filename}</span>
            </LoadingArtifcat>
          ) : (
            <LoadArtifact
              {...getRootProps()}
              isDragAccept={isDragAccept}
              isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              <div>
                <FaFileUpload />
              </div>
              {onDrag(isDragAccept, isDragReject)}
            </LoadArtifact>
          )}
        </Artifacts>
      </ArtifactsSection>
      <EvaluationSection>
        <SectionTitle>Avaliação e comentários:</SectionTitle>
        <Feedback>
          <div>{stages[selectedStage].feedback}</div>
          <span>{stages[selectedStage].grade}%</span>
        </Feedback>
      </EvaluationSection>
    </Container>
  );
}

export default Stages;
