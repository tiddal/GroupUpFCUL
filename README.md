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

9. Correr o comando: `npm install` ou simplesmente `npm i` para instalar as dependencias deste projeto.

10. Por fim, correr o comando: `npm run dev` e rezar para que não dê nenhum erro.

11. No postman (ou num browser) e vejam o que acontece quando acedem a route "/users" e "users/(id)":

    - http://localhost:(porto)/users
    - http://localhost:(porto)/users/(id)

12. Mandem-me os vossos githubs para vos adicionar como membros para mudar isto para privado.

13. Olhem para o código, é um projeto muito simples mas tem praticamente todas as bases para criar a nossa API! Não sei quão à vontade estão com JavaScript mas consigo explicar tudo o que fiz, é só perguntarem 😃

**Nota:** Há grandes probabilidades de se depararem com problemas... Eu fiz todos esses passos (ou quase) em linux e tive alguns problemas principalmente com o MySQL. Para Windows espero que seja mais fácil... Se tiverem dúvidas: **Discord**
