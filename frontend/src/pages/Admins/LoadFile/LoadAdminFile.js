import React, { useState } from "react";
import adminService from "../../../services/admin";

import {
  Container,
  Sheet,
  Title,
  UploadSection,
  NotificationSection,
  InfoSection,
} from "./styles";
import Context from "../../../components/Context";
import Dropzone from "../../../components/Dropzone";
import { Submit } from "../../../components/Button";
import { ButtonSpinner } from "../../../components/Spinner";

import {
  FaFileUpload,
  FaUpload,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function LoadAdminFile() {
  const json = {
    users: [
      {
        username: "admin",
        first_name: "Admin",
        last_name: "Example",
        email: "admin@example.com",
        password: "password",
        role: {
          type: "admin",
          data: {
            previleges: 1,
          },
        },
      },
    ],
  };

  const [adminFile, setAdminFile] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState({
    msg: "",
    createdUsers: [],
    type: "",
  });

  async function handleUpload(event) {
    event.preventDefault();
    setLoading(true);
    const [response, status] = await adminService.loadFile.users(adminFile);
    const createdUsers = [];
    let msg = "";
    let type = "error";

    switch (status) {
      case 409:
        Object.keys(response.created).map((key) =>
          createdUsers.push(...response.created[key])
        );
        if (response.error.key === "email") {
          msg = `O email ${response.error.instance} já se encontra registado. ${
            createdUsers.length
          } utilizador${createdUsers.length !== 1 ? "es criados" : " criado"}${
            createdUsers.length ? ":" : "."
          }`;
          break;
        }
        msg = `O utilizador ${
          response.error.instance
        } já se encontra registado. ${createdUsers.length} utilizador${
          createdUsers.length !== 1 ? "es criados" : " criado"
        }${createdUsers.length ? ":" : "."}`;
        break;
      case 400:
        msg =
          "Garanta que todos os campos referidos abaixo estão presentes e são válidos. 0 utilizadores criados.";
        break;
      case 0:
        msg = response;
        break;
      default:
        Object.keys(response).map((key) => createdUsers.push(...response[key]));
        msg = `Sucesso! ${createdUsers.length} utilizador${
          createdUsers.length > 1 ? "es criados" : " criado"
        }:`;
        type = "success";
        break;
    }
    setUploadMessage({ msg, createdUsers, type });
    setLoading(false);
    setAdminFile();
  }

  return (
    <>
      <Context
        path={[
          { tier: "admins", title: "admins" },
          { tier: "admins/file", title: "carregar ficheiro" },
        ]}
      />
      <Container>
        <Sheet>
          <Title>
            <FaFileUpload />
            <span>Carregar Ficheiro</span>
          </Title>
          <UploadSection onSubmit={handleUpload}>
            <Dropzone
              setFile={setAdminFile}
              file={adminFile}
              mime="application/json"
              supported="JSON"
            />
            <Submit disabled={!adminFile}>
              {loading ? (
                <ButtonSpinner />
              ) : (
                <>
                  <span>Carregar</span>
                  <FaUpload />
                </>
              )}
            </Submit>
          </UploadSection>
          {uploadMessage.msg && (
            <NotificationSection type={uploadMessage.type}>
              <span>
                {uploadMessage.type !== "error" ? (
                  <FaCheckCircle />
                ) : (
                  <FaTimesCircle />
                )}
              </span>
              <div>
                <p>{uploadMessage.msg}</p>
                {uploadMessage.createdUsers.length > 0 && (
                  <ul>
                    {uploadMessage.createdUsers.map((user) => (
                      <li key={user.username}>{user.username}</li>
                    ))}
                  </ul>
                )}
              </div>
            </NotificationSection>
          )}

          <InfoSection>
            <span>
              <FaInfoCircle />
            </span>

            <div>
              Para evitar problemas no processamento do ficheiro garanta que os
              seguintes campos estão presentes em todos os administradores que
              pretende registar:
              <ul>
                <li> - Número de administrador</li>
                <li> - Nome próprio</li>
                <li> - Apelido</li>
                <li> - Email</li>
                <li> - Password</li>
                <li>- Tipo de utilizador (aluno, admin ou professor)</li>
              </ul>
              <br></br>
              Exemplo:
              <br></br>
              <br></br>
              <pre>
                <code>{JSON.stringify(json, null, 2)}</code>
              </pre>
            </div>
          </InfoSection>
        </Sheet>
      </Container>
    </>
  );
}

export default LoadAdminFile;
