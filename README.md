# PTI - Back-end

## Preparar o workspace

Para criar um ambiente local para o desenvolvimento, enquanto não temos uma base de dados de testes no servidor da AWS vamos usar localhost para criar a API. Instalar e configurar o MySQL é um bocado chato 🙄 mas é preciso:

1. Instalar o MySQL, acho que basta o MySQL Workbench e o MySQL Community Server:

   - https://dev.mysql.com/downloads/mysql/
   - https://youtu.be/WuBcTJnIuzo (Windows)

2. Recomendo criar um utilizador mas também podem deixar o root.

3. Criar uma base de dados com o nome que quiserem e uma tabela chamada "users" para funcionar com este exemplo. Nessa tabela definam uma coluna "id" e se quiserem definir mais colunas estão à vontade. Criem pelo menos uma entrada na tabela.

4. Instalar o node.js:

   - https://nodejs.org/en/ (v12.16.1 LTS)

5. Fazer clone deste repositório.

   - https://git-scm.com/ (caso não tenham o git instalado 😅)

6. Criar o ficheiro ".env" para armazenar as variáveis de ambiente. Este ficheiro não está no repositório porque cada um de nós tem as suas. Se repararem é ignorado no ".gitignore".

7. No ficheiro ".env" é preciso definir, sem aspas, sem parênteses, apenas o valor à frente do sinal de igual:

   - PORT=(o porto para correr o servidor, muito vulgar usar o 3000)
   - DB_USER=(o utilizador que criaram quando instalaram o MySQL, ou root)
   - DB_PASSWORD=(a password respetiva)
   - DB_PORT=(o porto em que a base de dados está a correr)
   - DB_HOST=localhost (este é localhost, igual para todos, vamos mudar quando tivermos a base de dados na AWS)
   - DB_NAME=(o nome que deram à base de dados)

8. Instalar o Postman (para este exemplo podem usar um browser normal porque os unícos requests que estão implementados usam o método GET mas usando o postman veem já a sua utilidade).

9. Correr o comando: `npm ci` para instalar as dependencias deste projeto.

10. Por fim, correr o comando: `npm run dev` e rezar para que não dê nenhum erro.

11. No postman (ou num browser) e vejam o que acontece quando acedem a route "/users" e "users/(id)":

    - http://localhost:(porto)/users
    - http://localhost:(porto)/users/(id)

12. Mandem-me os vossos githubs para vos adicionar como membros para mudar isto para privado.

13. Olhem para o código, é um projeto muito simples mas tem praticamente todas as bases para criar a nossa API! Não sei quão à vontade estão com JavaScript mas consigo explicar tudo o que fiz, é só perguntarem 😃

**Nota:** Há grandes probabilidades de se depararem com problemas... Eu fiz todos esses passos (ou quase) em linux e tive alguns problemas principalmente com o MySQL. Para Windows espero que seja mais fácil... Se tiverem dúvidas: **Discord**

---

## Adicionar um ORM (Sequelize)

Adicionei ao projeto o [Sequelize](https://sequelize.org/v5/). Vai ajudar-nos a estruturar melhor o código através da definição de Models para as tabelas da nossa base de dados. Para além disso, o Sequelize utiliza Migrations que é uma forma de fazer um controlo de versões da BD (como o git faz para o código). Partindo do principio que o workspace está preparado basta:

1. Fazer push do repositório para atualizá-lo.
2. Correr o comando `npm ci`
3. Mudar o nome da base de dados no ficheiro .env ou apagar a existente
4. Correr o comando `npx sequelize db:create`
5. Correr o comando `npx sequelize db:migrate`
6. Finalmente, para testar: `npm run dev`:
   - Criem um user usando um post request em que o body é por exemplo `{"name": "test"}` para http://localhost:(porto)/users
   - Para listar todos os users: http://localhost:(porto)/users
   - Para listar um user: http://localhost:(porto)/users/(id)

**Nota:** Encontrei uma alternativa ao Postman que estou a gostar mais: https://insomnia.rest/

---

**Videos em que me baseei:**

- [MySQL Node Express API - Walkthrough](https://youtu.be/LVfH5FDOa3o)
- [SQL no Node.js com Sequelize | Masterclass #01](https://youtu.be/Fbu7z5dXcRs)

---

## Funcionamento da API #1

### Routes

| Method | Path                   | Result                     |
| :----- | :--------------------- | :------------------------- |
| GET    | /users                 | Gets all users             |
| GET    | /users/{id}            | Gets a user by his id      |
| POST   | /users                 | Creates a user             |
| PUT    | /users/{id}            | Updates a user             |
| DELETE | /users/{id}            | Deletes a user             |
| GET    | /users/students        | Gets all students          |
| GET    | /users/students/{id}   | Gets a student by his id   |
| GET    | /users/professors      | Gets all professors        |
| GET    | /users/professors/{id} | Gets a professor by his id |
| GET    | /users/admins          | Gets all admins            |
| GET    | /users/admins/{id}     | Gets an admin by his id    |

### POST e PUT requests

Atualmente a API é capaz de criar utilizadores através do envio de dados no "body" do request e também através do envio de ficheiros do tipo JSON. Para isso, os ficheiros ou o "body" devem respeitar a seguinte estrutra:

```JSON
{
   "users": [
      {
         "number": "fc12345",
         "firstName": "Exemplo",
         "lastName": "Aluno",
         "email": "fc12345@alunos.fc.ul.pt",
         "password": "test",
         "role": {
            "type": "student",
            "data": {}
          }
      },
      {
         "number": "fc00000",
         "firstName": "Exemplo",
         "lastName": "Professor",
         "email": "fc00000@alunos.fc.ul.pt",
         "password": "test",
         "role": {
            "type": "professor",
            "data": {
               "department" : "DI",
               "room" : "6.3.99"
            }
         }
      }
   ]
}
```

Dentro do campo "data" devem estar os atributos que dizem respeito apenas à respetiva "role". Como atualmente na base de dados os alunos e os admins não têm nenhum atributo exclusivo, o campo "data" para essas "roles" tem de estar vazio.

O campo "type" não faz parte da base de dados mas serve para identificar que tipo de utilizador está a ser registado para preencher as respetivas tabelas. Pode ter os valores `student`, `professor` ou `admin`.

### Base de Dados

#### Users

| Coluna    |  Tipo  |      Restrições      |
| :-------- | :----: | :------------------: |
| number    | string | **not null, unique** |
| firstName | string |     **not null**     |
| lastName  | string |     **not null**     |
| email     | string | **not null, unique** |
| password  | string |     **not null**     |
| status    | string |          -           |
| avatarURL | string |          -           |

#### Students

| Coluna |  Tipo   |  Restrições  |
| :----- | :-----: | :----------: |
| userId | integer | **not null** |

#### Professors

| Coluna     |  Tipo   |  Restrições  |
| :--------- | :-----: | :----------: |
| userId     | integer | **not null** |
| department | string  | **not null** |
| room       | string  |      -       |

#### Admins

| Coluna |  Tipo   |  Restrições  |
| :----- | :-----: | :----------: |
| userId | integer | **not null** |
