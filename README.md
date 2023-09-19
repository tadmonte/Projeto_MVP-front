# Front Gerenciamento de Consumíveis

Este MVP faz parte do projeto final da disciplina de **Arquitetura de Software** do curso de Pós Graduação em Engenharia de Software da PUC-Rio.

O objetivo aqui é ilutsrar o conteudo apresentado nas aulas usando como o exemplo o gerenciamento logístico de consumíveis de uma rede de clínicas de estética.

---
## Como executar

Basta fazer o download do projeto e abrir o arquivo index.html no seu browser.

Caso tenha a extensão live server você pode em seu VScode selecionar o araquivo index.html com o botão direito do mouse e acessar a opção "Open Live Server", assim podendo acessar o link abaixo.

**http://localhost:5500/index.html**

---
## Como executar atavés do Docker

Para Fazer o build do projeto no Docker **docker build --no-cache -t frontend .**

Para executar a imagem do build do projeto no Docker **docker run -it -d --rm --name tadeu -p 80:80 frontend:latest**

