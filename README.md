# Projetando o Futuro

#### Alunos:
Henrique Vieira Lima (15459372)
Pedro Augusto Ferraro Paffaro (15483380)
Alec Campos Aoki (15436800)

Este é um projeto de Desenvolvimento Web construído para a ONG **Projetando o Futuro**.

## Sobre o Projeto

O projeto foi desenvolvido com tecnologias modernas como **React**, **TypeScript** e **Vite**, o que permitiu uma melhor gestão de estados e componentes.

## Requisitos da Disciplina Atendidos

1. **Responsividade**: Adapta-se a celulares, tablets e desktops (p.ex. Navbar adaptativa em CSS).
2. **Acessibilidade**: Implementação de tags semânticas, rótulos (labels) e atributos adequados.
3. **Modularização**: Separação cuidadosa da aplicação em componentes React independentes (ex: Navbar, Carousel, Cards).

## Levantamento de Requisitos (Cliente)

Em contato direto com o diretor da ONG, foram definidos os requisitos principais para o público externo e para os voluntários:

### 1. Visão Pública (Externa)
- Informações gerais sobre a atuação e impacto da ONG.
- Galeria de fotos e publicações sobre projetos e aulas desenvolvidos.
- Informações claras sobre doações, voluntariado e inscrição de crianças no programa.

### 2. Segurança e LGPD
- Devido a um rigoroso controle de acesso e para garantir a segurança dos dados sensíveis dos voluntários e das crianças, decidiu-se **manter a captação e o armazenamento de formulários nos sistemas Google Forms/Excel** adotados atualmente pela gestão, em vez de salvar diretamente no banco de dados do site.

### 3. Funcionalidades de Uso Interno (Dashboard dos Voluntários)
- Registro de presença das crianças.
- Alocação de salas para os monitores e turmas.
- Publicação de novos projetos e parcerias.

## Como instalar e rodar o projeto

Siga o passo a passo abaixo para rodar a aplicação localmente:

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão sugerida: 18+).

### Passos

1. Clone o repositório ou faça o download:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Entre no diretório do projeto:
   ```bash
   cd Projetando-o-Futuro
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. O Vite inicializará o projeto (geralmente em `http://localhost:5173/`). Abra essa URL no seu navegador.
